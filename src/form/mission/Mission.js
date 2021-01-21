import React, { useState, useEffect } from "react";
import "./Mission.scss";
import { sampleData } from "../sampleData.js";

export default function Mission() {
  console.log(sampleData[0]);
  const patch = sampleData[5].links.mission_patch;
  const rocket_name = sampleData[0].rocket.rocket_name;
  const payload_id = sampleData[0].payloads[0].payload_id;
  const title = `${rocket_name} - ${payload_id}`;

  const lauchSite = sampleData[0].launch_site.site_name;

  const date = new Date(sampleData[0].launch_date_local);
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

  console.log(dateStr);
  console.log(timeStr);
  console.log(patch);

  const flightNumber = sampleData[0].flight_number;

  return (
    <div>
      <div className="container">
        <img className="image-mission" src={patch} alt="Header - Space" />
        <div>Mission Element</div>
        <div>Mission Element</div>
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
