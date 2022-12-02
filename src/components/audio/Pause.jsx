import React from "react";
import { AiFillPauseCircle } from "react-icons/ai";

export default function Play(props) {
  const { handleClick,handleClick2 } = props;
  
  return (
    <button name="Play" className="player__button" onClick={() => {handleClick();handleClick2()}} >
      <AiFillPauseCircle />
    </button>
  );
}
