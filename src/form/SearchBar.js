import React from "react";
import "./SearchBar.scss";

function SearchBar() {
  return (
    <form className="container">
      <div id="keywords-container">
        <label htmlFor="keywords">Name</label>
        <input id="keywords" type="text" placeholder="eg. falcon" />
      </div>
      <div id="launch-container">
        <label htmlFor="launch">Launch Pad</label>
        <select id="launch">
          <option value="Any">Any</option>
        </select>
      </div>
      <div id="min-container">
        <label htmlFor="minYear">Min Year</label>
        <select id="minYear">
          <option value="minYear">Any</option>
        </select>
      </div>
      <div id="max-container">
        <label htmlFor="maxYear">Max Year</label>
        <select id="maxYear">
          <option value="maxYear">Any</option>
        </select>
      </div>
      <div id="apply-btn-container">
        <button id="apply-btn" type="button">
          Apply
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
