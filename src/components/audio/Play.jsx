import React from "react";
// import { PlayCircleFilled } from "@material-ui/icons";

export default function Play(props) {
  const { handleClick } = props;

  return (
    <button name="Play" className="player__button" onClick={(e) => handleClick(e)}>
      {/* <PlayCircleFilled /> */}
    </button>
  );
}
