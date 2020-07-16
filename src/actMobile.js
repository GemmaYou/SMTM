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
import doneCheck from "./img/donecheck.png";
import trash from "./img/trash.png";
import notPaid from "./img/notPaid.png";
import paid from "./img/paid.png";
import checkedPaid from "./img/checkedPaid.png";


class Mobile extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props);
  }

  componentDidMount(){
    let user = this.props.user;
    let data = this.props.data;
    console.log(user);

  }

  changeToList(){
    document.getElementById("act-list").style.display = "block";
    document.getElementById("act-member").style.display = "none";
  }

  changeToMember(){
    document.getElementById("act-list").style.display = "none";
    document.getElementById("act-member").style.display = "block";
  }

  // src(done){
  //   switch(done){
  //     case "notPaid":
  //       return <img src={notPaid}  className="activity-icon" />;
  //       break;
  //     case "paid":
  //       return <img src={paid} className="activity-icon"  />;
  //       break;
  //     case "checkedPaid":
  //       return <img src={checkedPaid} className="activity-icon"  />;
  //       break;
  //     default:return null;
  //   }
  // }

  render() {
    let data = this.props.data;
    console.log(data);
    let member = data.member_details.map((m, i)=>{
      return <div key={i} className="item">
          <img src={m.done ? checkedPaid : notPaid} className="activity-icon" />
          <div>{m.name} ： NT${m.perValue}</div>
          {data.done ? <></> : <img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>}
        </div>
      });
    return <>
        <div className="act-list" id="act-list">
          <div className="item">
            <div className="item-icon">
              <img src={location} className="activity-icon" />
              <div>舉辦地點</div>
            </div>
            <div className="act-icon-intro">{data.place}</div>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={date} className="activity-icon" />
              <div>舉辦日期</div>
            </div>
            <div className="act-icon-intro">{data.date}</div>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={atm} className="activity-icon" />
              <div>舉辦人</div>
            </div>
            <div className="act-icon-intro">{data.holder.name}</div>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={value} className="activity-icon" />
              <div>活動總額</div>
            </div>
            <div className="act-icon-intro">NT$ {data.value}</div>
          </div>
        </div>
        <div className="act-member" id="act-member">
          {member}
        </div>
        <div className="ac-btn">
          <button onClick={()=> this.changeToList()}>活動內容</button>
          <button onClick={()=> this.changeToMember()}>參與人員</button>
        </div>
      </>;
  }
}

export default Mobile;
