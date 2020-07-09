import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import locationPNG from "./img/location.png";
import datePNG from "./img/date.png";
import atmPNG from "./img/ATM.png";
import valuePNG from "./img/value.png";
import userPNG from "./img/user.png";


class AddOnce extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props);
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
            <img src={locationPNG} className="activity-icon" />
            <input type="text" value={place} placeholder="請輸入活動地點" className="addActInfo" onChange={this.props.addOnChangePlace}
             />
          </div>
          <div className="item">
            <img src={datePNG} className="activity-icon" />
            <input type="datetime-local" value={date} className="addActInfo" onChange={this.props.addOnChangeDate}
             />
          </div>
          <div className="item">
            <img src={valuePNG} className="activity-icon" />
            <input type="number" value={value} placeholder="請輸入此次總額" className="addActInfo" onChange={this.props.addOnChangeValue}
             />
          </div>
        </div>
        <button className="nextStep" onClick={()=> this.props.addFinal()}>下一步</button>
      </div>
      <div className="backToHome">
        <Link to="/" style={mystyle}>&#10150; Back To Home</Link>
      </div>
    </>;
  }
}

export default AddOnce;
