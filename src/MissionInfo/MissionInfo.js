import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import YouTube from "./Youtube.js";
import {
  getLaunchName,
  getTimeString,
  getDateString,
} from "../form/mission/helperFunctions.js";
import "./MissionInfo.scss";

export default function MissionInfo(props) {
  // ensure page loads at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const data = props.location.data;
  var launchpadName = null;
  var missionDate = null;
  let history = useHistory();

  if (!props.location.data) {
    // if data not passed as props redirect to homepage
    history.push("/");
  } else {
    launchpadName = getLaunchName(
      data.launch_site.site_id,
      props.location.launchpads
    );
    const date = new Date(data.launch_date_local);
    const dateStr = getDateString(date);
    const timeStr = getTimeString(date);
    missionDate = `${dateStr}  at  ${timeStr}`;
  }

  const payloads = (data) => {
    return data.payloads.map((payload, index) => (
      <div>
        {data.payloads.length > 1 && `Payload ${index + 1}`}
        <div className="payload">
          <p>
            <span className="heading">Payload Id: </span>
            <span className="text">{payload.payload_id}</span>
          </p>
          <p>
            <span className="heading">Payload Type: </span>
            <span className="text">{payload.payload_type}</span>
          </p>
          <p>
            <span className="heading">Payload Mass: </span>
            <span className="text">{`${payload.payload_mass_kg}kg`} </span>
          </p>
          <p>
            <span className="heading">Payload Orbit: </span>
            <span className="text">{payload.orbit}</span>
          </p>
        </div>
      </div>
    ));
  };

  return (
    <div className="missionInfo">
      {data && (
        <>
          <div className="title">
            <h1>{`${data.rocket.rocket_name} - ${data.rocket.rocket_type}`}</h1>
          </div>
          <div className="content">
            <h3 className="subHeading">Mission Information</h3>
            <p>
              <span className="heading">Launch Site: </span>
              <span className="text">{launchpadName}</span>
            </p>
            <p>
              <span className="heading">Launch Date: </span>
              <span className="text">{missionDate}</span>
            </p>
            {data.details && (
              <p>
                <span className="heading">Mission Details: </span>
                <span className="text">{data.details}</span>
              </p>
            )}
            <h3 className="subHeading">Payloads</h3>
            {payloads(data)}

            <h3 className="subHeading">Mission Video</h3>
            <YouTube
              video={data.links.video_link.split("v=")[1]}
              autoplay="1"
              rel="0"
              modest="1"
            />
          </div>
        </>
      )}
    </div>
  );
}
