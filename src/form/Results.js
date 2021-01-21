import React from "react";
import "./Results.scss";

export default function Results(props) {
  const missions = props.missions || 0;
  return <div className="results"> Showing {missions} Missions</div>;
}
