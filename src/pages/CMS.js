import { withAuth } from "./../context/auth-context";
import axios from "axios";
import "./CMS.css";

import React, { Component } from "react";

class CMS extends Component {
  state = {
    classType: "",
    instructor: "",
    duration: "",
    scheduled: "",
    message: "",
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      classType,
      instructor,
      duration,
      scheduled,
      message,
    } = this.state;

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/classes`,
        {
          classType,
          instructor,
          duration,
          scheduled,
          message,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          classType: "",
          instructor: "",
          duration: "",
          scheduled: "",
        });
      })
      .catch((error) => console.log(error));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            placeholder="class type"
            name="classType"
            value={this.state.classType}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            name="instructor"
            placeholder="instructor"
            value={this.state.instructor}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            name="duration"
            placeholder="duration"
            value={this.state.duration}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            name="scheduled"
            placeholder="date object"
            value={this.state.scheduled}
            onChange={this.handleChange}
          />
          <br />
          <br />
         
          <div>
            <br />
            <button onClick={this.handleFormSubmit}>SUBMIT</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withAuth(CMS);
