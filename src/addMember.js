import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class AddMember extends React.Component {
  constructor (props) {
    super(props);
    this.addMemberName = this.addMemberName.bind(this);
    this.addMemberEmail = this.addMemberEmail.bind(this);
    this.addMemberPervalue = this.addMemberPervalue.bind(this);
    this.submitAddMember = this.submitAddMember.bind(this);
    this.state = {
      newMember: {
        name: "",
        email: "",
        perValue: "",
        done: false
      },
      exist_memberDetails: [],
      exist_memberEmails: []
    }
  }

  componentDidMount() {
    let userAct =[];
    let users =[];
    firebase.firestore().collection("activity").doc(this.props.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          let data = doc.data();
          userAct = data.member_details;
          users = data.member_email;
          // console.log(doc.data().member_details);
          console.log(userAct);
          this.setState({
            exist_memberDetails: userAct,
            exist_memberEmails: users
          })
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            alert("此活動不存在，請先建立活動再設定用戶！")
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  addMemberName(e){
    this.setState({
      newMember: {
        ...this.state.newMember,
        name: e.target.value,
      }
    });
  };

  addMemberEmail(e){
    this.setState({
      newMember: {
        ...this.state.newMember,
        email: e.target.value,
      }
    });
  };

  addMemberPervalue(e){
    this.setState({
      newMember: {
        name: document.getElementById("addMemberText").value,
        email: document.getElementById("addMemberEmail").value,
        perValue: e.target.value,
        done: false
      }
    });
  };

  submitAddMember(){
    let oldMemberDetails = this.state.exist_memberDetails;
    let oldMemberEmail = this.state.exist_memberEmails;
    let dataDatail = this.state.newMember;
    let dataEmail = this.state.newMember.email;
    // console.log(dataDatail);
    // console.log(oldMemberDetails);
    // oldMemberDetails.push(dataDatail);
    // oldMemberEmail.push(dataEmail);
    if (this.state.newMember.perValue === ""){
      alert("請輸入欠債金額！");
    } else if(this.state.newMember.name === ""){
      alert ("請輸入債戶名稱！");
    } else if(this.state.newMember.email === ""){
      alert("請輸入債戶信箱！");
    } else {
      let result = this.state.exist_memberEmails.indexOf(this.state.newMember.email);
      // console.log(result);
      if (result !== -1){
        console.log("此用戶存在");
        alert("此email用戶已存在於活動中囉！");
      } else {
        oldMemberDetails.push(dataDatail);
        oldMemberEmail.push(dataEmail);
        firebase.firestore().collection("activity").doc(this.props.id)
          .set({
            member_details: oldMemberDetails,
            member_email: oldMemberEmail
          }, { merge: true })
        this.props.addMember();
      }
    }
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    return <div className="addMember">
      <h3 className="addMemberTitle">新增債戶</h3>
      <div>暱稱：<input id="addMemberText" defaultValue={this.props.user.name} placeholder="請填入名稱" onChange={this.addMemberName}/></div>
      <div>信箱：<input id="addMemberEmail" type="email" defaultValue={this.props.user.email} placeholder="請填入信箱" onChange={this.addMemberEmail} /></div>
      <div>欠債：<input id="addMemberPerValue" type="number" placeholder="請填入金額" onChange={this.addMemberPervalue} /></div>
      <div className="addMemberBtn"><button onClick={this.submitAddMember}>送出</button></div>
    </div>;
  }
}

export default AddMember;
