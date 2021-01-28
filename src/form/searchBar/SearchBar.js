import React, { useState } from "react";
import "./SearchBar.scss";

const getLaunchPadFullNames = (launchPads) => {
  let launchPadNames = [];
  for (let launchPad of launchPads) {
    launchPadNames.push(launchPad.full_name);
  }
  return launchPadNames;
};

const getLaunchYears = (data) => {
  let years = [];
  for (let launch of data) {
    const date = new Date(launch.launch_date_local);
    const year = date.getFullYear();
    if (years.indexOf(year) === -1) {
      years.push(year);
    }
  }
  return years.sort();
};

function SearchBar(props) {
  const [search, setSearch] = useState({
    keyword: "all",
    launch: "Any",
    min: "Any",
    max: "Any",
  });
  const apiData = props.apiData;
  const launchPadNames = getLaunchPadFullNames(props.launchpads);
  const years = getLaunchYears(apiData);

  const checkValid = () => {
    console.log(search);
    if (search.min !== "Any" && search.max !== "Any") {
      if (search.min > search.max) {
        alert(
          "Error: Minimum launch year cannot be greater than maximum launch year"
        );
        return false;
      }
    }
    return true;
  };

  return (
    <form className="search-container">
      <div className="container-keywords">
        <label for="keywords" className="search-label">
          Keywords
        </label>
        <input
          id="keywords"
          type="text"
          placeholder="eg. Falcon"
          onChange={(val) =>
            setSearch({ ...search, keyword: val.target.value })
          }
        />
      </div>
      <div className="container-launch">
        <label for="launch" className="search-label">
          Launch Pad
        </label>
        <select
          id="launch"
          onChange={(val) =>
            setSearch({
              ...search,
              launch: val.target.value,
            })
          }
          value={search.launch}
        >
          <option value="Any">Any</option>
          {launchPadNames.map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
        </select>
      </div>
      <div className="container-min">
        <label for="minYear" className="search-label">
          Min Year
        </label>
        <select
          id="minYear"
          onChange={(val) => {
            console.log(val.target.value);
            setSearch({ ...search, min: val.target.value });
          }}
          value={search.min}
        >
          <option value="Any">Any</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="container-max">
        <label for="maxYear" className="search-label">
          Max Year
        </label>
        <select
          id="maxYear"
          onChange={(val) => {
            console.log(val.target.value);
            setSearch({ ...search, max: val.target.value });
          }}
          value={search.max}
        >
          <option value="Any">Any</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div id="apply-btn-container">
        <button
          id="apply-btn"
          type="button"
          aria-label="apply"
          onClick={() => {
            if (checkValid()) {
              props.onSubmit(search);
            }
          }}
        >
          Apply
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
