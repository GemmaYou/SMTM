import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AUTH } from "../db";

class MemberInfo extends React.Component {
  constructor (props) {
    super(props);
  }

  logout(){
    AUTH.signOut()
      .then(function() {
        alert('您已登出囉！');
      })
  }

  render() {
    let member = this.props.user;
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
