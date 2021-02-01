import React, { useEffect, useState } from "react";
import SearchBar from "./searchBar/SearchBar.js";
import Mission from "./mission/Mission.js";
import Results from "./numResults/Results.js";
import GetData from "./GetData.js";
import "./form.scss";
import { launches } from "./Launches.js";
import { launchPads } from "./LaunchPads.js";

// can later store name -> id in a map to be efficient
function getLaunchId(launchpads, launchName) {
  for (let launchPad of launchpads) {
    if (launchPad.full_name === launchName) {
      return launchPad.id;
    }
  }
  return "Launch Site not Identified";
}

const filterData = (search, data, launchpadData) => {
  const keyword = search.keyword.toLowerCase();
  console.log(launchpadData);

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
    const launchId = getLaunchId(launchpadData, search.launch);
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

  return data.filter(
    (data) =>
      (keyword === "all" || !keyword
        ? true
        : filterRocket(data) ||
          filterFlightNo(data) ||
          filterPayloadId(data)) &&
      filterLaunchPad(data) &&
      filterMinYear(data) &&
      filterMaxYear(data)
  );
};

function Form() {
  // apiData keeps a copy of the original data from the api call
  // const [apiData, setApiData] = useState({
  //   status: "success",
  //   data: launches,
  // });
  // // launchData contains the data for the list of missions to display on search
  // const [launchData, setLaunchData] = useState({
  //   status: "success",
  //   data: launches,
  // });
  // const [launchpadData, setLaunchpadData] = useState({
  //   status: "success",
  //   data: launchPads,
  // });

  // apiData keeps a copy of the original data from the api call
  const [apiData, setApiData] = useState({ status: "not set", data: [] });
  // launchData contains the data for the list of missions to display on search
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
      // get launch data
      const launches = await GetData("launches");
      setLaunchData(launches);
      setApiData(launches);
      // get launchpad data
      const launchpads = await GetData("launchpads");
      setLaunchpadData(launchpads);
    }
    getData();
  }, []);

  // search flightnumbers, rocket name, payload id
  const onSubmit = (search) => {
    console.log(search);

    setLaunchData({
      ...launchData,
      data: filterData(search, apiData.data, launchpadData.data),
    });
    const data = apiData.data;
  };

  return (
    <div>
      <div className="Form">
        {launchData &&
        launchpadData &&
        launchData.status === "success" &&
        launchpadData.status === "success" ? (
          <>
            <SearchBar
              onSubmit={onSubmit}
              apiData={apiData.data}
              launchpads={launchpadData.data}
            />
            <Results numMissions={launchData.data.length} />
            {launchData.data.map((data, index) => (
              <Mission
                key={index}
                data={data}
                launchpads={launchpadData.data}
              />
            ))}
          </>
        ) : (
          <div id="loading">Loading...</div>
        )}
      </div>
    </div>
  );
}

export default Form;
