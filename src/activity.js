import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
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
import Mobile from "./actMobile";
import Desk from "./actDesk";
import ActSignin from "./actSignin";
//signinAccount 現在是display none不顯示 需調整
import AddMember from "./addMember";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//React Hook
// const Activity = () => {
//     let { id } = useParams();
//     return (
//         <div>
//             Activity component
//             <p>Topic: {id}</p>
//         </div>
//     );
// };

class Activity extends React.Component {
  constructor (props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMember = this.addMember.bind(this);
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    // console.log(location.query);
    this.state = {
      modal: false,
      window: false,
      data: {
        date: "",
        done: "",
        holder: {
          name: "", email: ""
        },
        kind: "",
        member_details: [],
        name: "",
        place: "",
        value: ""
      }
    }
    // console.log(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    const id = this.props.match.params.id;
    // console.log(id);
    this.getData(id);
  }

  getData(id){
    // console.log("getdata");
    firebase.firestore().collection("activity").doc(id)
    .onSnapshot(doc => {
      if (doc.exists) {
          // console.log("Document data:", doc.data());
          this.setState({
            data: doc.data()
          })
          let data = doc.data();
          let user = this.props.user;
          let result = data.member_email.indexOf(user.email);
          if (result === -1){
            console.log("新人");
          } else if (result === 0) {
            console.log("holder");
            alert("ㄤㄤ主辦人");
          } else {
            let member = data.member_details.filter(detail => detail.email === user.email);
            if (!member.done){
              alert(user.name+"你欠的"+member[0].perValue+"快點還拉！");
            }
            console.log(member);
          }
          console.log(result);
      } else {
          // doc.data() will be undefined in this case
          alert("此活動不存在唷，請再次確認連結是否正確！");
          console.log("No such document!");
          window.location.href = "./"; //需修正
      }
    });
    // firebase.firestore().collection("activity").doc(id)
    // .get()
    // .then(doc => {
    //     if (doc.exists) {
    //         // console.log("Document data:", doc.data());
    //         this.setState({
    //           data: doc.data()
    //         })
    //     } else {
    //         // doc.data() will be undefined in this case
    //         alert("此活動不存在唷，請再次確認連結是否正確！");
    //         console.log("No such document!");
    //         window.location.href = "./"; //需修正
    //     }
    //   }).catch(function(error) {
    //     console.log("Error getting document:", error);
    //   });
  }

  resize() {
    if (window.innerWidth <= 1000){
      this.setState({window: false});
    }else if (window.innerWidth > 1000) {
      this.setState({window: true})
    }
  }

  addMember(){
    // console.log("clickAdd");
    this.setState({
      modal: !this.state.modal
    })
    this.componentDidMount();
  }

  deleteMember (e) {
    let docId = this.props.match.params.id;
    let details = this.state.data.member_details;
    let emails = this.state.data.member_email;
     //deleteId is the id from the post you want to delete

    firebase.firestore().collection("activity").doc(docId).update({
       member_details: details.filter(detail => detail.email !== e),
       member_email: emails.filter(email => email !== e)
     })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
    this.componentDidMount();
  }

  changeActivityToDone(){
    let docId = this.props.match.params.id;
    let data = this.state.data;
    let emails = this.state.data.member_email;

    if (this.props.user.email === data.holder.email){
      // console.log("是舉辦人");
       //deleteId is the id from the post you want to delete
      firebase.firestore().collection("activity").doc(docId).update({
         done: !data.done
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.componentDidMount();
    } else {
      alert("只有舉辦人能改變活動狀態唷！")
    }
  }

  render() {
    let data = this.state.data;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    return <>
      <div className="activityBox">
        <div className="search">
          <input placeholder="找什麼呢" />
          <img src={search} className="searchImg" />
        </div>
        <div className="userName">
          {data.name}
        </div>
        {this.state.data.done ? <></> : <div className="add" onClick={this.addMember}>
          新增用戶
          <img src={user} className="userImg" />
        </div>}
        <div className="condition" onClick={this.changeActivityToDone}>
          <img src={data.done ? doneCheck: nonCheck } className="activity-icon" />
          {data.done ? <>已完成</> : <>未完成</> }
        </div>
        {this.state.window ? <Desk data={this.state.data} user={this.props.user} deleteMember={this.deleteMember.bind(this)}/> : <Mobile data={this.state.data} user={this.props.user} deleteMember={this.deleteMember.bind(this)} />}
        {this.state.modal ? <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={this.addMember}>&times;</span>
              {this.props.user.email ? <AddMember user={this.props.user} id={this.props.match.params.id} data={this.state.data} addMember={this.addMember}/> : <ActSignin user={this.props.user} sub={this.props.sub} anonymous={this.props.anonymous}/>}
          </div>
        </div> : <></>}
      </div>
    </>;
  }
}

export default withRouter(Activity);
