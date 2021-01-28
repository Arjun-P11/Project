import React from "react";
import "./Button.scss";

export default function Button(props) {
  return (
    <button
      className="mission-btn"
      aria-label={props.button.name}
      onClick={() => window.open(props.button.link)}
    >
      {props.button.name}
    </button>
  );
}
