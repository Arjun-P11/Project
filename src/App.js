import React, { Component, useState, useEffect, useRef } from "react";
import Header from "./header/Header.js";
import Form from "./form/Form.js";
import "./App.scss";

class App extends Component {
  render() {
    return <Display />;
  }
}

function Display() {
  const [form, setForm] = useState(false);

  useEffect(() => {
    console.log(form);
  });

  return (
    <div>
      <Header onClick={setForm} />
      <Form />
    </div>
  );
}

export default App;
