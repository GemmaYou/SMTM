import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import ActSubmit from "./actSubmit";
import ActSign from "./actSign";
import MemberInfo from "./memberInfo";

class ActSignin extends React.Component {
  constructor (props) {
    super(props);
  }

  changeToSubmit(){
    document.getElementById("actSetAccount").style.display = "block";
    document.getElementById("actSigninAccount").style.display = "none";
    document.querySelector(".act-member-sign").style.backgroundColor = "#FDFEE8";
    document.querySelector(".act-member-sub").style.backgroundColor = "white";
  }

  changeToSignin(){
    document.getElementById("actSetAccount").style.display = "none";
    document.getElementById("actSigninAccount").style.display = "block";
    document.querySelector(".act-member-sub").style.backgroundColor = "#FDFEE8";
    document.querySelector(".act-member-sign").style.backgroundColor = "white";
  }

  render() {
    let user =this.props.user;
    // console.log(user);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
    return <>
      <div className="actAccount" id="actAccount">
        <button className="act-member-sub" onClick={this.changeToSubmit}>尚無帳戶</button>
        <button className="act-member-sign" onClick={this.changeToSignin}>已有帳戶</button>
        <ActSubmit user={this.props.user} sub={this.props.sub} anonymous={this.props.anonymous} /><ActSign user={this.props.user} /></div>
      </>;
  }
}

export default ActSignin;
