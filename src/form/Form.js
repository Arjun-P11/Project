import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar/SearchBar.js";
import Mission from "./missionItem/MissionItem.js";
import Results from "./numResults/Results.js";
import GetData from "./GetData.js";
import "./form.scss";

// can later store name -> id in a map to be efficient
function getLaunchId(launchpads, launchName) {
  for (let launchPad of launchpads) {
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
  const [launchData, setLaunchData] = useState({
    status: "not set",
    data: [],
  });
  const [launchpadData, setLaunchpadData] = useState({
    status: "not set",
    data: [],
  });

  useEffect(() => {
    async function getData() {
      const launches = await GetData("launches");
      setLaunchData(launches);
      const launchpads = await GetData("launchpads");
      setLaunchpadData(launchpads);
    }
    getData();
  }, []);

  // search flightnumbers, rocket name, payload id
  const onSubmit = (search) => {
    setForm(search);
    const data = launchData.data;
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
      const launchId = getLaunchId(launchpadData.data, search.launch);
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

    setLaunchData({
      ...launchData,
      data: data.filter(
        (data) =>
          (keyword === "all" || !keyword
            ? true
            : filterRocket(data) ||
              filterFlightNo(data) ||
              filterPayloadId(data)) &&
          filterLaunchPad(data) &&
          filterMinYear(data) &&
          filterMaxYear(data)
      ),
    });
  };

  return (
    <div className="Form">
      {launchData &&
      launchpadData &&
      launchData.status === "success" &&
      launchpadData.status === "success" ? (
        <>
          <SearchBar
            setForm={setForm}
            onSubmit={onSubmit}
            data={launchData.data}
          />
          <Results numMissions={launchData.data.length} />
          {launchData.data.map((data, index) => (
            <Mission key={index} data={data} />
          ))}
        </>
      ) : (
        <div id="loading">Loading...</div>
      )}
    </div>
  );
}

export default Form;
