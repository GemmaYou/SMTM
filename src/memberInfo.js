import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class MemberInfo extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props);
  }

  logout(){
    firebase.auth().signOut()
      .then(function() {
        alert('您已登出囉！');
      })
  }

  render() {
    let member = this.props.user;
    // console.log(member);
    return <div className="memberInfo">
        <div className="member-title">會員資料</div>
        <div className="info">
          <div>暱稱：{member.name}</div>
          <div>email：{member.email}</div>
          <div className="info-btn"><button className="logout-btn" onClick={()=>this.logout()}>登出</button></div>
        </div>
      </div>;
  }
}

export default MemberInfo;
