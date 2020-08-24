import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DB } from "../db";
import regeneratorRuntime from "regenerator-runtime";

class List extends React.Component {
  constructor (props) {
    super(props);
    // console.log(props)
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
    // console.log(id);
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
    // console.log(list);
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
