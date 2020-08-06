import React from "react";
import ReactDOM from "react-dom";
import './style.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import {Link} from "react-router-dom";
import { Redirect } from "react-router-dom";
import cashBack from "./img/cashBack.jpg";
import home from "./img/home.jpg";
import downArrow from "./img/down-arrow.png";
import Nav from "./nav";
import List from "./list";
import Member from "./member";
import Activity from "./activity";
import Submit from "./submit";
import Signin from "./signin";
import AddOne from "./add";
import AddOnce from "./addOnce";
import AddPeriod from "./addPeriod";
import ActSignin from "./actSignin";
import MemberSignin from "./memberSignin";
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
    this.sub = this.sub.bind(this);
    this.anonymous = this.anonymous.bind(this);
    this.clickHomepageSignin = this.clickHomepageSignin.bind(this);
    this.closeHomepageSignin = this.closeHomepageSignin.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.signin = this.signin.bind(this);
    this.state = {
      user: {
        login: false,
        name: "",
        email: "",
        id: ""
      },
      additem: {
        name: "",
        kind: "once",
        place: "",
        date: "",
        onlyDate: "",
        holder: "",
        value: "",
        done: false,
        member_details: [],
        member_email:[],
        period: "week",
      },
      modal: false
    };
  }

  componentDidMount() {
    let userAct =[];
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        if (user.displayName !== null){ //submit沒有displayName
          let info = {name: user.displayName, email: user.email, id: user.uid, login: true};
          this.setState((prevState, props) => ({
            user: info,
            modal: false
          }));

          this.props.history.push("/list");
        }
      } else {
        // No user is signed in.
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
            alert("完成註冊");
          });
        let info = {name: user.name, email: user.email, id: result.user.uid, login: true};
        this.setState({
          user: info
        });
        // 更新使用者名稱
        return result.user.updateProfile({
          displayName: user.name
        })
      })
      .then(()=>{
        console.log(this);
        this.props.history.push("/list");
      })
      .catch(err => { // 註冊失敗時顯示錯誤訊息
        alert(err.message);
      });
  }

  signin(){
    let user = {
      email: signinEmail.value,
      pwd: signinPwd.value,
    };

    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
      .then(() => {
        alert("您已登入囉！");
        this.props.history.push("/list");
      })
      .catch(function(error) { // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          alert('密碼錯誤！');
        } else if (errorCode == 'auth/user-not-found') {
          alert('沒有相符的帳號唷，請再次確認輸入內容！');
        } else if (errorCode === 'auth/invalid-email') {
          alert('email 格式錯誤！');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  anonymous(){
    let user = {
      email: email.value,
      name: document.getElementById("name").value,
      anon: true
    };
    let info = {
      name: user.name,
      email: user.email,
      login: false
    };
    this.setState({
      user: info
    })
  }

  convertDate(ddate){
    let date = new Date(ddate);
    let actdate = `${date.getFullYear()}/${date.getMonth() +1 }/${date.getDate()}`
    return actdate;
  }

  addOnChangeName(e){
    this.setState({
      // redirect: false,
      additem: {
        ...this.state.additem,
        name: e.target.value,
        member_email: [
          this.state.user.email
        ],
        member_details: [],
        holder: {
          name:this.state.user.name,
          email:this.state.user.email
        }
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
      this.props.history.push("/addOnce");
    } else {
      this.props.history.push("/addPeriod");
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
        date: e.target.value,
        onlyDate: this.convertDate(e.target.value)
      }
    });
  };

  addOnChangePeriod(e){
    this.setState({
      additem : {
        ...this.state.additem,
        period: e.target.value
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
    let holder = this.state.holder;
    let userAct = this.state.activity;
    let kind = this.state.additem.kind;
    let place = this.state.additem.place;
    let date = this.state.additem.date;
    let value = this.state.additem.value;
    if (kind === "once"){
      if (place === ""){
        alert ("請填入地點！")
      } else if (date === "") {
        alert ("請填入時間！")
      } else if (value === "") {
        alert ("請填入此次金額！")
      } else if (value < 0) {
        alert ("金額不可為負數！")
      } else {
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
                onlyDate: "",
                holder: "",
                value: "",
                done: false
              }
            });
            this.props.history.push(`/activity/${res.id}`);
          });
      }
    } else {
      if (place === ""){
        alert("請輸入事件描述")
      } else if (holder === "") {
        alert ("請填入大金主是誰！")
      } else if (value === "") {
        alert ("請填入每次總額！")
      } else if (value < 0) {
        alert ("總額不可為負數！")
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
                onlyDate: "",
                holder: "",
                value: "",
                done: false
              }
            });
            this.props.history.push(`/activity/${res.id}`);
          })
      }
    }
  }

  clickHomepageSignin(){
    if(this.state.user.login){
      this.props.history.push("/list");
    } else {
      this.setState((prevState,prevProps)=>({
        modal: !prevState.modal
      }))
    }
  }

  closeHomepageSignin(){
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    console.log(this.state);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
      return (
        <div>
          <div className="title">
            <Link to="/" style={mystyle}>
              <img src={cashBack} />
              <h2>CashBack</h2></Link>
            <Nav user={this.state.user}/>
          </div>
          <div className="main" id="backToTop">
              <Switch>
                  <Route path="/list">
                    {this.state.user.login ? <List user={this.state.user}/> : <Redirect to="/member" />}
                  </Route>
                  <Route path="/activity/:id">
                    <Activity user={this.state.user} sub={this.sub} anonymous={this.anonymous}/>
                  </Route>
                  <Route path="/member">
                    {this.state.user.login ? <Member user={this.state.user} /> : <MemberSignin sub={this.sub} signin={this.signin} />}
                  </Route>
                  <Route path="/add">
                    {this.state.user.login ? <AddOne additem={this.state.additem} addOnChangeName={this.addOnChangeName.bind(this)} addOnChangeKind={this.addOnChangeKind.bind(this)} addOneToTwo={this.addOneToTwo.bind(this)} /> : <Redirect to="/" />}
                  </Route>
                  <Route path="/addOnce">
                    {this.state.additem.name ? <AddOnce redirect={this.state.redirect} additem={this.state.additem} addOnChangePlace={this.addOnChangePlace.bind(this)} addOnChangeDate={this.addOnChangeDate.bind(this)}  addOnChangeValue={this.addOnChangeValue.bind(this)} addFinal={this.addFinal.bind(this)}
                    /> : <Redirect to="/add" />}
                  </Route>
                  <Route path="/addPeriod">
                    {this.state.additem.name ? <AddPeriod additem={this.state.additem} addOnChangePlace={this.addOnChangePlace.bind(this)} addOnChangeDate={this.addOnChangeDate.bind(this)} addOnChangeValue={this.addOnChangeValue.bind(this)} addOnChangePeriod={this.addOnChangePeriod.bind(this)} addFinal={this.addFinal.bind(this)}
                    /> : <Redirect to="/add" />}
                  </Route>
                <Route path="/">
                  <div className="homePage">
                    <section>
                      <div className="homePageIntro">
                        <div className="words">
                          <h1 className="animate__animated animate__fadeInLeft">還在煩惱朋友忘記還錢嗎？</h1>
                          <p className="animate__animated animate__fadeInLeft">怕討錢會傷感情？ 快來試試 CashBack！<br/>
                          系統寄信提醒還錢，不再煩惱如何開口！<br/>
                          不論是 Netflix 家庭方案主揪，或是聚餐墊錢都不怕！</p>
                        </div>
                        <div className="buttons animate__animated animate__fadeInLeft">
                          <Link to="/list" style={mystyle}>
                            <button className="toList">建立活動</button>
                          </Link>
                          <button className="toSignin" onClick={this.clickHomepageSignin.bind(this)}>註冊帳戶</button>
                        </div>
                        <img src={home} className="animate__animated animate__fadeInRight"/>
                        <div className="scroll"><a href="#intro1"><img src={downArrow} className="animate__animated animate__fadeIn" /></a></div>
                      </div>
                    </section>
                    <section id="intro1">
                      <div className="belowIntro1">
                        <div className="words animate__animated animate__fadeInRight">
                          <h1>輕鬆創建獨立活動</h1>
                          <p>便於管理活動細項，新增活動簡單容易！<br/>
                          下次聚餐時，趕緊試用看看！</p>
                          <div className="buttons">
                            <Link to="/list" style={mystyle}>
                              <button className="toList">立即試用</button>
                            </Link>
                          </div>
                        </div>
                        <div className="belowIntroImg"><img src="/src/img/addIntro.gif" className="animate__animated animate__fadeInLeft" /></div>
                        <div className="scroll-down"><a href="#intro2"><img src={downArrow} className="animate__animated animate__fadeIn" /></a></div>
                      </div>
                    </section>
                    <section id="intro2">
                      <div className="belowIntro2">
                        <div className="words animate__animated animate__fadeInLeft">
                          <h1>為活動新增用戶！</h1>
                          <p>不論是否加入會員都可以參與紀錄，<br/>
                          並隨時確認、更改付款狀況，<br/>
                          活動結束後可標註狀態，紀錄仍會保留。<br/>
                          趕快來試用看看吧！
                          </p>
                          <div className="buttons">
                            <Link to="/list" style={mystyle}>
                              <button className="toList">立即試用</button>
                            </Link>
                          </div>
                        </div>
                        <div className="belowIntroImg"><img src="/src/img/addIntro2.gif" className="animate__animated animate__fadeInRight" /></div>
                        <div className="scroll-down"><a href="#intro3"><img src={downArrow} className="animate__animated animate__fadeIn" /></a></div>
                      </div>
                    </section>
                    <section id="intro3">
                      <div className="belowIntro1">
                        <div className="words animate__animated animate__fadeInRight">
                          <h1>系統自動信件提醒</h1>
                          <p>當朋友沒還錢的時候，<br/>
                          再也不用考慮怎麼討錢比較委婉，<br/>
                          CachBack 一封信件幫你提醒！</p>
                          <div className="buttons">
                            <Link to="/list" style={mystyle}>
                              <button className="toList">立即試用</button>
                            </Link>
                          </div>
                        </div>
                        <div className="belowIntroImg"><img src="/src/img/sendMail.gif" className="animate__animated animate__fadeInLeft" /></div>
                        <div className="scroll-down last-scroll"><a href="#backToTop"><img src={downArrow} className="animate__animated animate__fadeIn" /></a></div>
                      </div>
                    </section>
                    {this.state.modal ? <div id="myModal" className="modal">
                      <div className="modal-content">
                        <span className="close" onClick={this.closeHomepageSignin}>
                          <div>&times;</div>
                        </span>
                          <ActSignin user={this.state.user} sub={this.sub} signin={this.signin} anonymous={this.anonymous}/>
                      </div>
                    </div> : <></>}
                  </div>
                </Route>
              </Switch>
          </div>
        </div>
      );
  }
}

export default withRouter(App);
