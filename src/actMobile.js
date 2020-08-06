import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';
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
import cartPNG from "./img/cart.png";
import cycle from "./img/cycle.png";
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
      showDone: false,
      location: window.location.href
    }
  }

  member(){
    if(this.props.data.member_details.length === 0){
      return <div className="noOneNotice">目前活動沒人唷，趕緊新增一些朋友！ &#10138;</div>
    } else {
      let list = [];
      if(this.state.showUndo){
        list = this.props.data.member_details.filter(item => !item.done);
      } else if (this.state.showDone){
        list = this.props.data.member_details.filter(item => item.done);
      }
      return (list.map((m, i)=>{
        let img = ()=>{
          if (m.email === this.props.user.email){
            return (<div className="tooltip"><img src={m.done ? doneCheck : nonCheck} className="activity-icon" onClick={()=>this.changeMemberCheck(`${m.email}`)}/><span className="tooltiptext">點選即可改變付款狀態</span></div>)
          } else if (this.props.data.holder.email === this.props.user.email){
            return (<div className="tooltip"><img src={m.done ? doneCheck : nonCheck} className="activity-icon" onClick={()=>this.changeMemberCheck(`${m.email}`)}/><span className="tooltiptext">點選即可改變付款狀態</span></div>)
          } else {
            return (<div></div>)
          }
        }
        let trashImg = ()=>{
          if (this.props.data.holder.email === this.props.user.email){
            return (<img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>)
          } else {
            return (<div></div>)
          }
        }
        // console.log(img());
        return (<div key={i} id={m.email} className="item">
            {img()}
            <div>{m.name} 欠 NT${m.perValue}</div>
            {this.props.data.done ? <></> : trashImg()}
          </div>)
        }))
    }
  }

  showDate(){
    if (this.props.data.kind === "once"){
      return (<input type="datetime-local" className="act-icon-intro act-date-input" defaultValue={this.props.data.date} onChange={this.props.changeDate}/>)
    } else {
      return (<select value={this.props.data.date} onChange={this.props.changeDate}>
        <option value="week">每 7 天</option>
        <option value="month">每 30 天</option>
        {/*<option value="year">每年</option>*/}
      </select>)
    }
  }

  changeMemberCheck(e){
    // console.log(e);
    // console.log("click member check");
    let id = this.props.id;
    let user = this.props.user;
    let data = this.props.data;
    let member = this.props.data.member_email;
    let details = this.props.data.member_details;
    let i = member.indexOf(e)-1;

    if (user.email === e || user.email === data.holder.email){
      details[i].done = !details[i].done;

      firebase.firestore().collection("activity").doc(id).update({
        member_details: details
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("只有本人或舉辦人能改變各自的活動狀態唷！")
    }
    this.props.getData(this.props.id);
  }

  componentDidMount(){
    let user = this.props.user;
    let data = this.props.data;
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
    let list = [];
    if(this.state.showUndo){
      list = this.props.data.member_details.filter(item => !item.done);
    } else if (this.state.showDone){
      list = this.props.data.member_details.filter(item => item.done);
    }

    let place =()=>{
      if( data.kind === "once"){
        return "舉辦地點"
      } else if ( data.kind === "period")
       return "事件描述"
    }

    let placeIcon =()=>{
      if( data.kind === "once"){
        return `${location}`
      } else if ( data.kind === "period")
       return `${cartPNG}`
    }

    let dateWord =()=>{
      if( data.kind === "once"){
        return "舉辦日期"
      } else if ( data.kind === "period")
       return "初次繳款"
    }

    let dateType =()=>{
      if( data.kind === "once"){
        return "datetime-local"
      } else if ( data.kind === "period")
       return "date"
    }

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
              <img src={placeIcon()} className="activity-icon" />
              <div>{place()}</div>
            </div>
            <input type="text" className="act-icon-intro" defaultValue={data.place} onChange={this.props.changePlace}/>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={date} className="activity-icon" />
              <div>{dateWord()}</div>
            </div>
            <input type={dateType()} className="act-icon-intro" defaultValue={this.props.data.date} onChange={this.props.changeDate}/>
          </div>
          {this.props.data.period ? <div className="item">
            <div className="item-icon">
              <img src={cycle} className="activity-icon" />
              <div>多久一收</div>
            </div>
            <select value={data.period} onChange={this.props.changePeriod}>
              <option value="week">每 7 天</option>
              <option value="month">每 30 天</option>
              {/*<option value="year">每年</option>*/}
            </select>
          </div>:<></>}
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
          <div className="item">
            <div className="item-icon">
              <img src={invite} className="activity-icon" />
              <div>分享連結</div>
            </div>
            <div className="act-icon-intro">
              <CopyToClipboard text={this.state.location} onCopy={this.props.clickCopy}>
                <div>Click to copy link</div>
              </CopyToClipboard>
            </div>
          </div>
        </div>
        : <div className="act-member" id="act-member">
          {member}
        </div> }
        <div className="condition">
          <button onClick={this.props.changeActivityToDone}>
            {data.done ? <>再次啟用</> : <>結束活動</> }
          </button>
        </div>
        <div className="ac-btn">
          <button onClick={()=> this.changeToList()} className={this.state.showList ? "choosenList" : ""}>活動內容</button>
          <button onClick={()=> this.changeToUndo()} className={this.state.showUndo ? "choosenList" : ""}>未付款</button>
          <button onClick={()=> this.changeToDone()} className={this.state.showDone ? "choosenList" : ""}>已付款</button>
        </div>
      </>;
  }
}

export default Mobile;
