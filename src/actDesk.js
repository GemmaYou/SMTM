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

class Desk extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props);
  }

  render() {
    let data = this.props.data
    console.log(this.props)
    return <>
        <div className="act-list" id="act-list">
          <div className="item">
            <img src={location} className="activity-icon" />
            <div>{data.place}</div>
          </div>
          <div className="item">
            <img src={date} className="activity-icon" />
            <div>{data.date}</div>
          </div>
          <div className="item">
            <img src={atm} className="activity-icon" />
            <div>{data.holder.name}</div>
          </div>
          <div className="item">
            <img src={value} className="activity-icon" />
            <div>NT$ {data.value}</div>
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
      </>;
  }
}

export default Desk;
