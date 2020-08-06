import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import cartPNG from "./img/cart.png";
import datePNG from "./img/date.png";
import atmPNG from "./img/ATM.png";
import valuePNG from "./img/value.png";
import userPNG from "./img/user.png";
import arrow from "./img/arrow.png";


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
            <div className="item-icon">
              <img src={cartPNG} className="activity-icon" />
              <div>事件描述</div>
            </div>
            <input type="text" value={place} placeholder="請輸入事件描述" className="addActInfo" onChange={this.props.addOnChangePlace}
             />
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={datePNG} className="activity-icon" />
              <div>初次繳款</div>
            </div>
            <input type="date" value={date} className="addActInfo" onChange={this.props.addOnChangeDate}
             />
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={arrow} className="activity-icon" />
              <div>多久一收</div>
            </div>
            <select onChange={this.props.addOnChangePeriod}>
              <option defaultValue="week">每 7 天</option>
              <option value="month">每 30 天</option>
              {/*<option value="year">每年</option>*/}
            </select>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={valuePNG} className="activity-icon" />
              <div>活動總額</div>
            </div>
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
