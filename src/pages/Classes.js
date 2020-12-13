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
    classesArrFloor: [],
    filterToolIsOn: false,
    classTypesArr: [],
    instructorsArr: [],
    durationsArr: [],
    filter: {
      classType: "",
      instructor: "",
      duration: "",
    },
    activeFilterCount: 0,
  };

  render() {
    return (
      <div>
        {this.state.filterToolIsOn && (
          <div className="filter-tool">
            <h2>Filter results</h2>

            <FilterSelector
              arr={this.state.classTypesArr}
              filterResults={this.updateFilter1}
              text="Class type"
              filterValue={this.state.filter.classType}
            />

            <FilterSelector
              arr={this.state.instructorsArr}
              filterResults={this.updateFilter2}
              text="Instructor"
              filterValue={this.state.filter.classType}
            />

            <FilterSelector
              arr={this.state.durationsArr}
              filterResults={this.updateFilter3}
              text="Duration"
              filterValue={this.state.filter.classType}
            />

            {
              // See results button
              <div className="button">
                <button
                  onClick={() => {
                    this.setState({ filterToolIsOn: false });
                    this.updateBubble();
                  }}
                >
                  See {this.state.classesArr.length} results
                </button>
              </div>
            }
          </div>
        )}

        {
          // Filter button
          <div className="button">
            <button onClick={() => this.setState({ filterToolIsOn: true })}>
              Filter ({this.state.activeFilterCount})
            </button>
          </div>
        }

        {this.state.classesArr.map((oneClass) => (
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
    axios
      .get("http://localhost:5000/api/classes")
      .then((apiResponse) => {
        // set classes array, and the original copy 'floor' to be saved safe
        // this.setState({ classesArrFloor: apiResponse.data });
        this.setState({ classesArr: apiResponse.data });
        this.setState({ classesArrFloor: apiResponse.data });
        this.fillStateArrays();
      })
      .catch((err) => console.log(err));
  }

  fillStateArrays = () => {
    // set classTypesArr
    const classesTypesAll = this.state.classesArr.map((oneClass) => {
      return oneClass.classType;
    });
    const classTypesUnique = classesTypesAll.filter(onlyUnique);
    //we assign the uniques array to the classTypesArr. Must spread inside and flatten (otherwise it's a different memory address...)
    this.setState((prevState) => ({
      classTypesArr: [
        ...(prevState.classTypesArr || []),
        classTypesUnique,
      ].flat(),
    }));
    // set instructors array with instructor usernames
    const instructorsAll = this.state.classesArr.map((oneClass) => {
      return oneClass.instructor.username;
    });
    const instructorsUnique = instructorsAll.filter(onlyUnique);
    this.setState((prevState) => ({
      instructorsArr: [
        ...(prevState.instructorsArr || []),
        instructorsUnique,
      ].flat(),
    }));
    // set durations array
    const durationsAll = this.state.classesArr.map((oneClass) => {
      return oneClass.duration;
    });
    const durationsUnique = durationsAll.filter(onlyUnique);
    this.setState((prevState) => ({
      durationsArr: [...(prevState.durationsArr || []), durationsUnique].flat(),
    }));
  };

  updateFilter1 = (props) => {
    const myfilter = { ...this.state.filter };
    myfilter.classType = props;
    this.setState({ filter: myfilter }, this.filterResults);
  };
  updateFilter2 = (props) => {
    const myfilter = { ...this.state.filter };
    myfilter.instructor = props;
    this.setState({ filter: myfilter }, this.filterResults);
  };

  filterResults = () => {
    console.log('this.state.filter :>> ', this.state.filter);

    let arrayToFilter = this.state.classesArrFloor;

    if (this.state.filter.classType || this.state.filter.classType !== "") {
      arrayToFilter = arrayToFilter.filter(
        (oneClass) => oneClass.classType === this.state.filter.classType
      );
    }
    console.log('after 1st filt ', arrayToFilter);
    
    if (this.state.filter.instructor || this.state.filter.instructor !== "") {
      arrayToFilter = arrayToFilter.filter(
        (oneClass) =>
          oneClass.instructor.username === this.state.filter.instructor
      );
    }

    console.log('after 2nd filt :>> ', arrayToFilter);

    this.setState({ classesArr: arrayToFilter });
  };





  updateBubble = () => {
    let f1;
    let f2;
    let f3;
    this.state.filter.classType || ""
      ? (f1 = 1)
      : (f1 = 0)(this.state.filter.instructor || "")
      ? (f2 = 1)
      : (f2 = 0)(this.state.filter.duration || "")
      ? (f3 = 1)
      : (f3 = 0);
    let total = f1 + f2 + f3;
    this.setState({ activeFilterCount: total });
  };
}

export default withAuth(Classes);
