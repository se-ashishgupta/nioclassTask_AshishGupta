import React, { useState } from "react";
import Logo from "../assets/bg.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useMyContext } from "../context/DataContext";

const Home = () => {
  const questionIdsList = [
    "AreaUnderTheCurve_21",
    "BinomialTheorem_13",
    "BinomialTheorem_24",
    "AreaUnderTheCurve_15",
    "AreaUnderTheCurve_2",
    "BinomialTheorem_3",
    "BinomialTheorem_4",
    "AreaUnderTheCurve_5",
  ];

  const { questionId, setQuestionId, setSelectedQuestions, name, setName } =
    useMyContext();

  const [loader, setLoader] = useState(false);

  const naviagte = useNavigate();

  // Adding id of Selected quesion
  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { id } = questionId;

    // console.log(`${value} is ${checked}`);

    // Case 1 : The user checks the box
    if (checked) {
      setQuestionId({
        id: [...id, value],
      });
      // Case 2  : The user unchecks the box
    } else {
      setQuestionId({
        id: id.filter((e) => e != value),
      });
    }
  };

  // Function to fetch a question by ID from the API
  const fetchQuestionById = async (id) => {
    try {
      const { data } = await axios.get(
        `https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID=${id}`
      );

      return data[0];
    } catch (error) {
      console.error(`Error fetching question with ID ${id}:`, error);
      return null;
    }
  };

  // Start Test Handler
  const submitHandler = async () => {
    if (name == "") {
      return toast.error("Please Enter Your Name");
    }
    setLoader(true);
    if (questionId.id.length > 0) {
      let questionList = [];

      for (const id of questionId.id) {
        const ques = await fetchQuestionById(id);
        if (ques) {
          questionList.push(ques);
        }
      }
      setSelectedQuestions(questionList);
      setLoader(false);
      naviagte("/test");
      toast.success("Your Test has been Started Best of Luck !!");
    } else {
      setLoader(false);
      toast.error("Please Select Atleast One Question");
    }
  };

  return (
    <div className="w-full  min-h-[100vh] px-2 md:px-16 py-10 ">
      {/* Heading  */}
      <h1 className="text-2xl md:text-3xl lg:text-5xl uppercase font-bold pb-10 text-center">
        online mathematics test
      </h1>

      {/*Home Content  */}
      <div className="h-full grid lg:grid-cols-2 gap-10">
        {/* Left  */}
        <div className="w-full h-full grid place-items-center">
          <div className="w-[70%] h-[70%]">
            <img
              src={Logo}
              alt="logo"
              className="h-full w-full animate-vectorAnimation"
            />
          </div>
        </div>

        {/* Right  */}
        <div className="border-2 py-2 px-6 bg-gray-200 rounded-tl-[20%] rounded-xl shadow-xl">
          <div className=" flex flex-col gap-3 w-[70%] m-auto text-center">
            <label
              htmlFor="name"
              className=" font-semibold text-lg text-purple-500"
            >
              Enter Your Name
            </label>
            <input
              type="text"
              name="name"
              id="\name"
              className="border-2 px-2 py-1 rounded-lg focus:outline-purple-500 duration-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <h1 className="text-xl font-bold text-center my-6 uppercase">
            Select the Questions Bellow
          </h1>

          {/* Question List Via Id  */}
          <div className="flex flex-col gap-2 py-2 px-10 shadow-lg rounded-xl bg-white">
            {questionIdsList.map((item, index) => (
              <div key={index} className=" flex items-center justify-between">
                <label className=" md:text-lg" htmlFor={index}>
                  {item}
                </label>

                <input
                  type="checkbox"
                  value={item}
                  name="questionId"
                  id={index}
                  onChange={handleChange}
                  className="accent-purple-500 relative h-5 w-5"
                />
              </div>
            ))}
          </div>

          <div className="py-6 m-auto w-full flex justify-center items-center">
            <button
              className=" text-xl bg-purple-500 px-2 py-1 rounded-lg font-semibold text-white hover:bg-transparent border-2 border-purple-500 hover:text-black"
              onClick={submitHandler}
            >
              {loader ? (
                <div className="w-[20px] h-[20px] border-2 rounded-full animate-spin border-b-purple-800"></div>
              ) : (
                "Get Started"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
