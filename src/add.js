import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import add from "./img/add.png";
import invite from "./img/invite.png";
import nonCheck from "./img/nonCheck.png";
import search from "./img/search.png";

class AddOne extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    // console.log(this.props.additem);
    const { name, kind } = this.props.additem;
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
        <div className="addBox">
          <div className="addActNameDiv">
            <input type="text" value={name} placeholder="請輸入活動名稱" id="addActName" className="addActName" onChange={this.props.addOnChangeName} />
          </div>
          <div className="list">
            <div className="item">
              <div>
                <label>
                  <input
                    type="radio"
                    value="once"
                    onChange={this.props.addOnChangeKind}
                    checked={kind === "once"}
                  />
                  一次性活動
                </label>
              </div>
            </div>
            <div className="item">
              <div>
                <label>
                  <input
                    type="radio"
                    value="period"
                    onChange={this.props.addOnChangeKind}
                    checked={kind === "period"}
                  />
                  常態活動
                </label>
              </div>
            </div>
          </div>
          <button className="nextStep" onClick={()=> this.props.addOneToTwo()}>下一步</button>
        </div>
        <pre>{/*{JSON.stringify(this.state, null, 2)}*/}</pre>
      </>;
  }
}

export default AddOne;
