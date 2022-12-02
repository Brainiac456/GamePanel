import React from "react";
 import { AiFillPlayCircle } from "react-icons/ai";

export default function Play(props) {
  const { handleClick,handleClick2 } = props;

  return (
    <button  name="Play" className="player__button" onClick={(e) => {handleClick(e);handleClick2(e)}} >
      <AiFillPlayCircle />
    </button>
  );
}
