import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class AddOne extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    const { name, kind } = this.props.additem;
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
                  一次性活動, 如: 朋友聚餐
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
                  常態活動, 如: Netflix家庭共享
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
