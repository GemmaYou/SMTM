import React from "react";
import ReactDOM from "react-dom";
import './style.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {Link} from "react-router-dom";
import Nav from "./nav";
import List from "./list";
import Member from "./member";
import Activity from "./activity";
import Submit from "./submit";
import Signin from "./signin";
import AddOne from "./add";
import AddOnce from "./addOnce";
import AddPeriod from "./addPeriod";
import login from './img/people.png';
import logedin from './img/logedin.png';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB2nj46DeqUcu7IeXDHxRi_35OLLHHtZGY",
  authDomain: "smtm-5618c.firebaseapp.com",
  databaseURL: "https://smtm-5618c.firebaseio.com",
  projectId: "smtm-5618c",
  storageBucket: "smtm-5618c.appspot.com",
  messagingSenderId: "40463161734",
  appId: "1:40463161734:web:18c2a9654b39047996b407"
};

firebase.initializeApp(firebaseConfig);
const DB = firebase.firestore();

class App extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      user: {
        login: false,
        name: "",
        email: "",
        id: ""
      },
      activity: {
      },
      additem: {
        name: "",
        kind: "once",
        place: "",
        date: "",
        holder: "",
        value: "",
        done: false
      },
      listChange: {
      }
    };
  }

  componentDidMount() {
    let userAct =[];
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log(user);
        // console.log(user.displayName);
        document.getElementById("login").src= logedin;
        if (user.displayName !== null){ //submit沒有displayName
          // console.log("have displayname")
          let info = {name: user.displayName, email: user.email, id: user.uid, login: true};
          this.setState((prevState, props) => ({
            user: info
          }));

          DB.collection("activity").where('member', 'array-contains-any', [this.state.user.email])
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                  userAct.push(doc.data());
                });
            })
            .catch(function(error) {
                console.log("Error getting documents: ", error);
            });

            this.setState({
              activity: userAct,
              listChange: userAct
            })
        }
      } else {
        // No user is signed in.
        document.getElementById("login").src= login;
        let info = {name: "", email: "", id: "", login: false};
        this.setState({
          user: info,
          activity: {
          },
          additem: {
            name: "",
            kind: "once",
            place: "",
            date: "",
            holder: "",
            value: "",
            done: false
          },
          listChange: {
          }
        });
        console.log("no one log in");
      }
    }.bind(this));
  }

  sub(){
    let user = {
      email: email.value,
      pwd: pwd.value,
      name: document.getElementById("name").value
    };

    firebase.auth().createUserWithEmailAndPassword(user.email, user.pwd)
      .then((result) => {
        DB.collection("members") //建立DB資料
          .doc(result.user.uid)
          .set({
            email: user.email,
            name: user.name
          })
          .then(() => { // 儲存成功後顯示訊息
            console.log("完成註冊");
          });
        let info = {name: user.name, email: user.email, id: result.user.uid, login: true};
        this.setState({
          user: info
        });
        // 更新使用者名稱
        return result.user.updateProfile({
          displayName: user.name
        })
      }).catch(err => { // 註冊失敗時顯示錯誤訊息
        alert(err.message);
      });
  }

  addOnChangeName(e){
    this.setState({
      additem: {
        ...this.state.additem,
        name: e.target.value,
        member: [
          this.state.user.email
        ]
      }
    });
  };
  addOnChangeKind(e){
    this.setState({
      additem : {
        ...this.state.additem,
        kind: e.target.value
      }
    });
  };
  addOneToTwo(){
    let name = this.state.additem.name;
    let kind = this.state.additem.kind;
    if (name === "") {
      alert ("請先填入活動名稱！")
    } else if (kind === "") {
      alert ("請選擇活動類型！")
    } else if (kind === "once") {
      window.location.href = "./#/addOnce";
    } else {
      window.location.href = "./#/addPeriod";
    }
  }

  addOnChangePlace(e){
    this.setState({
      additem : {
        ...this.state.additem,
        place: e.target.value
      }
    });
  };

  addOnChangeDate(e){
    this.setState({
      additem : {
        ...this.state.additem,
        date: e.target.value
      }
    });
  };

  addOnChangeHolder(e){
    this.setState({
      additem : {
        ...this.state.additem,
        holder: e.target.value
      }
    });
  };

  addOnChangeValue(e){
    this.setState({
      additem : {
        ...this.state.additem,
        value: e.target.value
      }
    });
  };

  addFinal(){
    let userAct =[]; //this.state.activity
    let kind = this.state.additem.kind;
    let place = this.state.additem.place;
    let date = this.state.additem.date;
    let holder = this.state.additem.holder;
    let value = this.state.additem.value;
    if (kind === "once"){
      if (date === "") {
        alert ("請填入時間！")
      } else if (holder === "") {
        alert ("請填入此次atm是誰！")
      } else if (value === "") {
        alert ("請填入此次金額！")
      } else {
        //userAct.push(this.state.additem)
        DB.collection("activity") //建立DB資料
          .add(
            this.state.additem,
          )
          .then(res => { // 儲存成功後顯示訊息
            console.log(res);
            console.log(res.id);
            console.log("已上傳資料");
            this.setState({
              additem: {
                name: "",
                kind: "once",
                place: "",
                date: "",
                holder: "",
                value: "",
                done: false
              }
            });
          });
        DB.collection("activity").where('member', 'array-contains-any', [this.state.user.email])
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                userAct.push(doc.data());
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });

          this.setState({
            activity: userAct,
            listChange: userAct
          });
        window.location.href = "./#/chapter";
      }
    } else {
      if (holder === "") {
        alert ("請填入大金主是誰！")
      } else if (value === "") {
        alert ("請填入每次總額！")
      } else {
        DB.collection("activity") //建立DB資料
          .add(
            this.state.additem
          )
          .then(res => { // 儲存成功後顯示訊息
            console.log(res);
            console.log(res.id);
            console.log("已上傳資料");
            this.setState({
              additem: {
                name: "",
                kind: "once",
                place: "",
                date: "",
                holder: "",
                value: "",
                done: false
              }
            });
          })
        DB.collection("activity").where('member', 'array-contains-any', [this.state.user.email])
          .get()
          .then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                userAct.push(doc.data());
                // doc.data() is never undefined for query doc snapshots
                // console.log(doc.data());
              });
          })
          .catch(function(error) {
              console.log("Error getting documents: ", error);
          });

          this.setState({
            activity: userAct
          })
      }
      window.location.href = "./#/chapter";
    }
  }

  listChangeToAll(){
    let listChange = this.state.activity;
    this.setState({
      listChange: listChange
    })
  }

  listChangeToUndo(){
    let listChange = this.state.activity.filter(item => !item.done);
    this.setState({
      listChange: listChange
    })
  }

  listChangeToDone(){
    let listChange = this.state.activity.filter(item => item.done);
    this.setState({
      listChange: listChange
    })
  }

  render() {
    console.log(this.state);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
      return (<Router>
        <div>
          <div className="title">
            <Link to="/" style={mystyle}><h1>SMTM</h1></Link>
            <Nav />
          </div>
          <div className="main">
            {this.state.redirect ? <Redirect push to="/activity"/> :
              <Switch>
                  <Route path="/chapter">
                    <List listChange={this.state.listChange} listChangeToAll={this.listChangeToAll.bind(this)}
                    listChangeToUndo={this.listChangeToUndo.bind(this)} listChangeToDone={this.listChangeToDone.bind(this)}/>
                  </Route>
                  <Route path="/activity">
                    <Activity activity={this.state.activity}/>
                  </Route>
                  <Route path="/member">
                    <Member user={this.state.user} sub={this.sub.bind(this)}/>
                  </Route>
                  <Route path="/add">
                    <AddOne additem={this.state.additem} addOnChangeName={this.addOnChangeName.bind(this)} addOnChangeKind={this.addOnChangeKind.bind(this)} addOneToTwo={this.addOneToTwo.bind(this)} />
                  </Route>
                  <Route path="/addOnce">
                    <AddOnce additem={this.state.additem} addOnChangePlace={this.addOnChangePlace.bind(this)} addOnChangeDate={this.addOnChangeDate.bind(this)} addOnChangeHolder={this.addOnChangeHolder.bind(this)} addOnChangeValue={this.addOnChangeValue.bind(this)} addFinal={this.addFinal.bind(this)}
                    />
                  </Route>
                  <Route path="/addPeriod">
                    <AddPeriod additem={this.state.additem} addOnChangePlace={this.addOnChangePlace.bind(this)} addOnChangeDate={this.addOnChangeDate.bind(this)} addOnChangeHolder={this.addOnChangeHolder.bind(this)} addOnChangeValue={this.addOnChangeValue.bind(this)} addFinal={this.addFinal.bind(this)}
                    />
                  </Route>
                <Route path="/">
                  <div className="main">
                    <h2>Home Page</h2>
                  </div>
                </Route>
              </Switch>
            }
          </div>
        </div>
        </Router>
      );
  }
}

export default App;
