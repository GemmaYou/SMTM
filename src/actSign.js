import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class ActSign extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return <div className="actSigninAccount" id="actSigninAccount">
        <div>
          <h2>登入帳戶</h2>
        </div>
        <div>信箱：<input id="signinEmail" defaultValue="test@gmail.com" /></div>
        <div>密碼：<input id="signinPwd" type="password" defaultValue="111111" placeholder="密碼最少需6個字元" /></div>
        <div className="act-signin-btn"><button id="signin" onClick={this.props.signin}>登入</button></div>
      </div>;
  }
}

export default withRouter(ActSign);
