import React, { useState, forwardRef } from "react";
import SearchBar from "./searchBar/SearchBar.js";
import Mission from "./missionItem/MissionItem.js";
import Results from "./numResults/Results.js";
import "./form.scss";
import { sampleData } from "./sampleData.js";
import { launchPads } from "./LaunchPads.js";

// can later store name -> id in a map to be efficient
function getLaunchId(launchName) {
  for (let launchPad of launchPads) {
    if (launchPad.full_name === launchName) {
      return launchPad.id;
    }
  }
  return "Launch Site not Identified";
}

function Form() {
  const [form, setForm] = useState({
    keyword: "all",
    launch: "Any",
    min: "Any",
    max: "Any",
  });
  const [data, setData] = useState(sampleData);

  // search flightnumbers, rocket name, payload id
  const onSubmit = (search) => {
    console.log(search);
    setForm(search);
    const keyword = form.keyword.toLowerCase();

    const filterRocket = (data) => {
      return data.rocket.rocket_name.toLowerCase().includes(keyword);
    };
    const filterFlightNo = (data) => {
      // used double equals because keyword is a string and flight_number is an integer
      return data.flight_number == keyword;
    };
    const filterPayloadId = (data) => {
      for (let payload of data.payloads) {
        if (payload.payload_id.toLowerCase().includes(keyword)) {
          return true;
        }
      }
      return false;
    };
    const filterLaunchPad = (data) => {
      if (search.launch === "Any") {
        return true;
      }
      const launchId = getLaunchId(search.launch);
      console.log(launchId);
      return data.launch_site.site_id === launchId;
    };

    const filterMinYear = (data) => {
      if (search.min === "Any") {
        return true;
      }
      const date = new Date(data.launch_date_local);
      const year = `${date.getFullYear()}`;
      return year >= search.min;
    };

    const filterMaxYear = (data) => {
      if (search.max === "Any") {
        return true;
      }
      const date = new Date(data.launch_date_local);
      const year = `${date.getFullYear()}`;
      return year <= search.max;
    };

    setData(
      sampleData.filter(
        (data) =>
          (keyword === "all" || !keyword
            ? true
            : filterRocket(data) ||
              filterFlightNo(data) ||
              filterPayloadId(data)) &&
          filterLaunchPad(data) &&
          filterMinYear(data) &&
          filterMaxYear(data)
      )
    );
  };

  return (
    <div className="Form">
      <SearchBar setForm={setForm} onSubmit={onSubmit} />
      <Results numMissions={data.length} />
      {data.map((data, index) => (
        <Mission key={index} data={data} />
      ))}
    </div>
  );
}

export default Form;

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
