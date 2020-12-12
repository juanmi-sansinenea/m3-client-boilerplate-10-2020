import React, { Component } from "react";
import "./FilterSelector.css";

class FilterSelector extends Component {
  state = {
    expanded: false,
  };
  render() {
    return (
      <div>
        <div className="selector">
          <button onClick={() => this.setState({ expanded: !this.state.expanded })}>
            {this.props.text}
          </button>
        </div>

        {this.state.expanded === true
          ? this.props.arr.map((oneCT) => <div key={oneCT}>{oneCT}</div>)
          : null}
      </div>
    );
  }
}

export default FilterSelector;
