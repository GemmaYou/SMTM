import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import Submit from "./submit";
import Signin from "./signin";
import MemberInfo from "./memberInfo";

class MemberSignin extends React.Component {
  constructor (props) {
    super(props);
    this.changeToSubmit = this.changeToSubmit.bind(this);
    this.changeToLogin = this.changeToLogin.bind(this);
    this.state = {
      submit: false,
    }
  }

  changeToSubmit(){
    this.setState({
      submit: true,
    })
  }

  changeToLogin(){
    this.setState({
      submit: false,
    })
  }

  render() {
    let user =this.props.user;
    return <>
        <div className="account" id="account">
          <button className={this.state.submit ? "member-sub modal-submit-show" : "member-sub modal-submit-hide"} onClick={this.changeToSubmit}>註冊帳戶</button>
          <button className={this.state.submit ? "member-sign modal-submit-hide" : "member-sign modal-submit-show"} onClick={this.changeToLogin}>登入帳戶</button>
          {this.state.submit ? <Submit user={this.props.user} sub={this.props.sub} /> : <Signin user={this.props.user} signin={this.props.signin}/>}
      </div></>;
  }
}

export default withRouter(MemberSignin);
