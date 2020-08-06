import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import add from "./img/add.png";
import invite from "./img/invite.png";
import undo from "./img/nonCheck.png";
import done from "./img/donecheck.png";
import search from "./img/search.png";
import trash from "./img/trash.png";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import regeneratorRuntime from "regenerator-runtime";

// let testdate =  new Date()
// // console.log(testdate);
// let today = `${testdate.getFullYear()}/${testdate.getMonth() +1 }/${testdate.getDate()}`;
// console.log(today);
//
// let DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
//   let oDate1 = new Date(sDate1);
//   let oDate2 = new Date(sDate2);
//   let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
//   return iDays;
// };

class List extends React.Component {
  constructor (props) {
    super(props);
    console.log(props)
    // this.deletAct = this.deletAct.bind(this);
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    // this.addThroughLink = this.addThroughLink.bind(this);
    this.Daysago = this.Daysago.bind(this);
    this.getDate = this.getDate.bind(this);
    this.state = {
      list: [],
      show: false,
      modal: false
    }
  }

  Daysago(days){
    let d = new Date();
    let test = d.setDate(d.getDate()-days);
    let answer = new Date(test);
    let finaldate = `${answer.getFullYear()}/${answer.getMonth() +1 }/${answer.getDate()}`;
    // console.log(finaldate);
    return finaldate
  }

  getActs(){
    firebase.firestore().collection("activity").where('member_email', 'array-contains-any', [this.props.user.email])
      .onSnapshot(docs => {
        let userAct = [];
        docs.forEach(function(doc) {
          let data = {
            data: doc.data(),
            id: doc.id
          }
          userAct.push(data);
        });
        this.setState({
          list: userAct
        });
        // let date = userAct[0].data.date;
        // let test = new Date(date);
        // console.log(test);
        // let actdate = `${test.getFullYear()}/${test.getMonth() +1 }/${test.getDate()}`;
        // console.log(actdate);
        // console.log(DateDiff(today, actdate));
      })
      // .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      // });

      // let act=()=>{
      //   let userAct = [];
      //   firebase.firestore().collection("activity")
      //     .onSnapshot(querySnapshot => {
      //       querySnapshot.forEach(function(doc) {
      //         let date = new Date(doc.data().date);
      //         let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`;
      //         let data = {
      //           date: actdate,
      //           id: doc.id
      //         }
      //         userAct.push(data);
      //       });
      //       // let date = userAct[0].data.date;
      //       // let test = new Date(date);
      //       // console.log(test);
      //       // let actdate = `${test.getFullYear()}/${test.getMonth() +1 }/${test.getDate()}`;
      //       // console.log(actdate);
      //       // console.log(DateDiff(today, actdate));
      //     })
      //     return userAct;
      //   }
      //
      // console.log(act());

      // let getValues = async () => {
      //     let data = await firebase.firestore().collection('activity').get();
      //     let allAct = [];
      //     for(const doc of data.docs){
      //       console.log(doc.id, '=>', doc.data());
      //       let date = new Date(doc.data().date);
      //       let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`;
      //       let info = {
      //         date: actdate,
      //         id: doc.id
      //       }
      //       allAct.push(info);
      //       return allAct;
      //     }
      //     // if (doc.exists) {
      //     //   console.log(doc.data());
      //     //   return doc.data();}
      //     throw new Error("No such document");
      // }
      // console.log(getValues());

      // let allAct = firebase.firestore().collection('activity').get()
      //   .then(snapshot => {
      //     let userAct = [];
      //       snapshot.forEach(doc => {
      //         let date = new Date(doc.data().date);
      //         let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`;
      //         let data = {
      //           date: actdate,
      //           data: doc.data(),
      //           id: doc.id
      //         }
      //         userAct.push(data);
      //       });
      //     return userAct;
      //   })
      //   .catch(err => {
      //       console.log('Error getting documents', err);
      //   });
      // console.log(allAct);

      // firebase.firestore().collection("activity").where('onlyDate','==',this.Daysago(0))
      //   .onSnapshot(querySnapshot => {
      //     let userAct = [];
      //     querySnapshot.forEach(function(doc) {
      //       console.log(doc.data());
      //       let data = {
      //         data: doc.data(),
      //         id: doc.id
      //       }
      //       userAct.push(data);
      //     });
      //     // let date = userAct[0].data.date;
      //     // let test = new Date(date);
      //     // console.log(test);
      //     // let actdate = `${test.getFullYear()}/${test.getMonth() +1 }/${test.getDate()}`;
      //     // console.log(actdate);
      //     // console.log(DateDiff(today, actdate));
      //   })
      //
      // console.log(this.Daysago(5));
      // let test = this.getDate();
      // console.log(test);
  }

  componentDidMount(){
    this.getActs();
    // console.log(userAct);
    // console.log("componentDidUpdate");
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.user.login !== this.props.user.login) {
      this.getActs();
    } else {
      console.log("nothing happen in componentDidUpdate")
    }
  }

  getDate(){
    firebase.firestore().collection('activity').where('onlyDate','==',this.Daysago(0))
    .get()
    .then(function(querySnapshot) {
          let act = [];
          querySnapshot.forEach(function(doc) {
            console.log(doc.data())
            let data = {
              data: doc.data(),
              id: doc.id
            }
            act.push(data);
          });
          console.log(act)
          return act;
      })
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
  }

  updateShow(){
    this.setState({
      show: !this.state.show
    })
  }

  deleteAct(id){
    console.log(id);
    firebase.firestore().collection('activity')
    .doc(id)
    .delete()
    .then(() => console.log('Document successfully deleted!'))
    // .then(()=> this.getActs())
  }

  changeActivityToDone(id, i){
    let list = [];
    if(!this.state.show){
      list = this.state.list.filter(item => !item.data.done);
    } else if (this.state.show ){
      list = this.state.list.filter(item => item.data.done);
    }
    // console.log(this.state.list[i]);
    let data = list[i].data;
    if (this.props.user.email === data.holder.email){
      // console.log("holder");
       //deleteId is the id from the post you want to delete
      firebase.firestore().collection("activity").doc(id).update({
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

  // addThroughLink(){
  //   this.setState({
  //     modal: !this.state.modal
  //   })
  // }

  render() {
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
    let list = [];
    if(!this.state.show){
      list = this.state.list.filter(item => !item.data.done);
    } else if (this.state.show){
      list = this.state.list.filter(item => item.data.done);
    }
    console.log(list);
    let data = ()=>{
        if (this.state.list.length === 0){
          return <div className="noListNotice">目前沒有活動唷，趕緊新增一個吧！ &#10138;</div>
        } else {
          return (
          list.map((act, i)=>{
          return <div key={i} className="item">
              <div className="listItemName">
                <Link to={"/activity/"+act.id} style={linkStyle}>
                  {act.data.name}
                </Link>
              </div>
              <img src={trash} className="trashImg" onClick={()=>{this.deleteAct(act.id)}} />
            </div>
          }));
        }
      }
    return <>
        <div className="listBox">
          {/*<div className="search">
            <input placeholder="找活動" />
            <img src={search} className="searchImg" />
          </div>*/}
          <div className="userName">我的活動</div>
            <div className="add">
              <Link to="/add" style={linkStyle}>
                {/*新增活動
                 <img src={add} className="addImg" />*/}
                 <button>Add +</button>
              </Link>
            </div>
          {/*<div className="invite" onClick={this.addThroughLink}>使用連結 <img src={invite} className="inviteImg" /></div>*/}
          <div className="list">{data()}</div>
          <div className="btn">
            {/*<button onClick={()=> this.updateShow("all")} id="allBtn" className={this.state.show === "all" ? 'choosenList' : ""}>全部</button>*/}
            <button onClick={()=> this.updateShow("undo")} id="undoBtn" className={this.state.show ? "" : "choosenList"}>未完成</button>
            <button onClick={()=> this.updateShow("done")} id="doneBtn" className={this.state.show ? 'choosenList' : ""}>已完成</button>
          </div>
        </div>
        {/*{this.state.modal ?
          <div id="myModal" className="list-modal">
            <div className="list-modal-content">
              <span className="list-modal-close" onClick={this.addThroughLink}>
                &times;
              </span>
            </div>
          </div> : <></>}*/}
      </>;
  }
}



export default List;
