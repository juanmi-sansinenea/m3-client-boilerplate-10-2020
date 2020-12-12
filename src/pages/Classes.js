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
    classTypesArr: ["HIIT", "Strength", "Dance", "Yoga", "Pilates", "Spinning"],
    instructorsArr: [],
    durationsArr: [],
    filterCriteria: {
      classType: "",
      instructor: "",
      duration: "",
    },
    totalActiveFilters: 0
  };

  render() {
    const { classesArr } = this.state;
    return (
      <div>
        {this.state.filterToolIsOn && (
          <div className="filter-tool">
            <h2>Filter results</h2>

            <FilterSelector
              arr={this.state.classTypesArr}
              filterResults={this.filterByClass}
              text="Class type"
              filterValue={this.state.filterCriteria.classType}
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
                  onClick={(() => {
                    this.setState({ filterToolIsOn: false })
                    this.calculateTotalActiveFilters()
                  })}
                >
                  See {classesArr.length} results
                </button>
              </div>
            }
          </div>
        )}

        {
          // Filter button
          <div className="button">
            <button onClick={() => this.setState({ filterToolIsOn: true })}>
              Filter ({this.state.totalActiveFilters})
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
      // set classes array, and the original copy 'floor' to be saved safe
      this.setState({ classesArr: apiResponse.data });
      this.setState({ classesArrFloor: apiResponse.data })
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
    // props here gets a filtering value, such as HIIT or Ziggy22
    console.log(props)
    // we create the filtered array
    const myClassesArr = this.state.classesArrFloor; // <-- We filter over the untouched array 'Floor' !!
    const filteredArr = myClassesArr.filter(
      (oneClass) => oneClass.classType === props
    );
    // and update the array to be filtered by props
    this.setState({ classesArr: filteredArr });
    // and update the centralised state of selected filters
    const myFilterCriteria = {...this.state.filterCriteria}
    console.log('myFilterCriteria before:>> ', myFilterCriteria);
    
    myFilterCriteria.classType = props;
    console.log('myFilterCriteria.classType assigned to props:>> ', myFilterCriteria);
    
    this.setState({ filterCriteria: myFilterCriteria });
    //console.log('this.state.filterCriteria :>> ', this.state.filterCriteria);

    this.calculateTotalActiveFilters()
  };

  calculateTotalActiveFilters = () => {
    let f1;
    let f2;
    let f3;
    if (this.state.filterCriteria.classType || "") {
      f1 = 1;
    } else {
      f1 = 0;
    }
    if (this.state.filterCriteria.instructor || "") {
      f2 = 1
    } else {
      f2 = 0
    }
    if (this.state.filterCriteria.duration || "") {
      f3 = 1
    } else {
      f3 = 0
    }
    console.log('f1 :>> ', f1, this.state.filterCriteria.classType);
    console.log('f2 :>> ', f2, this.state.filterCriteria.instructor);
    console.log('f3 :>> ', f3, this.state.filterCriteria.duration);
    let total = f1 + f2 + f3;
    this.setState({totalActiveFilters: total})
    
    

  }

}

export default withAuth(Classes);
