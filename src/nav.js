import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import login from './img/people.png';
import FacebookLogin from 'react-facebook-login';
import listIcon from "./img/listIcon.png";

class Nav extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    // let datas = this.props.data;
    // console.log(datas);
    let mystyle = {
      color: "black",
      textDecoration: "none",
      cursor: "pointer"
    };
    return <nav>
        <ul className="titleList">
            {this.props.user.login ? <Link to="/list" style={mystyle}>
              <img src={listIcon} className="listIcon" id="listIcon" />
              <div className="navLoginCondition">我的活動</div>
            </Link> : <></>}
            <Link to="/member" style={mystyle}>
              <img src={login} alt="login" className="login" id="login" />
              <div className="navLoginCondition">{this.props.user.login ? <>會員中心</> : <>註冊/登入</>}</div>
            </Link>
        </ul>
      </nav>;
  }
}

export default Nav;
