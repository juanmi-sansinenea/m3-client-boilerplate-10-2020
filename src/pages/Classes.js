import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Classes.css";
import FilterSelector from "./../components/FilterSelector";

const onlyUnique = require("./../utils/utils.js").onlyUnique;

export class Classes extends Component {
  state = {
    classesArr: [],
    filterToolIsOn: false,
    classTypesArr: ["HIIT", "Strength", "Dance", "Yoga", "Pilates", "Spinning"],
    instructorsArr: [],
    durationsArr: [],
  };

  render() {
    const { classesArr } = this.state;
    return (
      <div>
        {this.state.filterToolIsOn && (
          <div className="filter-tool">
            <h2>Filter results </h2>

            <FilterSelector
              arr={this.state.classTypesArr}
              filterResults={this.filterByClass}
              text="Class type"
            />

            <FilterSelector
              arr={this.state.instructorsArr}
              filterResults={this.filterByInstructor}
              text="Instructor"
            />

            <FilterSelector
              arr={this.state.durationsArr}
              filterResults={this.filterByDuration}
              text="Duration"
            />

            {
              // See results button
              <div className="button">
                <button
                  onClick={() => this.setState({ filterToolIsOn: false })}
                >
                  See results
                </button>
              </div>
            }
          </div>
        )}

        {
          // Filter button
          <div className="button">
            <button onClick={() => this.setState({ filterToolIsOn: true })}>
              Filter
            </button>
          </div>
        }

        {classesArr.map((oneClass) => (
          // Mapping of all classes list
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
      // set classes array
      this.setState({ classesArr: apiResponse.data });
      // set instructors array
      const instructorsAll = this.state.classesArr.map((oneClass) => {
        return oneClass.instructor.username;
      });
      const instructorsUnique = instructorsAll.filter(onlyUnique);
      this.setState({
        instructorsArr: instructorsUnique,
      });
      // set durations array
      const durationsAll = this.state.classesArr.map((oneClass) => {
        return oneClass.duration;
      });
      const durationsUnique = durationsAll.filter(onlyUnique);
      this.setState({
        durationsArr: durationsUnique,
      });
    });
  };

  filterByClass = (props) => {
    console.log(props)
    const myClassesArr = this.state.classesArr;
    const filteredArr = myClassesArr.filter(
      (oneClass) => oneClass.classType === props
    );
    this.setState({ classesArr: filteredArr });
  };
}

export default withAuth(Classes);
