import React from "react";
import "./Header.scss";
import space from "../designs/space-photo.jpeg";

function Header(props) {
  return (
    <div className="box">
      <img className="image" src={space} alt="Header - Space" />
      <button className="btn" onClick={props.onClick} />
      <h1 className="heading"> Discover Space Missions </h1>
      <div className="subtext"> SPACE SAVVY </div>
    </div>
  );
}

export default Header;
