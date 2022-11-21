import React from "react";
import { AiFillPauseCircle } from "react-icons/ai";

export default function Play(props) {
  const { handleClick } = props;
  
  return (
    <button name="Play" className="player__button" onClick={(e) => handleClick(e)} >
      <AiFillPauseCircle />
    </button>
  );
}
