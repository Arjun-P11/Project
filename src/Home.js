import React, { useRef } from "react";
import Header from "./header/Header.js";
import Footer from "./footer/Footer.js";
import Form from "./form/Form.js";
import "./App.scss";

const Home = () => {
  const formRef = useRef();

  const scrollClick = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="main-container">
      <Header onClick={scrollClick} />
      <div ref={formRef}>
        <Form />
      </div>
      <Footer onClick={scrollClick} />
    </div>
  );
};

export default Home;
