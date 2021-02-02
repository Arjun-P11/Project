import React from "react";
import "./Youtube.scss";

export default function YouTube(props) {
  var videoSrc =
    "https://www.youtube.com/embed/" +
    props.video +
    "?autoplay=" +
    props.autoplay +
    "&modestbranding=1";
  return (
    <div className="container">
      <iframe
        className="player"
        src={videoSrc}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}
