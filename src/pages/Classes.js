import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Classes.css";
import FilterSelector from "./../components/FilterSelector";

export class Classes extends Component {
  state = {
    classesArr: [],
    filterToolIsOn: false,
    classTypesArr: ["HIIT", "Strength", "Dance", "Yoga", "Pilates", "Spinning"],
  };

  render() {
    const { classesArr } = this.state;
    return (
      <div>
        {this.state.filterToolIsOn && (
          <div className="filter-tool">
            <h2>Filter results </h2>
            
            <FilterSelector arr={this.state.classTypesArr} text="Class type" />
            
            <div className="selector">
              <button onClick={() => this.setState({ filterToolIsOn: false })}>
                Instructor
              </button>
            </div>
            <div className="selector">
              <button onClick={() => this.setState({ filterToolIsOn: false })}>
                Class duration
              </button>
            </div>
          </div>
        )}

        <div className="button">
          <button onClick={() => this.setState({ filterToolIsOn: true })}>
            Filter
          </button>
        </div>

        {classesArr.map((oneClass) => (
          <Link key={oneClass._id} to={`/classes/${oneClass._id}`}>
            <div className="oneClass">
              <h3>
                {oneClass.scheduled} | {oneClass.classType}
              </h3>
              <p>
                {oneClass.instructor.username} | {oneClass.duration} min{" "}
              </p>
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
