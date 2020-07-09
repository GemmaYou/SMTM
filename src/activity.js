import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import add from "./img/add.png";
import invite from "./img/invite.png";
import nonCheck from "./img/nonCheck.png";
import search from "./img/search.png";
import location from "./img/location.png";
import date from "./img/date.png";
import atm from "./img/ATM.png";
import value from "./img/value.png";
import user from "./img/user.png";
import halfdone from "./img/halfdone.png";
import doneCheck from "./img/donecheck.png";
import Mobile from "./Mobile";
import Desk from "./Desk";

class Activity extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      window: false
    }
    // console.log(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    if (window.innerWidth <= 1000){
      this.setState({window: false});
    }else if (window.innerWidth > 1000) {
      this.setState({window: true})
    }
  }

  render() {
    let data = this.props.activity;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    return <>
      <div className="activityBox">
        <div className="condition">
          <img src={doneCheck} className="activity-icon" />
          已完成
        </div>
        <div className="search">
          <input placeholder="找什麼呢" />
          <img src={search} className="searchImg" />
        </div>
        <div className="userName">
          Gemma
        </div>
        <div className="add">
          新增用戶
          <img src={user} className="userImg" />
        </div>
        <div className="invite">
          使用連結
          <img src={invite} className="inviteImg" />
        </div>
        {this.state.window ? <Desk activity={this.props.activity}/> : <Mobile activity={this.props.activity}/>}
      </div>
      <div className="backToHome">
        <Link to="/" style={mystyle}>&#10150; Back To Home</Link>
      </div>
    </>;
  }
}

export default Activity;
