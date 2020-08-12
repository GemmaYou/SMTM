import React from "react";
import ReactDOM from "react-dom";
import './component/style.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import App from "./component/App.js";

ReactDOM.render(<Router><App/></Router>, document.querySelector("#root"));
