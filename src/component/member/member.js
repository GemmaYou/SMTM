import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Submit from "./submit";
import Signin from "./signin";
import MemberInfo from "./memberInfo";

class Member extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let user =this.props.user;
    return <><MemberInfo user={this.props.user}/></>;
  }
}


export default withRouter(Member);
