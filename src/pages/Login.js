import React, { Component } from "react";
import { withAuth } from './../context/auth-context';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth ). Original in auth-context — AuthProvider
    this.props.login(username, password);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.handleFormSubmit}>
          
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange}/>

          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />

          <input type="submit" value="Login" />
        </form>
        <Link to="/signup">
              <p className="navbar-button">Sign Up</p>{' '}
            </Link>
      </div>
    );
  }
}

export default withAuth(Login);
