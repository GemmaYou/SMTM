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
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


class Mobile extends React.Component {
  constructor (props) {
    super(props);
    this.changeMemberCheck = this.changeMemberCheck.bind(this);
    this.showDate = this.showDate.bind(this);
    this.member = this.member.bind(this);
    // console.log(props);
    this.state = {
      showList: true,
      showUndo: false,
      showDone: false
    }
  }

  member(){
    console.log("member");
    let list = [];
    if(this.state.showUndo){
      list = this.props.data.member_details.filter(item => !item.done);
    } else if (this.state.showDone){
      list = this.props.data.member_details.filter(item => item.done);
    }
    return (list.map((m, i)=>{
      let img = ()=>{
        if (m.email === this.props.user.email){
          return (<img src={m.done ? doneCheck : nonCheck} className="activity-icon" onClick={()=>this.changeMemberCheck(`${m.email}`)}/>)
        } else if (this.props.data.holder.email === this.props.user.email){
          return (<img src={m.done ? doneCheck : nonCheck} className="activity-icon" onClick={()=>this.changeMemberCheck(`${m.email}`)}/>)
        } else {
          return (<div></div>)
        }
      }
      // console.log(img());
      return (<div key={i} id={m.email} className="item">
          {img()}
          <div>{m.name} 欠 NT${m.perValue}</div>
          {this.props.data.done ? <></> : <img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>}
        </div>)
      }))
  }

  showDate(){
    if (this.props.data.kind === "once"){
      return (<input type="datetime-local" className="act-icon-intro" defaultValue={this.props.data.date} onChange={this.props.changeDate}/>)
    } else {
      return (<select value={this.props.data.date} onChange={this.props.changeDate}>
        <option value="week">每週</option>
        <option value="month">每月</option>
        <option value="year">每年</option>
      </select>)
    }
  }

  changeMemberCheck(e){
    console.log(e);
    console.log("click member check");
    let id = this.props.id;
    let user = this.props.user;
    let data = this.props.data;
    let member = this.props.data.member_email;
    let details = this.props.data.member_details;
    let i = member.indexOf(e)-1;

    if (user.email === e || user.email === data.holder.email){
      details[i].done = !details[i].done;
      console.log(details);

      firebase.firestore().collection("activity").doc(id).update({
        member_details: details
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("只有本人或舉辦人能改變各自的活動狀態唷！")
    }
  }

  componentDidMount(){
    let user = this.props.user;
    let data = this.props.data;
    console.log(user);

  }

  changeToList(){
    this.setState({
      showList: true,
      showUndo: false,
      showDone: false
    });
  }

  changeToUndo(){
    this.setState({
      showList: false,
      showUndo: true,
      showDone: false
    });
  }

  changeToDone(){
    this.setState({
      showList: false,
      showUndo: false,
      showDone: true
    });
  }

  render() {
    let data = this.props.data;
    console.log(data);
    let list = [];
    if(this.state.showUndo){
      list = this.props.data.member_details.filter(item => !item.done);
    } else if (this.state.showDone){
      list = this.props.data.member_details.filter(item => item.done);
    }

    // let member = list.map((m, i)=>{
    //   return <div key={i} id={m.email} className="item">
    //       <img src={m.done ? doneCheck : nonCheck} className="activity-icon" onClick={()=>this.changeMemberCheck(`${m.email}`)}/>
    //       <div>{m.name} 欠 NT${m.perValue}</div>
    //       {data.done ? <></> : <img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>}
    //     </div>
    //   });

    let actDate = this.showDate();
    let member = this.member();

    return <>
        {this.state.showList ? <></>:<div className="actMobileUserName">
          {this.state.showUndo ? <p>仍有欠款</p> : <></> }
          {this.state.showDone ? <p>完成付款</p> : <></> }
        </div>}
        {this.state.showList ? <div className="act-list" id="act-list">
          <div className="item">
            <div className="item-icon">
              <img src={location} className="activity-icon" />
              <div>舉辦地點</div>
            </div>
            <input type="text" className="act-icon-intro" defaultValue={data.place} onChange={this.props.changePlace}/>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={date} className="activity-icon" />
              <div>舉辦日期</div>
            </div>
            {actDate}
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={atm} className="activity-icon" />
              <div>舉辦人</div>
            </div>
            <input type="text" className="act-icon-intro" defaultValue={data.holder.name} />
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={value} className="activity-icon" />
              <div>活動總額</div>
            </div>
            <div className="NT act-icon-intro"><input type="number" className="last-input" defaultValue={data.value} onChange={this.props.changeValue} /></div>
          </div>
        </div>
        : <div className="act-member" id="act-member">
          {member}
          {/*{member}*/}
        </div> }
        <div className="condition">
          <button onClick={this.props.changeActivityToDone}>
            {data.done ? <>取消完成</> : <>完成確認</> }
          </button>
        </div>
        <div className="ac-btn">
        {/*className={this.state.show ? "" : "choosenList"}*/}
          <button onClick={()=> this.changeToList()} className={this.state.showList ? "choosenList" : ""}>活動內容</button>
          <button onClick={()=> this.changeToUndo()} className={this.state.showUndo ? "choosenList" : ""}>未付款</button>
          <button onClick={()=> this.changeToDone()} className={this.state.showDone ? "choosenList" : ""}>已付款</button>
        </div>
      </>;
  }
}

export default Mobile;
