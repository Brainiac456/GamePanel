import React from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";

import useAudioPlayer from './useAudioPlayer';

function Audio({data}) {
  const { curTime, duration, playing, setPlaying, setClickedTime, setPlay } = useAudioPlayer();
  return (
    <div className="player">
      <audio id="audio">
        <source src="https://dev.breshna.io/api/uploads/sounds/5954489-213145-619fb98819f7bb212cee4d48.mp3" type="audio/mpeg"/>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={data.name} />
      <div className="controls">
        {playing ? 
          <Pause name ="Pause" handleClick={(e) => setPlaying(false)} /> :
          <Play name  ="Play"  handleClick={(e) => setPlaying(true)} />
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
    </div>
  );
}

export default Audio;
