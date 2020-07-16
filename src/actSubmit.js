import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


class ActSubmit extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return <div className="actSetAccount" id="actSetAccount">
        <div>
          <h2>註冊 / 匿名加入</h2>
        </div>
        <div>信箱：<input id="email" /></div>
        <div>密碼：<input id="pwd" type="password" placeholder="若匿名加入，則毋須填寫" /></div>
        <div>暱稱：<input id="name" type="text" /></div>
        <div className="act-submit-btn">
          <button id="anonymous" onClick={this.props.anonymous}>以匿名申請</button>
          <button id="submit" onClick={this.props.sub}>註冊</button>
        </div>
        <div className="notice">**小提醒 <br/>
        若以匿名加入，無法管理您所參與之所有活動，建議註冊會員唷！</div>
      </div>;
  }
}

export default ActSubmit;
