import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

class Nav extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    let mystyle = {
      color: "black",
      textDecoration: "none",
      cursor: "pointer"
    };
    return <nav>
        <ul className="titleList">
            {this.props.user.login ? <Link to="/list" style={mystyle}>
              <div className={`navLoginCondition ${this.props.user.login ? "navLogedin" : ""}`} >我的活動</div>
            </Link> : <></>}
            <Link to="/member" style={mystyle}>
              <div className={`navLoginCondition ${this.props.user.login ? "navLogedin" : ""}`} >{this.props.user.login ? <>會員中心</> : <>註冊/登入</>}</div>
            </Link>
        </ul>
      </nav>;
  }
}

export default Nav;
