import React, {useState,useEffect} from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import { BsFillPlusCircleFill,BsFillCheckCircleFill } from "react-icons/bs";

import useAudioPlayer from './useAudioPlayer';
import Top from './../top-navBar';

function Audio({data,index ,Disable }) {
  
  const { curTime, duration, playing, setPlaying, setClickedTime, setPlay } = useAudioPlayer();
  const [isDisabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(true)


  const handleSelected =(e)=>{
   
    setSelected(prevState=>!prevState)
  }

  useEffect(()=>{

    if(Disable===false){
    setDisabled(true)
   
  }
    else 
    {
    setDisabled(false)
      setSelected(true)
    }
  },[Disable])

  return (
    <div className="player">
      <audio id={index}>
        <source src={"https://dev.breshna.io/api/uploads/sounds/2443415-366247-619fb98819f7bb212cee4d48.mp3"} type="audio/mpeg"/>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={data.name} />
      <div className="controls" disabled={Disable} >
        {playing ? 
          <Pause name ="Pause" handleClick={(e) => setPlay(index,false)}  /> :
          <Play  name  ="Play"  handleClick={(e) => setPlay(index,true)}  />
        }
        {selected===true?
        <button onClick={(e)=>handleSelected(e)} style={{background:'none',fontSize:'2.2rem' ,border:'none'}}>< BsFillPlusCircleFill style={{color:'#ce2877' ,position: 'relative',right:'6px',bottom:'42px' }} color="#000"/></button>   
        :
        <button onClick={(e)=>handleSelected(e)} style={{background:'none',fontSize:'2.2rem' ,border:'none'}}>< BsFillCheckCircleFill style={{color:'#ce2877', backgroundColor:'none',position: 'relative',right:'6px',bottom:'42px' }} color="#000"/></button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
      
    </div>
  );
}

export default Audio;
