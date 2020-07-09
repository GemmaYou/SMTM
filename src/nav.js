import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import login from './img/people.png';
import FacebookLogin from 'react-facebook-login';

class Nav extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    // let datas = this.props.data;
    // console.log(datas);
    let mystyle = {
      color: "black",
      textDecoration: "none"
    };
    return <nav>
        <ul className="titleList">
            <Link to="/list" style={mystyle}><div className="list-item">List</div></Link>
            <Link to="/activity" style={mystyle}><div className="list-item">Activity</div></Link>
            <Link to="/member" ><img src={login} alt="login" className="login" id="login" /></Link>
        </ul>
      </nav>;
  }
}

export default Nav;
