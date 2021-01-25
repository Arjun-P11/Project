import React, { useState } from "react";
import "./SearchBar.scss";
import { sampleData } from "../sampleData.js";
import { launchPads } from "../LaunchPads.js";

function getLaunchPads() {
  let launchPadNames = [];
  for (let launchPad of launchPads) {
    launchPadNames.push(launchPad.full_name);
  }
  return launchPadNames;
}

function getLaunchYears() {
  let years = [];
  for (let launch of sampleData) {
    const date = new Date(launch.launch_date_local);
    const year = date.getFullYear();
    if (years.indexOf(year) === -1) {
      years.push(year);
    }
  }
  return years.sort();
}

function SearchBar(props) {
  const [search, setSearch] = useState({
    keyword: "all",
    launch: "Any",
    min: "Any",
    max: "Any",
  });
  const launchPadNames = getLaunchPads();
  const years = getLaunchYears();

  // useEffect(() => {
  //   props.setForm(search);
  // });

  const checkValid = () => {
    console.log(SearchBar);
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
    <form className="container">
      <div id="keywords-container">
        <label htmlFor="keywords">Name</label>
        <input
          id="keywords"
          type="text"
          placeholder="eg. falcon"
          onChange={(val) =>
            setSearch({ ...search, keyword: val.target.value })
          }
        />
      </div>
      <div id="launch-container">
        <label htmlFor="launch">Launch Pad</label>
        <select
          id="launch"
          onChange={(val) =>
            setSearch({
              ...search,
              launch: val.target.value,
            })
          }
        >
          <option value="Any">Any</option>
          {launchPadNames.map((site, index) => (
            <option key={index} value={site}>
              {site}
            </option>
          ))}
        </select>
      </div>
      <div id="min-container">
        <label htmlFor="minYear">Min Year</label>
        <select
          id="minYear"
          onChange={(val) => {
            setSearch({ ...search, min: val.target.value });
          }}
        >
          <option value="Any">Any</option>
          {years.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div id="max-container">
        <label htmlFor="maxYear">Max Year</label>
        <select
          id="maxYear"
          onChange={(val) => {
            setSearch({ ...search, max: val.target.value });
          }}
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
