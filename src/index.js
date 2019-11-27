import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rootElem: ?Element = document.getElementById("root");
rootElem && ReactDOM.render(<App />, rootElem);
