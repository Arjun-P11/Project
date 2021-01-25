import React from "react";
import "./Footer.scss";

function Footer(props) {
  return (
    <div className="footer">
      <div id="copyright"> Copyright &copy; 2018 Space Saavy </div>
      <a id="toTop" onClick={props.onClick}>
        Back to Top
      </a>
    </div>
  );
}

export default Footer;
