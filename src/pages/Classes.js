import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";

export class Classes extends Component {
  state = {
    classesArr: [],
  };
  
  render() {
    const { classesArr } = this.state;
    return (
      <div>
        {classesArr.map((
          oneClass //   <-- ADD
        ) => (
          <Link key={oneClass._id} to={`/classes/${oneClass._id}`}>
            <div className="oneClass">
              <h3>{oneClass.scheduled} | {oneClass.classType}</h3>
              <p>{oneClass.instructor.username} | {oneClass.duration} min </p>
            </div>
          </Link>
        ))}
      </div>
    );
  }
  componentDidMount() {
    this.getAllClasses();
  }
  getAllClasses = () => {
    axios.get("http://localhost:5000/api/classes").then((apiResponse) => {
      this.setState({ classesArr: apiResponse.data });
    });
  };
}

export default withAuth(Classes);
