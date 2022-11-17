import React from "react";
// import { PauseCircleFilled } from "@material-ui/icons";

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <button name="Play" className="player__button" onClick={(e) => handleClick(e)}>
      {/* <PauseCircleFilled /> */}
    </button>
  );
}
