import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import { Link } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    // Call funciton coming from AuthProvider ( via withAuth ). Original in auth-context — AuthProvider
    this.props.login(username, password);
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div>
        <div className="auth">

          <form onSubmit={this.handleFormSubmit}>
            
              <input
                className="inputAuthForms"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={this.handleChange}
              />

              <input
                className="inputAuthForms"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={this.handleChange}
              />
              <div className="button-submit-container">
                <Link to="/signup" >
                  <p>Sign up</p>{" "}
                </Link>
                <input type="submit" value="Login" />
              </div>
            
          </form>
          
        </div>

        <div className="bg-image">
          <img src="/img/login.png" alt="bg" />
        </div>
      </div>
    );
  }
}

export default withAuth(Login);
