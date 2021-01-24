import React, { useState } from "react";
import SearchBar from "./searchBar/SearchBar.js";
import Mission from "./missionItem/MissionItem.js";
import Results from "./numResults/Results.js";
import "./form.scss";
import { sampleData } from "./sampleData.js";

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

    if (!keyword || keyword === "all") {
      setData(sampleData);
    } else {
      setData(
        sampleData.filter(
          (data) =>
            filterRocket(data) || filterFlightNo(data) || filterPayloadId(data)
        )
      );
    }
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
