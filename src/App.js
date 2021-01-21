import React, { Component, useState, useEffect } from "react";
import "./App.scss";
import Header from "./header/Header.js";
import Form from "./form/Form.js";

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
