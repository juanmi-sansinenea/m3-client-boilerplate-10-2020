import React, { Component } from "react";
import "./FilterSelector.css";

class FilterSelector extends Component {
  state = {
    expanded: false,
    selected: "",
  };
  render() {
    return (
      <div>
        <div className="selector">
          <button
            onClick={() => this.setState({ expanded: !this.state.expanded })}
          >
            {this.props.text} {this.state.selected}
          </button>
        </div>

        {this.state.expanded === true
          ? this.props.arr.map((el) => (
              <div
                key={el}
                onClick={() => {
                  this.setState({ selected: el });
                  this.setState({ expanded: false });
                  this.props.filterResults();
                    
                }}
              >
                {el}
              </div>
            ))
          : null}
      </div>
    );
  }
}

export default FilterSelector;
