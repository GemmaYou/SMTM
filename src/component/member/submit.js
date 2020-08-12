import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class Submit extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return <div className="setAccount" id="setAccount">
        <div>
          <h2>註冊帳戶</h2>
        </div>
        <div>信箱：<input id="email" /></div>
        <div>密碼：<input id="pwd" type="password" /></div>
        <div>暱稱：<input id="name" type="text" /></div>
        <div className="submit-btn"><button id="submit" onClick={this.props.sub}>註冊</button></div>
      </div>;
  }
}

export default Submit;
