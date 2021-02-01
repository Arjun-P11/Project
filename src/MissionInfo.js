import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./MissionInfo.scss";

export default function MissionInfo(props) {
  //console.log(props);
  console.log(props.location.state);
  return <div className="missionInfo" />;
}
