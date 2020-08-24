import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ActSubmit from "./actSubmit";
import ActSign from "./actSign";

class SigninModal extends React.Component {
  constructor (props) {
    super(props);
    this.changeToSubmit = this.changeToSubmit.bind(this);
    this.changeToLogin = this.changeToLogin.bind(this);
    this.state = {
      submit: true,
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
        <div className="actAccount" id="actAccount">
          <button className={this.state.submit ? "act-member-sub modal-submit-show" : "act-member-sub modal-submit-hide"} onClick={this.changeToSubmit}>尚無帳戶</button>
          <button className={this.state.submit ? "act-member-sign modal-submit-hide" : "act-member-sign modal-submit-show"} onClick={this.changeToLogin}>已有帳戶</button>
          {this.state.submit ? <ActSubmit user={this.props.user} sub={this.props.sub} anonymous={this.props.anonymous} /> : <ActSign user={this.props.user} signin={this.props.signin} />}
        </div>
      </>;
  }
}

export default SigninModal;
