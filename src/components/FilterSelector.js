import React, { Component } from "react";
import "./FilterSelector.css";

class FilterSelector extends Component {
  state = {
    filter: "collapsed",
  };
  render() {
    return (
      <div>
        <div className="selector">
          <button onClick={() => this.setState({ filter: "expanded" })}>
            {this.props.text}
          </button>
        </div>

        {this.state.filter === "expanded"
          ? this.props.arr.map((oneCT) => <div key={oneCT}>{oneCT}</div>)
          : null}
      </div>
    );
  }
}

export default FilterSelector;
