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
    this.changeActivityToDone = this.changeActivityToDone.bind(this);
    this.addThroughLink = this.addThroughLink.bind(this);
    this.state = {
      list: [],
      show: false,
      modal: false
    }
  }
  getActs(){
    firebase.firestore().collection("activity").where('member_email', 'array-contains-any', [this.props.user.email])
      .onSnapshot(querySnapshot => {
        let userAct = [];
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
      // .catch(function(error) {
      //     console.log("Error getting documents: ", error);
      // });
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
    .then(()=> this.getActs())
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

  addThroughLink(){
    this.setState({
      modal: !this.state.modal
    })
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
    let data = list.map((act, i)=>{
      return <div key={i} className="item">
          {/*<img src={act.data.done ? done : undo} className="check" onClick={() =>this.changeActivityToDone(act.id, i)}/>*/}
          <div className="listItemName">
            <Link to={"/activity/"+act.id} style={linkStyle}>
              {act.data.name}
            </Link>
          </div>
          {/*<img src={trash} className="trashImg" onClick={()=>{this.deleteAct(act.id)}} />*/}
        </div>
      });
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
          <div className="list">{data}</div>
          <div className="btn">
            {/*<button onClick={()=> this.updateShow("all")} id="allBtn" className={this.state.show === "all" ? 'choosenList' : ""}>全部</button>*/}
            <button onClick={()=> this.updateShow("undo")} id="undoBtn" className={this.state.show ? "" : "choosenList"}>未完成</button>
            <button onClick={()=> this.updateShow("done")} id="doneBtn" className={this.state.show ? 'choosenList' : ""}>已完成</button>
          </div>
        </div>
        {this.state.modal ?
          <div id="myModal" className="list-modal">
            <div className="list-modal-content">
              <span className="list-modal-close" onClick={this.addThroughLink}>
                &times;
              </span>
            </div>
          </div> : <></>}
      </>;
  }
}



export default List;
