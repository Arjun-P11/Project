import React from "react";
import "./Footer.scss";

function Footer(props) {
  return (
    <div className="footer">
      <div className="copyright"> Copyright &copy; 2018 Space Saavy </div>
      <div className="toTop" aria-label="back to top" onClick={props.onClick}>
        Back to Top
      </div>
    </div>
  );
}

export default Footer;
