import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../context/auth-context";

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;
    user &&
      console.log("user.username, isLoggedIn :>> ", user.username, isLoggedIn);
    return (
      user &&
      <nav className="navbar">
        <Link to={"/classes"}>
          <h4>Classes</h4>
        </Link>

        <h4 onClick={logout}>Logout</h4>
      </nav>
    );
  }
}

export default withAuth(Navbar);
