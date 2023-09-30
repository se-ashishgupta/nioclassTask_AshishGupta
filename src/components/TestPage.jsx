import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { Link, Navigate } from "react-router-dom";
import { useMyContext } from "../context/DataContext";

const TestPage = () => {
  const { selectedQuestions } = useMyContext();

  // Total Time
  const totalTime = selectedQuestions.length * 5 * 60;

  // Use State Variable
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [testOver, SetTestOver] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  //Prev Button Function
  const handlePrevClick = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  //Next Button Function
  const handleNextClick = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  //Sideeffect when question chnages
  useEffect(() => {
    if (timeLeft > 0 && !testOver) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft == 0 && !testOver) {
      SetTestOver(true);
    }
  }, [timeLeft, testOver]);

  //Change time formate from second to min and second
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  //If test over redirect to final page
  if (testOver) {
    return <Navigate to={"/finish"} />;
  }

  return (
    <div className="w-full min-h-[100vh] relative border-2">
      {/* SideBar  */}
      <Sidebar setCurrentQuestionIndex={setCurrentQuestionIndex} />
      {/* Question  */}
      <div className={`pt-20 p-4`}>
        <div className=" border-2 bg-purple-400 p-4 min-h-[10rem] rounded-br-[2rem]  rounded-tl-[2rem]">
          <div className="w-full h-full p-2">
            <MathJax>
              <div>{selectedQuestions[currentQuestionIndex].Question}</div>
            </MathJax>
          </div>
        </div>
      </div>

      {/* Timmer */}
      <div className=" absolute top-5 right-5 text-xl font-bold bg-purple-400 rounded-full flex p-2">
        <span className=" text-purple-900"> TIME LEFT</span>
        {"-"}
        <span className=" textw">{formatTime(timeLeft)}</span>
      </div>

      {/* Prev And Next Button  */}
      <div className="w-full absolute bottom-5 flex items-center justify-between p-4">
        <button
          className={`text-white bg-purple-500 px-4 py-2 text-xl font-bold rounded-xl hover:bg-transparent hover:text-black border-2 border-purple-500 transition-all duration-300  ${
            currentQuestionIndex === 0 ? "bg-opacity-40" : ""
          }`}
          onClick={handlePrevClick}
          disabled={currentQuestionIndex === 0}
        >
          Prev
        </button>

        {currentQuestionIndex == selectedQuestions.length - 1 ? (
          <Link
            to={"/finish"}
            className=" text-white bg-purple-500 px-3 py-2 text-xl font-bold rounded-xl hover:bg-transparent hover:text-black border-2 border-purple-500 transition-all duration-300"
          >
            Finish Test
          </Link>
        ) : (
          <button
            className=" text-white bg-purple-500 px-3 py-2 text-xl font-bold rounded-xl hover:bg-transparent hover:text-black border-2 border-purple-500 transition-all duration-300"
            onClick={handleNextClick}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default TestPage;
