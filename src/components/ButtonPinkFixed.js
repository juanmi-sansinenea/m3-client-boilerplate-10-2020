import React from 'react'
import './ButtonPinkFixed.css'

export const ButtonPinkFixed = (props) => {
    return (
        <div className="button-pink-fixed">
        <button
          onClick={() => {
            props.handleClick();
          }}
        >
          {props.text}
        </button>
      </div>
    )
}

export default ButtonPinkFixed;
