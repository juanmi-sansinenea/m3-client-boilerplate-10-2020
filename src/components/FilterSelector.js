import React, { Component } from "react";
import "./FilterSelector.css";

class FilterSelector extends Component {
  state = {
    expanded: false,
    selectedValue: "",
  };
  render() {
    return (
      <div>
        <div className="selector">
          <button
            onClick={() => this.setState({ expanded: !this.state.expanded })}
          >
            {this.props.text} {this.state.selectedValue}
          </button>
        </div>

        {this.state.expanded === true
          ? this.props.arr.map((el) => (
              <div
                className="filterItem"
                key={el}
                onClick={() => {
                  this.setState({ expanded: false });
                  this.setState({ selectedValue: el });
                  this.props.filterResults(el); /// 
                  // The above function comes passed as props
                  // and sends back 'el' as props of its own: the a value to filter with, i.e., Mafe, or HIIT
                  // which will be ran by the three filters
                }}
              >
                {el}
              </div>
            ))
          : null}
      </div>
    );
  }
  componentDidMount() {
    // selectedValue can be Mafe, or HIIT, or Yoga...
    this.setState({ selectedValue: this.props.filterValue });
  }
}

export default FilterSelector;
