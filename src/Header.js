import React from "react";
import "./Header.scss";
import space from "./designs/space-photo.jpeg";

function Header(props) {
  return (
    <div>
      {/* look into box and setting background image of box as the image */}
      <div class="box">
        <img className="image" src={space} alt="Header - Space" />
        <button class="btn" />
      </div>
    </div>
  );
}

export default Header;
