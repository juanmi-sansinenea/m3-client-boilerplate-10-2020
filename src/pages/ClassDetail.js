import React, { Component } from 'react';
import axios from "axios";

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
            </div>
        )
    }
    componentDidMount() {
        this.getClassDetails();
    }
    getClassDetails = () => {
        const { class_id } = this.props.match.params;
        axios
          .get(`http://localhost:5000/api/classes/${class_id}`)
          .then((apiResponse) => {
            const theClass = apiResponse.data;
            const { classType, duration, scheduled, targetedMessage, comments } = theClass;
            const instructorName = theClass.instructor.username;
            console.log('targetedMessage :>> ', targetedMessage);
            this.setState({ classType, instructorName, duration, scheduled, targetedMessage, comments });
          })
          .catch((err) => console.log(err));
      };
}

export default ClassDetail
