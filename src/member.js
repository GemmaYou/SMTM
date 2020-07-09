import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

  changeToSubmit(){
    document.getElementById("setAccount").style.display = "block";
    document.getElementById("signinAccount").style.display = "none";
    document.querySelector(".member-sign").style.backgroundColor = "#FDFEE8";
    document.querySelector(".member-sub").style.backgroundColor = "white";
  }

  changeToSignin(){
    document.getElementById("setAccount").style.display = "none";
    document.getElementById("signinAccount").style.display = "block";
    document.querySelector(".member-sub").style.backgroundColor = "#FDFEE8";
    document.querySelector(".member-sign").style.backgroundColor = "white";
  }

  render() {
    let user =this.props.user;
    // console.log(user);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
    return <>{this.props.user.login ? <MemberInfo user={this.props.user}/> : <div className="account" id="account">
        <button className="member-sub" onClick={this.changeToSubmit}>註冊帳戶</button>
        <button className="member-sign" onClick={this.changeToSignin}>登入帳戶</button><Submit user={this.props.user} sub={this.props.sub} /><Signin user={this.props.user}/></div> }</>;
  }
}

// <Router>
//   <div className="account" id="account">
//     <div className="main">
//       <Switch>
//         <Link to="/submit" style={mystyle}>
//           <div>sub</div>
//         </Link>
//         <Link to="/signin" style={mystyle}>
//           <div>sign</div>
//         </Link>
//       </Switch>
//     </div>
//   </div>
//   </Router>;

export default Member;
