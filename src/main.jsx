import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { DataContext } from "./context/DataContext.jsx";
import { MathJaxContext } from "better-react-mathjax";

//option for MathJax
const config = {
  "fast-preview": {
    disabled: true,
  },
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
  },
  messageStyle: "none",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DataContext>
      <MathJaxContext
        config={config}
        version={2}
        onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
      >
        <App />
      </MathJaxContext>
    </DataContext>
  </React.StrictMode>
);
