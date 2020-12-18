import React from "react";
import "./ButtonPinkFixed.scss";

export const ButtonPinkFixed = (props) => {
  return (
    <div className="fixed-button-container">
      <button
        className="see-results"
        onClick={() => {
          props.handleClick();
        }}
      >
        {props.text}
      </button>
    </div>
  );
};

export default ButtonPinkFixed;
