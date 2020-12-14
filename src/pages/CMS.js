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
    comments: [],
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const {
      classType,
      instructor,
      duration,
      scheduled,
      message,
      comments,
    } = this.state;
    console.log("classType :>> ", classType);
    console.log("instructor :>> ", instructor);
    console.log("duration :>> ", duration);
    console.log("scheduled :>> ", scheduled);
    console.log("message :>> ", message);
    console.log("comments :>> ", comments);

    axios
      .post(
        "http://localhost:5000/api/classes",
        {
          classType,
          instructor,
          duration,
          scheduled,
          message,
          comments,
        },
        { withCredentials: true }
      )
      .then(() => {
        this.setState({
          classType: "",
          instructor: "",
          duration: "",
          scheduled: "",
          message: "",
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
            value={this.state.duartion}
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
          <input
            name="message"
            placeholder="targeted message"
            value={this.state.message}
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
