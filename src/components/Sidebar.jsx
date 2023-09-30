import React, { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillQuestionSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useMyContext } from "../context/DataContext";

const Sidebar = ({ setCurrentQuestionIndex }) => {
  const { questionId, setQuestionId, selectedQuestions, setName } =
    useMyContext();

  const [sideBarOpen, setSideBarOpen] = useState(false);

  const naviagte = useNavigate();

  const questionHandler = (index) => {
    setCurrentQuestionIndex(index);
    setSideBarOpen(false);
  };

  const submitHandler = () => {
    setSideBarOpen(false);
    questionId.id.splice(0, questionId.id.length);
    setName("");
    toast.success("Text Exit");
    naviagte("/");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`bg-black z-10 bg-opacity-50 w-full h-full absolute top-0 left-0 text-white ${
          sideBarOpen ? "translate-x-0" : "translate-x-[-100%]"
        } `}
        onClick={() => setSideBarOpen(false)}
      ></div>

      {/* MenuBar Icon  */}
      <div
        className="text-white absolute top-4 left-4 bg-purple-500 p-2 rounded-full text-2xl border-2 border-purple-500  cursor-pointer hover:bg-transparent hover:text-purple-500 transition-all duration-300"
        onClick={() => setSideBarOpen(!sideBarOpen)}
      >
        <BiMenuAltLeft />
      </div>

      {/* MenuItem List */}
      <div
        className={`bg-purple-300 absolute w-[15rem] top-0 h-full  px-4 py-6 ${
          sideBarOpen ? "left-0" : "-left-96"
        } transition-all duration-300 z-10`}
      >
        {/* Close Icon  */}
        <div
          className=" bg-white text-black p-2 rounded-full float-right w-min cursor-pointer  border-2 border-purple-500 hover:bg-transparent transition-all "
          onClick={() => setSideBarOpen(false)}
        >
          <AiOutlineClose />
        </div>

        <div className="flex flex-col justify-between mt-12">
          {/* Selected Question List */}
          <div className=" flex flex-col gap-2">
            {selectedQuestions.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 border-2 py-2 px-1 rounded-md bg-purple-500 text-white hover:bg-purple-400 hover:border-purple-500"
                onClick={() => questionHandler(index)}
              >
                <span className=" text-xl">
                  <BsFillQuestionSquareFill />
                </span>
                <Link>{item.QuestionID}</Link>
              </div>
            ))}
          </div>

          {/* Selected Question List */}
          <button
            className=" text-xl bg-purple-500 px-2 py-1 rounded-lg font-semibold text-white hover:bg-transparent border-2 border-purple-500 hover:text-black absolute bottom-5 left-3 w-[90%] transition-all duration-300"
            onClick={submitHandler}
          >
            Exit Test
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
