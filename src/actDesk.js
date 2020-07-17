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

class Desk extends React.Component {
  constructor (props) {
    super(props);
    this.changeMemberCheck = this.changeMemberCheck.bind(this);
    // console.log(props);
  }

  changeMemberCheck(i){
    console.log("click member check");
    console.log(i);

    let data = this.props.data.member_details[i];
    console.log(list);

    if (this.props.user.email === data.email){
      // console.log("holder");
       //deleteId is the id from the post you want to delete
      // firebase.firestore().collection("activity").doc(id).where('member_details', 'array-contains-any', [this.props.user.email])
      // .update({
      //    member_details: {
      //      done: !data.done,
      //    }
      //  })
      // .catch(function(error) {
      //     console.error("Error removing document: ", error);
      // });
      // this.componentDidMount();
    } else {
      alert("只有本人或舉辦人能改變各自的活動狀態唷！")
    }
  }

  src(done, i){
    switch(done){
      case "notPaid":
        return <img src={notPaid}  className="activity-icon" onClick={()=>this.changeMemberCheck(i)} key={i} />;
        break;
      case "paid":
        return <img src={paid} className="activity-icon" onClick={()=>this.changeMemberCheck(i)} key={i} />;
        break;
      case "checkedPaid":
        return <img src={checkedPaid} className="activity-icon" onClick={()=>this.changeMemberCheck(i)} key={i} />;
        break;
      default:return null;
    }
  }

  render() {
    let data = this.props.data;
    console.log(data.date.valueAsNumber);
    console.log(data);
    let member = data.member_details.map((m, i)=>{
      return <div key={i} className="item">
          {/*<img src={m.done ? checkedPaid : notPaid} className="activity-icon" />*/}
          <div>{m.name} 欠 NT${m.perValue}</div>
          {data.done ? <></> : <img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>}
        </div>
      });
    let actDate = ()=>{
      if (this.props.data.date === once){
        return (<input type="datetime-local" className="act-icon-intro" defaultValue={this.props.data.date} onChange={this.props.changeDate}/>)
      } else {
        return (<select onChange={this.props.addOnChangeDate}>
          <option value="week">每週</option>
          <option value="month">每月</option>
          <option value="year">每年</option>
        </select>)
      }
    }
    return <>
        <div className="act-list" id="act-list">
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
            <div className="act-icon-intro" >{data.holder.name} </div>
          </div>
          <div className="item">
            <div className="item-icon">
              <img src={value} className="activity-icon" />
              <div>活動總額</div>
            </div>
            <div className="NT act-icon-intro"><input type="number" className="last-input" defaultValue={data.value} onChange={this.props.changeValue}/></div>
          </div>
          <div className="condition" onClick={this.changeActivityToDone}>
            {/*}<img src={data.done ? doneCheck: nonCheck } className="activity-icon" />*/}
            <button>
            {/*}{data.done ? <>已完成</> : <>未完成</> }*/}
            完成確認
            </button>
          </div>
        </div>
        <div className="undo-member">仍有欠款</div>
        <div className="act-member" id="act-member">
          {member}
        </div>
      </>;
  }
}

export default Desk;
