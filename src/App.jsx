import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import TestPage from "./components/TestPage";
import { Toaster } from "react-hot-toast";
import FinishPage from "./components/FinishPage";

const App = () => {
  // Routes
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/finish" element={<FinishPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
