import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import add from "./img/add.png";
import invite from "./img/invite.png";
import nonCheck from "./img/nonCheck.png";
import donecheck from "./img/donecheck.png";
import search from "./img/search.png";
import trash from "./img/trash.png";

class List extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    console.log(this.props)
    let data = this.props.listChange;
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
        <div className="listBox">
          <div className="search">
            <input placeholder="找什麼呢" />
            <img src={search} className="searchImg" />
          </div>
          <div className="userName">Gemma</div>

            <div className="add"><Link to="/add" style={linkStyle}>新增活動 <img src={add} className="addImg" /></Link></div>
          <div className="invite">使用連結 <img src={invite} className="inviteImg" /></div>
          <div className="list">
            {data.map(function(act, i){
                return <div className="item" key={i}>
                  <img src={act.done? donecheck : nonCheck} className="check" />
                  <div>{act.name} / ({act.date})</div>
                  <img src={trash} className="inviteImg" />
                </div>
              })
            }
          </div>
          <div className="btn">
            <button onClick={this.props.listChangeToAll}>全部</button><button onClick={this.props.listChangeToUndo}>未完成</button><button onClick={this.props.listChangeToDone}>已完成</button>
          </div>
        </div>
        <div className="backToHome">
          <Link to="/" style={mystyle}>&#10150; Back To Home</Link>
        </div>
      </>;
  }
}

export default List;
