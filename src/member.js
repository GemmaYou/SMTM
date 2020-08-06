import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import Submit from "./submit";
import Signin from "./signin";
import MemberInfo from "./memberInfo";

class Member extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log(this.props)
    let user =this.props.user;
    // console.log(user);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
    return <><MemberInfo user={this.props.user}/></>;
  }
}


export default withRouter(Member);
