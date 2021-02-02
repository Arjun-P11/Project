import React from "react";
import "./Header.scss";
import space from "../designs/space-photo.jpeg";

function Header(props) {
  return (
    <header className="box">
      <img className="image" src={space} alt="Header - Space" />
      <button
        className="btn"
        aria-label="scroll down"
        onClick={props.onClick}
      />
      <h1 className="heading"> Discover Space Missions </h1>
      <div className="subtext"> SPACE SAVVY </div>
    </header>
  );
}

export default Header;
