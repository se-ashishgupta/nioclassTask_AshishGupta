import React from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMyContext } from "../context/DataContext";

const FinishPage = () => {
  const { questionId, selectedQuestions, name, setName } = useMyContext();

  const submitHandler = () => {
    questionId.id.splice(0, questionId.id.length);
    setName("");
    toast.success("Test Submitted");
  };

  return (
    <div className=" h-[100vh] p-4 grid place-items-center">
      <div className="min-w-[25rem] bg-purple-400 border-2 px-4 py-6 space-y-2 shadow-xl rounded-lg">
        {/* Heading  */}
        <div className=" text-3xl font-bold text-center py-4 border-2 border-purple-900">
          Thank You <span className=" text-white">{name}</span>
        </div>

        {/* Question List  */}
        <div className=" space-y-3 border-2 p-2 border-purple-900">
          {selectedQuestions.map((item, index) => (
            <div
              key={index}
              className=" text-xl text-white flex justify-between items-center border-2 p-1 "
            >
              <span>{item.QuestionID}</span>
            </div>
          ))}
        </div>

        {/* Button  */}

        <div className=" flex items-center justify-center w-full border-2 p-2  border-purple-900">
          <Link
            to={"/"}
            className=" text-xl bg-purple-500 px-2 py-1 rounded-lg font-semibold text-white hover:bg-transparent border-2 border-purple-500 hover:text-black transition-all duration-300 "
            onClick={submitHandler}
          >
            Submit Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
