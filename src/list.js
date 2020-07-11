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

class List extends React.Component {
  constructor (props) {
    super(props);
    console.log(props)
    // this.deletAct = this.deletAct.bind(this);
    this.state = {
      list: [],
      show: "all"
    }
  }
  getActs(){
    let userAct = [];
    firebase.firestore().collection("activity").where('member', 'array-contains-any', [this.props.user.email])
      .get()
      .then((querySnapshot) => {
          querySnapshot.forEach(function(doc) {
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
      .catch(function(error) {
          console.log("Error getting documents: ", error);
      });
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

  updateShow(i){
    this.setState({
      show: i
    })
  }

  deleteAct(id){
    console.log(id);
    firebase.firestore().collection('activity')
    .doc(id)
    .delete()
    .then(() => console.log('Document successfully deleted!'))
    .then(()=> this.getActs())
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
    if(this.state.show === "all"){
      list = this.state.list;
    } else if(this.state.show === "undo"){
      list = this.state.list.filter(item => !item.data.done);
    } else if (this.state.show === "done"){
      list = this.state.list.filter(item => item.data.done);
    }
    let data = list.map((act, i)=>{
      return <div key={i} className="item">
          <img src={act.data.done ? done : undo} className="check" />
          <div className="listItemName">
            <Link to={"/activity/"+act.id} style={linkStyle}>
              {act.data.name} / ({act.data.date})
            </Link>
          </div>
          <img src={trash} className="trashImg" onClick={()=>{this.deleteAct(act.id)}} />
        </div>
      });
    return <>
        <div className="listBox">
          <div className="search">
            <input placeholder="找什麼呢" />
            <img src={search} className="searchImg" />
          </div>
          <div className="userName">{this.props.user.name}</div>
            <div className="add"><Link to="/add" style={linkStyle}>新增活動 <img src={add} className="addImg" /></Link></div>
          <div className="invite">使用連結 <img src={invite} className="inviteImg" /></div>
          <div className="list">{data}</div>
          <div className="btn">
            <button onClick={()=> this.updateShow("all")} id="allBtn">全部</button>
            <button onClick={()=> this.updateShow("undo")} id="undoBtn">未完成</button>
            <button onClick={()=> this.updateShow("done")} id="doneBtn">已完成</button>
          </div>
        </div>
      </>;
  }
}

export default List;
