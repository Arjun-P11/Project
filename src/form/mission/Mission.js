import React, { useState, useEffect } from "react";
import "./Mission.scss";

export default function Mission(props) {
  const data = props.data;
  const patch = data.links.mission_patch;
  const rocket_name = data.rocket.rocket_name;
  const payload_id = data.payloads[0].payload_id;
  const title = `${rocket_name} - ${payload_id}`;

  const launchSite = data.launch_site.site_name;

  const date = new Date(data.launch_date_local);
  const month = date.toLocaleString("default", { month: "long" });
  const dateStr = `${date.getDate()} ${month} ${date.getFullYear()}`;
  let [hour, minute, second] = date.toLocaleTimeString("en-US").split(/:| /);
  if (hour.length < 2) {
    hour = "0" + hour;
  }
  if (minute.length < 2) {
    minute = "0" + minute;
  }
  const timeStr = `${hour}:${minute}`;

  const missionInfo = `Launched on ${dateStr}  at  ${timeStr}  from  ${launchSite}`;

  const flightNumber = data.flight_number;

  return (
    <div>
      <div className="mission-container">
        <img id="image-mission" src={patch} alt="Mission Patch" />
        <div id="mission-content">
          <div className="firstline">{title}</div>
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

// function Data() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);

//   // Note: the empty deps array [] means
//   // this useEffect will run once
//   // similar to componentDidMount()
//   useEffect(() => {
//     fetch("http://localhost:8001/launches")
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//         }, // Note: it's important to handle errors here
//         // instead of a catch() block so that we don't swallow
//         // exceptions from actual bugs in components.
//         (error) => {
//           setIsLoaded(true);
//           setError(error);
//         }
//       );
//     console.log(items);
//   }, []);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name} {item.price}
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }
