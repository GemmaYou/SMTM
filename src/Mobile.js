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


class Mobile extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props);
  }

  changeToList(){
    document.getElementById("act-list").style.display = "block";
    document.getElementById("act-member").style.display = "none";
  }

  changeToMember(){
    document.getElementById("act-list").style.display = "none";
    document.getElementById("act-member").style.display = "block";
  }

  render() {
    return <>
        <div className="act-list" id="act-list">
          <div className="item">
            <img src={location} className="activity-icon" />
            <div>Appworks School</div>
          </div>
          <div className="item">
            <img src={date} className="activity-icon" />
            <div>0707 19:00</div>
          </div>
          <div className="item">
            <img src={atm} className="activity-icon" />
            <div>Gemma</div>
          </div>
          <div className="item">
            <img src={value} className="activity-icon" />
            <div>NT$2130</div>
          </div>
        </div>
        <div className="act-member" id="act-member">
          <div className="item">
            <img src={halfdone} className="activity-icon" />
            <div>彭彭</div>
            <div className="perValue">NT$300</div>
          </div>
          <div className="item">
            <img src={halfdone} className="activity-icon" />
            <div>丁滿</div>
            <div className="perValue">NT$300</div>
          </div>
        </div>
        <div className="ac-btn">
          <button onClick={()=> this.changeToList()}>活動內容</button>
          <button onClick={()=> this.changeToMember()}>參與人員</button>
        </div>
      </>;
  }
}

export default Mobile;
