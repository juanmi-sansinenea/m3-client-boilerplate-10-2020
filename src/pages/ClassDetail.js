import React, { Component } from "react";
import axios from "axios";
import messagesArr from "./../data/targetedMessages.json"

export class ClassDetail extends Component {
  state = {
    classType: "",
    instructorName: "",
    duration: "",
    scheduled: "",
    targetedMessage: "",
    comments: [],
  };
  render() {
    return (
      <div>
        <h1>Class Detail</h1>
        <p>{this.state.classType} </p>
        <p>{this.state.instructorName} </p>
        <p>{this.state.duration} </p>
        <p>{this.state.scheduled} </p>
        <p>{this.state.comments} </p>
        <p>{this.state.targetedMessage} </p>
      </div>
    );
  }
  componentDidMount() {
    this.getClassDetails();
    this.loadTargetedMessage();
  }
  getClassDetails = () => {
    const { class_id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/api/classes/${class_id}`)
      .then((apiResponse) => {
        const theClass = apiResponse.data;
        const {
          classType,
          duration,
          scheduled,
          comments,
        } = theClass;
        const instructorName = theClass.instructor.username;
    
        this.setState({
          classType,
          instructorName,
          duration,
          scheduled,
          comments,
        });
      })
      .catch((err) => console.log(err));
  };
  loadTargetedMessage=()=>{
    const rand = Math.floor(Math.random() * Math.floor(messagesArr.length));
    const messageToShow = messagesArr[rand];
    this.setState ({targetedMessage: messageToShow});
  }
}

export default ClassDetail;
