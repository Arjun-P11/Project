import React, { Component, useState } from "react";
import "./App.scss";
import Header from "./Header.js";
import Form from "./Form.js";

// maybe render header by default unclosed
// when down chevron clicked, change state? and show search menu and close footer

class App extends Component {
  render() {
    return <Display />;
  }
}

function Display() {
  const [state, setState] = useState(true);
  return (
    <div>
      <Header onClick="" />
      <Form />
    </div>
  );
}

export default App;
