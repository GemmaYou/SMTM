import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import add from "./img/add.png";
import invite from "./img/invite.png";
import nonCheck from "./img/nonCheck.png";
import search from "./img/search.png";
import location from "./img/location.png";
import date from "./img/date.png";
import atm from "./img/ATM.png";
import value from "./img/value.png";
import user from "./img/user.png";
import halfdone from "./img/halfdone.png";
import doneCheck from "./img/donecheck.png";
import Mobile from "./actMobile";
import Desk from "./actDesk";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

//React Hook
// const Activity = () => {
//     let { id } = useParams();
//     return (
//         <div>
//             Activity component
//             <p>Topic: {id}</p>
//         </div>
//     );
// };

class Activity extends React.Component {
  constructor (props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.addMember = this.addMember.bind(this)
    // console.log(location.query);
    this.state = {
      modal: false,
      window: false,
      data: {
        date: "",
        done: "",
        holder: {
          name: "", email: ""
        },
        kind: "",
        member: [],
        name: "",
        place: "",
        value: "",
      }
    }
    console.log(props);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
    const id = this.props.match.params.id;
    console.log(id);
    this.getData(id);
  }

  getData(id){
    console.log("getdata");
    firebase.firestore().collection("activity").doc(id)
    .get()
    .then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            this.setState({
              data: doc.data()
            })
        } else {
            // doc.data() will be undefined in this case
            alert("此活動不存在唷，可能已被刪除，請再次連結是否正確！");
            console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
  }

  resize() {
    if (window.innerWidth <= 1000){
      this.setState({window: false});
    }else if (window.innerWidth > 1000) {
      this.setState({window: true})
    }
  }

  addMember(){
    console.log("clickAdd");
    this.setState({
      model: true
    })
  }

  render() {
    let data = this.state.data;
    let mystyle = {
      color: "#303030",
      textDecoration: "none"
    };
    return <>
      <div className="activityBox">
        <div className="condition">
          <img src={data.done ? doneCheck: nonCheck } className="activity-icon" />
          {data.done ? <>已完成</> : <>未完成</> }
        </div>
        <div className="search">
          <input placeholder="找什麼呢" />
          <img src={search} className="searchImg" />
        </div>
        <div className="userName">
          {data.name}
        </div>
        <div className="add" onClick={this.addMember}>
          新增用戶
          <img src={user} className="userImg" />
        </div>
        <div className="invite">
          使用連結
          <img src={invite} className="inviteImg" />
        </div>
        {this.state.window ? <Desk data={this.state.data}/> : <Mobile data={this.state.data}/>}

        <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            I will not close if you click outside me. Don't even try to press
            escape key.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Understood</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>;
  }
}

export default withRouter(Activity);
