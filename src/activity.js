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
import completed from "./img/completed.png";
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
    this.firstTimeAlert = this.firstTimeAlert.bind(this);
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    this.getAlert = this.getAlert.bind(this);
    // console.log(location.query);
    this.state = {
      modal: false,
      window: false,
      firstTime: true,
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
          // if (this.state.firstTime){ //僅有初次進頁面顯示
          //   let data = doc.data();
          //   let user = this.props.user;
          //   let result = data.member_email.indexOf(user.email);
          //
          //   if (result === -1){
          //     console.log("新人");
          //   } else if (result === 0) {
          //     console.log("holder");
          //     alert("ㄤㄤ主辦人");
          //   } else {
          //     let member = data.member_details.filter(detail => detail.email === user.email);
          //     if (!member.done){
          //       alert(user.name+"你欠的"+member[0].perValue+"快點還拉！");
          //     }
          //     console.log(member);
          //   }
          //
          //   // console.log(result);
          // }
      } else {
          // doc.data() will be undefined in this case
          alert("此活動不存在唷，請再次確認連結是否正確！");
          console.log("No such document!");
          //window.location.href = "./"; //需修正
          this.props.history.push("./");
      }
    });
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
    // this.componentDidMount();
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
    // this.componentDidMount();
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
      // this.componentDidMount();
    } else {
      alert("只有舉辦人能改變活動狀態唷！")
    }
  }

  firstTimeAlert(){
    this.setState({
      firstTime: false
    });
  }

  getAlert(){
    let data = this.state.data;
    if (!data.done){
      if (data.name !== ""){
        if (this.state.firstTime){ //僅有初次進頁面顯示
          let user = this.props.user;
          let result = data.member_email.indexOf(user.email);

          if (result === -1){
            return (
              <div id="myModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={this.firstTimeAlert}><div>&times;</div></span>
                  <div className="hostAlert">
                    <div className="oweMoney">
                      <div>新人ㄤㄤ <br/>
                        歡迎加入活動，未來有欠錢記得還（？
                      </div>
                    </div>
                  </div>
                </div>
              </div>);
          } else if (result === 0) {
            if (this.state.data.member_details.length === 0){
              return (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={this.firstTimeAlert}><div>&times;</div></span>
                    <div className="hostAlert">
                      <div className="oweMoney">
                        <div>舉辦人ㄤㄤ <br/>
                          目前還沒有人參加活動唷，<br/>
                          趕緊新增幾位朋友吧！
                        </div>
                      </div>
                    </div>
                  </div>
                </div>);
            } else {
              let member = this.state.data.member_details.filter(detail => detail.done === false);

              let data = member.map((m, i)=>{
                return <div key={i} className="undoMember">
                        <div className="undoMemberName">{m.name}</div>
                        <div className="undoMemberOwe">欠</div>
                        <div className="undoMemberValue">{m.perValue}</div>
                    </div>
                });

              return (<div id="myModal" className="modal">
                <div className="modal-content">
                  <span className="close" onClick={this.firstTimeAlert}><div>&times;</div></span>
                  <div className="hostAlert">
                    <div className="undoBox">
                      <div>ㄤㄤ主辦人，這些人欠錢不還</div>
                      <div className="undoList">{data}</div>
                    </div>
                  </div>
                </div>
              </div>);
            }
          } else {
            let member = data.member_details.filter(detail => detail.email === user.email);
            if (!member.done){
              // alert(user.name+"你欠的"+member[0].perValue+"快點還拉！");
              return (
                <div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={this.firstTimeAlert}><div>&times;</div></span>
                    <div className="hostAlert">
                      <div className="oweMoney">
                        <div>{user.name}你欠的{member[0].perValue}快點還拉！</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
          }
          // console.log(result);
        }
      }
    }
  }

  changeName(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      firebase.firestore().collection("activity").doc(docId).update({
         name: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changePlace(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      firebase.firestore().collection("activity").doc(docId).update({
         place: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changeDate(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      firebase.firestore().collection("activity").doc(docId).update({
         date: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changeValue(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      firebase.firestore().collection("activity").doc(docId).update({
         value: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  // change(word, event){
  //   let docId = this.props.match.params.id;
  //   console.log(word)
  //   firebase.firestore().collection("activity").doc(docId).update({
  //      word: event.target.value
  //    })
  //   .catch(function(error) {
  //       console.error("Error removing document: ", error);
  //   });
  // }

  render() {
    console.log(this.state.firstTime);
    let data = this.state.data;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    return <>

      <div className="activityBox">
        <input className="userName" defaultValue={data.name} onChange={this.changeName.bind(this)}/>
        {/*{this.state.data.done ? <></> : <div className="add" onClick={this.addMember}>
          新增用戶
          <img src={user} className="userImg" />
        </div>}*/}
        {this.state.data.done ? <></> : <div className="add"><button onClick={this.addMember} >Add +</button></div>}
        {/*<div className="condition" onClick={this.changeActivityToDone}>
          <img src={data.done ? doneCheck: nonCheck } className="activity-icon" />
          {data.done ? <>已完成</> : <>未完成</> }
        </div>*/}
        {this.state.window ?
          <Desk data={this.state.data} user={this.props.user} id={this.props.match.params.id} changeActivityToDone={this.changeActivityToDone} deleteMember={this.deleteMember.bind(this)} changePlace={this.changePlace.bind(this)} changeDate={this.changeDate.bind(this)} changeValue={this.changeValue.bind(this)}/> :
          <Mobile data={this.state.data} user={this.props.user} id={this.props.match.params.id} changeActivityToDone={this.changeActivityToDone} deleteMember={this.deleteMember.bind(this)} changePlace={this.changePlace.bind(this)} changeDate={this.changeDate.bind(this)} changeValue={this.changeValue.bind(this)} />}
        {this.state.modal ?
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.addMember}>
                <div>&times;</div>
              </span>
              {this.props.user.email ?
                <AddMember user={this.props.user} id={this.props.match.params.id} data={this.state.data} addMember={this.addMember}/> :
                <ActSignin user={this.props.user} sub={this.props.sub} anonymous={this.props.anonymous}/>}
            </div>
          </div> : <></>}
            {this.getAlert()}
        {this.state.data.done ?
          <div className="cover"><img src={completed}/></div> : <></>}
      </div>
    </>;
  }
}

export default withRouter(Activity);
