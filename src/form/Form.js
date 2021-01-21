import React from "react";
import SearchBar from "./SearchBar.js";
import Mission from "./mission/Mission.js";
import Results from "./Results.js";
import "../App.scss";
import "./form.scss";

function Form() {
  return (
    <div className="Form">
      <SearchBar />
      <Results />
      <Mission />
    </div>
  );
}

export default Form;
