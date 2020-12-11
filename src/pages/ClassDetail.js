import React, { Component } from 'react';
import axios from "axios";

export class ClassDetail extends Component {
    state = {
        classType: " ",
        duration: " ",
        comments: [],
      };
    render() {
        return (
            <div>
               <h1>Class Detail</h1>
            </div>
        )
    }
    componentDidMount() {
        console.log("got this far")
        //this.getClassDetails();
    }
    getClassDetails = () => {
        const { id } = this.props.match.params;
        axios
          .get(`http://localhost:5000/api/projects/${id}`)
          .then((apiResponse) => {
            const theClass = apiResponse.data;
            const { classType, duration, comments } = theClass;
            this.setState({ classType, duration, comments });
          })
          .catch((err) => console.log(err));
      };
}

export default ClassDetail
