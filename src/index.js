import React from "react";
import ReactDOM from "react-dom";
import './style.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App.js";

ReactDOM.render(<Router><App/></Router>, document.querySelector("#root"));
