import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import { DB } from "../db";
import Mobile from "./actMobile";
import Desk from "./actDesk";
import SigninModal from "../modal/signinModal";
import AddMember from "./addMember";

class Activity extends React.Component {
  constructor (props) {
    super(props);
    this.getDataFirst = this.getDataFirst.bind(this);
    // this.getData = this.getData.bind(this);
    this.addMember = this.addMember.bind(this);
    this.firstTimeAlert = this.firstTimeAlert.bind(this);
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    this.getAlert = this.getAlert.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.clickCopy = this.clickCopy.bind(this);
    this.resize = this.resize.bind(this);
    this.changeMemberCheck = this.changeMemberCheck.bind(this);
    this.state = {
      id: this.props.match.params.id,
      location: "",
      copy: "",
      modal: false,
      window: false,
      firstTime: true,
      firstData: true,
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
        value: "",
        onlyDate: "",
        period: ""
      }
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
    this.resize();
    const id = this.props.match.params.id;
    // if(this.state.firstTime){
    //   this.getDataFirst(id);
    // } else if (!this.state.firstTime){
    //   this.getData(id);
    // }
    this.getDataFirst(this.state.id);
    this.setState({
      location: window.location.href
    })
  }

  componentWillUnmount() {
    clearInterval(this.resize);
  }

  getDataFirst(id){
    DB.collection("activity").doc(id)
    .get()
    .then(doc => {
      if (doc.exists) {
          this.setState({
            data: doc.data(),
            firstData: false
          })
      } else {
          // alert("此活動不存在唷，請再次確認連結是否正確！");
          console.log("No such document!");
      }
    });
  }

  // getData(id){
  //   DB.collection("activity").doc(id)
  //   .onSnapshot(doc => {
  //     if (doc.exists) {
  //         this.setState({
  //           data: doc.data()
  //         })
  //     }
  //   });
  // }

  resize() {
    if (window.innerWidth <= 1000){
      this.setState({window: false});
    }else if (window.innerWidth > 1000) {
      this.setState({window: true})
    }
  }

  addMember(){
    this.setState({
      modal: !this.state.modal
    })
    this.getDataFirst(this.state.id);
  }

  deleteMember (e) {
    let docId = this.props.match.params.id;
    let details = this.state.data.member_details;
    let emails = this.state.data.member_email;
     //deleteId is the id from the post you want to delete

    DB.collection("activity").doc(docId).update({
       member_details: details.filter(detail => detail.email !== e),
       member_email: emails.filter(email => email !== e)
     })
    .catch(function(error) {
        console.error("Error removing document: ", error);
    });
    this.getDataFirst(this.props.match.params.id);
  }

  changeActivityToDone(){
    let docId = this.props.match.params.id;
    let data = this.state.data;
    let emails = this.state.data.member_email;

    if (this.props.user.email === data.holder.email){
       //deleteId is the id from the post you want to delete
      DB.collection("activity").doc(docId).update({
         done: !data.done
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("只有舉辦人能改變活動狀態唷！")
    }
    this.getDataFirst(docId);
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
                      <div>嗨，陌生人！ <br/>
                        歡迎加入活動，未來有欠錢記得還！
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
                        <div>嗨， {this.props.user.name}！<br/>
                          目前還沒有人參加活動唷，<br/>
                          趕緊新增幾位朋友吧！
                        </div>
                      </div>
                    </div>
                  </div>
                </div>);
            } else {
              let member = this.state.data.member_details.filter(detail => detail.done === false);

              if(member.length === 0){
                return (<div id="myModal" className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={this.firstTimeAlert}><div>&times;</div></span>
                    <div className="hostAlert">
                      <div className="oweMoney">
                        <div>{user.name} 大家都還完錢了欸，真棒！</div>
                      </div>
                    </div>
                  </div>
                </div>)
              } else {
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
                        <div>嗨！{this.props.user.name}...這些人欠錢不還！</div>
                        <div className="undoList">{data}</div>
                      </div>
                    </div>
                  </div>
                </div>);
              }
            }
          } else {
            let member = data.member_details.filter(detail => detail.email === user.email);
            console.log(member[0].done)
            if (!member[0].done){
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
        }
      }
    }
  }

  convertDate(ddate){
    let date = new Date(ddate);
    let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`
    return actdate;
  }

  changeName(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      DB.collection("activity").doc(docId).update({
         name: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.getDataFirst(this.props.match.params.id);
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changePlace(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      DB.collection("activity").doc(docId).update({
         place: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.getDataFirst(this.props.match.params.id);
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changeDate(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      DB.collection("activity").doc(docId).update({
        date: e.target.value,
        onlyDate: this.convertDate(e.target.value)
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.getDataFirst(this.props.match.params.id);
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changePeriod(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      DB.collection("activity").doc(docId).update({
        period: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.getDataFirst(this.props.match.params.id);
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  changeValue(e){
    if (this.props.user.login){
      let docId = this.props.match.params.id;
      DB.collection("activity").doc(docId).update({
         value: e.target.value
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
      this.getDataFirst(this.props.match.params.id);
    } else {
      alert("會員才能修改活動唷！");
      this.props.history.push("/member");
    }
  }

  clickCopy(){
    this.setState({
      copy: true
    })

    setTimeout(
      function() {
          this.setState({ copy: false });
      }
      .bind(this),
      3000
    );
  }

  changeMemberCheck(e){
    let id = this.props.match.params.id;
    let user = this.props.user;
    let data = this.state.data;
    let member = this.state.data.member_email;
    let details = this.state.data.member_details;
    let i = member.indexOf(e)-1;

    if (user.email === e || user.email === data.holder.email){
      details[i].done = !details[i].done;

      DB.collection("activity").doc(id).update({
        member_details: details
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("只有本人或舉辦人能改變各自的活動狀態唷！")
    }
    this.getDataFirst(this.props.match.params.id);
  }

  render() {
    let data = this.state.data;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    let copied = ()=>{
      if(this.state.copy === ""){
        return null
      } else if(this.state.copy){
        return(<div className="copyLink animate__animated animate__fadeInDown">Copied</div>)
      } else if(!this.state.copy) {
        return(<div className="copyLink animate__animated animate__fadeOutUp">Copied</div>)
      }
    }
    return <>
      <div className="activityBox">
        {copied()}
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
          <Desk location={this.state.location} data={this.state.data} user={this.props.user} id={this.props.match.params.id} clickCopy={this.clickCopy} changeActivityToDone={this.changeActivityToDone} deleteMember={this.deleteMember.bind(this)} changePlace={this.changePlace.bind(this)} changeDate={this.changeDate.bind(this)} changePeriod={this.changePeriod.bind(this)} changeValue={this.changeValue.bind(this)}
          getData={this.getDataFirst} changeMemberCheck={this.changeMemberCheck}/> :
          <Mobile clickCopy={this.clickCopy} data={this.state.data} user={this.props.user} id={this.props.match.params.id} changeActivityToDone={this.changeActivityToDone} deleteMember={this.deleteMember.bind(this)} changePlace={this.changePlace.bind(this)} changeDate={this.changeDate.bind(this)} changePeriod={this.changePeriod.bind(this)} changeValue={this.changeValue.bind(this)} getData={this.getDataFirst} changeMemberCheck={this.changeMemberCheck} />}
        {this.state.modal ?
          <div id="myModal" className="modal">
            <div className="modal-content">
              <span className="close" onClick={this.addMember}>
                <div>&times;</div>
              </span>
              {this.props.user.email ?
                <AddMember user={this.props.user} id={this.props.match.params.id} data={this.state.data} addMember={this.addMember} getData={this.getDataFirst}/> :
                <SigninModal user={this.props.user} sub={this.props.sub} anonymous={this.props.anonymous}/>}
            </div>
          </div> : <></>}
            {this.getAlert()}
        {this.state.data.done ?
          <div className="cover animate__animated animate__flipInX"><img src="/src/img/completed.png"/></div> : <></>}
      </div>
    </>;
  }
}

export default withRouter(Activity);
