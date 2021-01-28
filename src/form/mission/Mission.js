import React, { useState } from "react";
import "./Mission.scss";
import Button from "./Button.js";

// refactor to get this from fetch
function getLaunchName(launchId, launchPads) {
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

function getButtons(launch) {
  const buttons = [];
  const buttonMap = {
    reddit_campaign: "Reddit Campaign",
    reddit_launch: "Reddit Launch",
    reddit_recovery: "Reddit Recovery",
    reddit_media: "Reddit Media",
    presskit: "Presskit",
    article_link: "Article",
    video_link: "Watch Video",
  };
  for (let link in launch.links) {
    if (link !== "mission_patch" && launch.links[link]) {
      buttons.push({
        name: `${buttonMap[link]}`,
        link: `${launch.links[link]}`,
      });
    }
  }
  return buttons;
}

export default function Mission(props) {
  const data = props.data;
  const patch = data.links.mission_patch;
  const buttons = getButtons(data);

  const rocket_name = data.rocket.rocket_name;
  // Assume payload_id refers to first payload !!!
  const payload_id = data.payloads[0].payload_id;
  const title = `${rocket_name} - ${payload_id}`;

  const launchSiteName = getLaunchName(
    data.launch_site.site_id,
    props.launchpads
  );

  const onError = (e) => {
    e.target.style.visibility = "hidden ";
  };

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
        <img
          className="image-mission"
          src={patch}
          onError={onError}
          alt="Mission Patch"
        />
        <div className="mission-content">
          <p>
            <span className="firstline-content">{title}</span>
            {failedMission && <span> - </span>}
            {failedMission && <span className="failed">Failed Mission</span>}
          </p>
          <div className="secondline-content">{missionInfo}</div>
          <div className="mission-btn-container">
            {buttons.map((button, index) => (
              <Button key={index} button={button} />
            ))}
          </div>
        </div>
        <div className="number-container">
          <div className="firstline">{`#${flightNumber}`}</div>
          <div className="secondline">Flight Number</div>
        </div>
      </div>
    </div>
  );
}
