import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DB } from "../db";
import regeneratorRuntime from "regenerator-runtime";

// let testdate =  new Date()
// console.log(testdate);
// let today = `${testdate.getFullYear()}/${testdate.getMonth() +1 }/${testdate.getDate()}`;
// console.log(today);
//
// let Daysago = function(days){
//   let d = new Date();
//   let test = d.setDate(d.getDate()-days);
//   let answer = new Date(test);
//   let finaldate = `${answer.getFullYear()}/${answer.getMonth() +1 }/${answer.getDate()}`;
//   // console.log(finaldate);
//   return finaldate
// }
// console.log(Daysago(7));
//
// let DateDiff = function (sDate1, sDate2) { // sDate1 和 sDate2 是 2016-06-18 格式
//   let oDate1 = new Date(sDate1);
//   let oDate2 = new Date(sDate2);
//   let iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); // 把相差的毫秒數轉換為天數
//   return iDays;
// };
//
// let dayGap = DateDiff(today,"2020/7/26");
// console.log(dayGap);
//
// let isInt = function(value) {
//   return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
// }
//
// let divisionSeven = dayGap/7;
// let divisionThirty = dayGap/30;
//
// let haha = isInt(divisionSeven);
// console.log(haha);

class List extends React.Component {
  constructor (props) {
    super(props);
    console.log(props)
    this.deleteAct = this.deleteAct.bind(this);
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    // this.daysago = this.daysago.bind(this);
    // this.getDate = this.getDate.bind(this);
    this.state = {
      list: [],
      show: false,
      modal: false
    }
  }

  // daysago(days){
  //   let d = new Date();
  //   let test = d.setDate(d.getDate()-days);
  //   let answer = new Date(test);
  //   let finaldate = `${answer.getFullYear()}/${answer.getMonth() +1 }/${answer.getDate()}`;
  //   return finaldate
  // }

  // getActs(){
  //   DB.collection("activity").where('member_email', 'array-contains-any', [this.props.user.email])
  //     .onSnapshot(docs => {
  //       let userAct = [];
  //       docs.forEach(function(doc) {
  //         let data = {
  //           data: doc.data(),
  //           id: doc.id
  //         }
  //         userAct.push(data);
  //       });
  //       this.setState({
  //         list: userAct
  //       });
  //     })
  // }

  getActs(){
    DB.collection("activity").where('member_email', 'array-contains-any', [this.props.user.email])
      .get()
      .then(docs => {
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
      })
  }

  componentDidMount(){
    this.getActs();
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.user.login !== this.props.user.login) {
      this.getActs();
    } else {
      console.log("nothing happen in componentDidUpdate")
    }
  }

  // getDate(){
  //   DB.collection('activity').where('onlyDate','==',this.daysago(0))
  //   .get()
  //   .then(function(querySnapshot) {
  //         let act = [];
  //         querySnapshot.forEach(function(doc) {
  //           console.log(doc.data())
  //           let data = {
  //             data: doc.data(),
  //             id: doc.id
  //           }
  //           act.push(data);
  //         });
  //         console.log(act)
  //         return act;
  //     })
  //     .catch(function(error) {
  //         console.log("Error getting documents: ", error);
  //     });
  // }

  updateShow(){
    this.setState({
      show: !this.state.show
    })
  }

  deleteAct(id){
    console.log(id);
    DB.collection('activity')
    .doc(id)
    .delete()
    .then(() => console.log('Document successfully deleted!'))
    .then(()=> this.getActs())
  }

  changeActivityToDone(id, i){
    let list = [];
    if(!this.state.show){
      list = this.state.list.filter(item => !item.data.done);
    } else if (this.state.show ){
      list = this.state.list.filter(item => item.data.done);
    }
    let data = list[i].data;
    if (this.props.user.email === data.holder.email){
       //deleteId is the id from the post you want to delete
      DB.collection("activity").doc(id).update({
         done: !data.done
       })
      .catch(function(error) {
          console.error("Error removing document: ", error);
      });
    } else {
      alert("只有舉辦人能改變活動狀態唷！")
    }
  }

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
              <img src="/src/img/trash.png" className="trashImg" onClick={()=>{this.deleteAct(act.id)}} />
            </div>
          }));
        }
      }
    return <>
        <div className="listBox">
          <div className="userName">我的活動</div>
            <div className="add">
              <Link to="/add" style={linkStyle}>
                 <button>Add +</button>
              </Link>
            </div>
          <div className="list">{data()}</div>
          <div className="btn">
            <button onClick={()=> this.updateShow("undo")} id="undoBtn" className={this.state.show ? "" : "choosenList"}>未完成</button>
            <button onClick={()=> this.updateShow("done")} id="doneBtn" className={this.state.show ? 'choosenList' : ""}>已完成</button>
          </div>
        </div>
      </>;
  }
}



export default List;
