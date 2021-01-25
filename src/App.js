import React, { Component, useState, useEffect, useRef } from "react";
import Header from "./header/Header.js";
import Form from "./form/Form.js";
import "./App.scss";

class App extends Component {
  render() {
    return <Display />;
  }
}

const Display = () => {
  const formRef = useRef();

  useEffect(() => {
    console.log(formRef);
  });

  const scrollClick = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div>
      <Header onClick={scrollClick} />
      <div ref={formRef}>
        <Form />
      </div>
    </div>
  );
};

export default App;
