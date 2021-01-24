import React from "react";
import "./MissionItem.scss";
import { launchPads } from "../LaunchPads.js";

function getLaunchName(launchId) {
  for (let launchPad of launchPads) {
    if (launchPad.id === launchId) {
      return launchPad.full_name;
    }
  }
  return "Launch Site not Identified";
}
function getTimeString(date) {
  let [hour, minute] = date.toLocaleTimeString("en-US").split(/:| /);
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  return `${hour}:${minute}`;
}
function getDateString(date) {
  const month = date.toLocaleString("default", { month: "long" });
  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

export default function Mission(props) {
  const data = props.data;
  const patch = data.links.mission_patch;

  const rocket_name = data.rocket.rocket_name;
  // Assume payload_id refers to first payload !!!
  const payload_id = data.payloads[0].payload_id;
  const title = `${rocket_name} - ${payload_id}`;

  const launchSiteName = getLaunchName(data.launch_site.site_id);

  const date = new Date(data.launch_date_local);
  const dateStr = getDateString(date);
  const timeStr = getTimeString(date);

  const missionInfo = `Launched on ${dateStr}  at  ${timeStr}  from  ${launchSiteName}`;
  const flightNumber = data.flight_number;

  // Assuming to launch or land success value means that mission was successful
  const launchSuccess = "launch_success" in data ? data.launch_success : true;
  const landSuccess = "land_success" in data ? data.land_success : true;
  const failedMission = launchSuccess === false || landSuccess === false;

  return (
    <div>
      <div className="mission-container">
        <img id="image-mission" src={patch} alt="Mission Patch" />
        <div id="mission-content">
          <p>
            <span className="firstline">{title}</span>
            {failedMission && <span> - </span>}
            {failedMission && <span className="failed"> Failed Mission </span>}
          </p>
          <div className="secondline">{missionInfo}</div>
        </div>
        <div id="number-container">
          <div className="firstline">{`#${flightNumber}`}</div>
          <div className="secondline">Flight Number</div>
        </div>
      </div>
    </div>
  );
}
