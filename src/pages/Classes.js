import React, { Component } from "react";
import { withAuth } from "./../context/auth-context";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Classes.scss";
import FilterSelector from "./../components/FilterSelector";
import ButtonPinkFixed from "./../components/ButtonPinkFixed";
//import {addZeroBefore, humanizeDay, humanizeDayMini, humanizeMonth} from "./../utils/utils";

const onlyUnique = require("../utils/onlyUnique.js").onlyUnique;
//const {addZeroBefore, humanizeDay, humanizeDayMini, humanizeMonth} = require("./../utils/utils");

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
        {/* -----------------Filter tool overlay --------------------------------- */}
        {this.state.filterToolIsOn && (
          <div className="filter-tool">
            <h2>Filter results</h2>

            <div
              className="close-x"
              onClick={() => {
                // reset state
                const myFilter = { ...this.state.filter };
                myFilter.classType = "";
                myFilter.instructor = "";
                myFilter.duration = "";
                this.setState({
                  classesArr: this.state.classesArrFloor,
                  filter: myFilter,
                  activeFilterCount: 0,
                });
                this.closeFilterTool();
              }}
            >
              <img src="/img/clsx.svg" alt="close-panel" />
            </div>
            <div className="selectors-container">
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
            </div>

            <ButtonPinkFixed //Button [ See n results ]
              text={`See ${this.state.classesArr.length} results`}
              handleClick={this.closeFilterTool}
            />
          </div>
        )}

        {
          // FILTER BUTTON //////////
          <div className="fixed-button-container">
            <button className="filter-button" onClick={() => this.setState({ filterToolIsOn: true })}>
              Filter ({this.state.activeFilterCount})
            </button>
          </div>
        }

        {/* ----Body of the Classes page, the list------------------------------------------------------ */}
        <div className="header">
          <h1 className="title">Classes</h1>
        </div>
        <div className="scroll-container">
          {this.state.classesArr.map((oneClass, i) => (
            <Link key={oneClass._id} to={`/classes/${oneClass._id}`}>
              <div className="one-class">
                <div className="profile-pic">
                  <img src={oneClass.instructor.profilepic} alt="profile"></img>
                </div>
                <div className="content">
                  <h3>
                    {this.addZeroBefore(
                      new Date(oneClass.scheduled).getHours()
                    )}
                    :
                    {this.addZeroBefore(
                      new Date(oneClass.scheduled).getMinutes()
                    )}{" "}
                    | {oneClass.classType}
                  </h3>

                  <p className="small-info">
                    {oneClass.instructor.username} | {oneClass.duration} min{" "}
                  </p>
                </div>
                <div className="flechita">
                  <div>
                    <img src="/img/flechita.svg" alt="arrow"></img>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/classes`)
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
        `none`,
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
        `none`,
      ].flat(),
    }));
    // set durations array
    const durationsAll = this.state.classesArr.map((oneClass) => {
      return oneClass.duration;
    });
    const durationsUnique = durationsAll.filter(onlyUnique);
    this.setState((prevState) => ({
      durationsArr: [
        ...(prevState.durationsArr || []),
        durationsUnique,
        `none`,
      ].flat(),
    }));
  };

  updateFilter1 = (props) => {
    const myFilter = { ...this.state.filter };
    myFilter.classType = props;
    this.setState({ filter: myFilter }, this.filterResults);
  };
  updateFilter2 = (props) => {
    const myFilter = { ...this.state.filter };
    myFilter.instructor = props;
    this.setState({ filter: myFilter }, this.filterResults);
  };
  updateFilter3 = (props) => {
    const myFilter = { ...this.state.filter };
    myFilter.duration = props;
    this.setState({ filter: myFilter }, this.filterResults);
  };

  filterResults = () => {


    let arrayToFilter = [...this.state.classesArrFloor];
    let activeFilterCount = 0;


    if (
      this.state.filter.classType !== "" &&
      this.state.filter.classType !== "none"
    ) {
      activeFilterCount++;
      arrayToFilter = arrayToFilter.filter(
        (oneClass) => oneClass.classType === this.state.filter.classType
      );
    }

    if (
      this.state.filter.instructor !== "" &&
      this.state.filter.instructor !== "none"
    ) {
      activeFilterCount++;
      arrayToFilter = arrayToFilter.filter(
        (oneClass) =>
          oneClass.instructor.username === this.state.filter.instructor
      );
    }

    if (
      this.state.filter.duration !== "" &&
      this.state.filter.duration !== "none"
    ) {
      activeFilterCount++;
      arrayToFilter = arrayToFilter.filter(
        (oneClass) => oneClass.duration === this.state.filter.duration
      );
    }

    this.setState({ classesArr: arrayToFilter, activeFilterCount });
  };

  closeFilterTool = () => {
    this.setState({
      filterToolIsOn: false,
    });
  };

  addZeroBefore = (n) => {
    return (n < 10 ? "0" : "") + n;
  };

  humanizeDay = (day) => {
    switch (day) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "XXX";
    }
  };
  humanizeDayMini = (day) => {
    switch (day) {
      case 0:
        return "Sun";
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      default:
        return "XXX";
    }
  };
  humanizeMonth = (month) => {
    switch (month) {
      case 0:
        return "Jan.";
      case 1:
        return "Feb.";
      case 2:
        return "Mar.";
      case 3:
        return "Apr.";
      case 4:
        return "May.";
      case 5:
        return "Jun.";
      case 6:
        return "Jul.";
      case 7:
        return "Ago.";
      case 8:
        return "Sep.";
      case 9:
        return "Oct.";
      case 10:
        return "Nov.";
      case 11:
        return "Dec.";
      default:
        return "XXX";
    }
  };
}

export default withAuth(Classes);
