import React from "react";
import "./Button.scss";

export default function Button(props) {
  return (
    <button
      className="mission-btn"
      aria-label={props.button.name}
      onClick={() =>
        props.button.link != null ? window.open(props.button.link) : null
      }
    >
      {props.button.name}
    </button>
  );
}
