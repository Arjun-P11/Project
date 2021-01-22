import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar.js";
import Mission from "./mission/Mission.js";
import Results from "./Results.js";
import "../App.scss";
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

  useEffect(() => {
    console.log(form);
    const keyword = form.keyword;
    // search flightnumbers, rocket name, payload id
  });

  return (
    <div className="Form">
      <SearchBar setForm={setForm} />
      <Results numMissions={data.length} />
      {data.map((data) => (
        <Mission data={data} />
      ))}
    </div>
  );
}

export default Form;
