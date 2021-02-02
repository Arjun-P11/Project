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
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
