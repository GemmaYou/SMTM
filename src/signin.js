import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class Signin extends React.Component {
  constructor (props) {
    super(props);
  }

  signin(){
    let user = {
      email: signinEmail.value,
      pwd: signinPwd.value,
    };

    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
      .then(() => {
        alert("您已登入囉！");
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

  render() {
    return <div className="signinAccount" id="signinAccount">
        <div>
          <h2>登入帳戶</h2>
        </div>
        <div>信箱：<input id="signinEmail" /></div>
        <div>密碼：<input id="signinPwd" type="password" /></div>
        <div className="signin-btn"><button id="signin" onClick={()=> this.signin()}>登入</button></div>
      </div>;
  }
}

export default Signin;
