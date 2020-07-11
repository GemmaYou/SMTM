import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cartPNG from "./img/cart.png";
import datePNG from "./img/date.png";
import atmPNG from "./img/ATM.png";
import valuePNG from "./img/value.png";
import userPNG from "./img/user.png";


class AddPeriod extends React.Component {
  constructor (props) {
    super(props);
    console.log(props);
  }

  render() {
    console.log(this.props.additem);
    const { name, place, date, holder, value } = this.props.additem;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    let linkStyle = {
      color: "#000000",
      textDecoration: "none",
      alignItems: "center",
      display: "flex"
    };
    return <>
      <div className="addOnceBox">
        <div className="activityName">
          {name}
        </div>
        <div className="act-list" id="act-list">
          <div className="item">
            <img src={cartPNG} className="activity-icon" />
            <input type="text" value={place} placeholder="請輸入事件描述" className="addActInfo" onChange={this.props.addOnChangePlace}
             />
          </div>
          <div className="item">
            <img src={datePNG} className="activity-icon" />
            <input type="datetime-local" value={date} className="addActInfo" onChange={this.props.addOnChangeDate}
             />
          </div>
          <div className="item">
            <img src={atmPNG} className="activity-icon" />
            <input type="text" value={holder} placeholder="誰是大金主" className="addActInfo" onChange={this.props.addOnChangeHolder}
             />
          </div>
          <div className="item">
            <img src={valuePNG} className="activity-icon" />
            <input type="number" value={value} placeholder="請輸入每次此次總額" className="addActInfo" onChange={this.props.addOnChangeValue}
             />
          </div>
        </div>
        <button className="nextStep" onClick={()=> this.props.addFinal()}>下一步</button>
      </div>
    </>;
  }
}

export default AddPeriod;
