import React, { createContext, useContext, useState } from "react";

const MyContext = createContext();

export const DataContext = ({ children }) => {
  const [questionId, setQuestionId] = useState({
    id: [],
  });
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [name, setName] = useState("");

  return (
    <MyContext.Provider
      value={{
        questionId,
        setQuestionId,
        selectedQuestions,
        setSelectedQuestions,
        name,
        setName,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
