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
          <Link to={`/classes/${oneClass._id}`}>
            <div key={oneClass._id} className="oneClass">
              <h3>{oneClass.classType}</h3>
              <p>{oneClass.duration} </p>
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
