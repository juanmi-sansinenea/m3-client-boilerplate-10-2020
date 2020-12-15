import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from './../context/auth-context';

class Navbar extends Component {
  render() {
    const { user, logout, isLoggedIn } = this.props;
    user && console.log('user.username, isLoggedIn :>> ', user.username, isLoggedIn);
    return (
      <nav className="navbar">
        <Link to={'/classes'}>
          <h4>Classes</h4>
        </Link>
        {isLoggedIn ? (
          <>
            {/*<p>username: {user && user.username}</p>*/}
            <h4 onClick={logout}>Logout</h4>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="navbar-button">Login</button>{' '}
            </Link>
            <br />
            <Link to="/signup">
              <button className="navbar-button">Sign Up</button>{' '}
            </Link>
          </>
        )}
      </nav>
    );
  }
}

export default withAuth(Navbar);
