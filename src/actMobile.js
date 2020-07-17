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
    this.state = {
      show: true,
    }
  }

  componentDidMount(){
    let user = this.props.user;
    let data = this.props.data;
    console.log(user);

  }

  changeToList(){
    // document.getElementById("act-list").style.display = "block";
    // document.getElementById("act-member").style.display = "none";
    this.setState({
      show: true
    });
  }

  changeToMember(){
    // document.getElementById("act-list").style.display = "none";
    // document.getElementById("act-member").style.display = "block";
    this.setState({
      show: false
    });
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
          {/*<img src={m.done ? checkedPaid : notPaid} className="activity-icon" />*/}
          <div>{m.name} ： NT${m.perValue}</div>
          {data.done ? <></> : <img src={trash} className="trashImg" onClick={()=>this.props.deleteMember(`${m.email}`)}/>}
        </div>
      });
    return <>
        {this.state.show ? <div className="act-list" id="act-list">
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
            <input type="datetime-local" className="act-icon-intro" defaultValue={data.date} onChange={this.props.changeDate} />
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
          <div className="condition" onClick={this.changeActivityToDone}>
            {/*}<img src={data.done ? doneCheck: nonCheck } className="activity-icon" />*/}
            <button>
            {/*}{data.done ? <>已完成</> : <>未完成</> }*/}
            完成確認
            </button>
          </div>
        </div>
        : <div className="act-member" id="act-member">
          {member}
        </div> }
        <div className="ac-btn">
        {/*className={this.state.show ? "" : "choosenList"}*/}
          <button onClick={()=> this.changeToList()} className={this.state.show ? "choosenList" : ""}>活動內容</button>
          <button onClick={()=> this.changeToMember()} className={this.state.show ? "" : "choosenList"}>參與人員</button>
        </div>
      </>;
  }
}

export default Mobile;
