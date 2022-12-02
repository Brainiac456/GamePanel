import React, {useState,useEffect} from "react";

import Song from "./Song";
import Play from "./Play";
import Pause from "./Pause";
import Bar from "./Bar";
import { BsFillPlusCircleFill,BsFillCheckCircleFill } from "react-icons/bs";

import useAudioPlayer from './useAudioPlayer';


function Audio({data,index ,Disable,musicSelect,musicCheck,Player ,musicRun }) {
  
  const { curTime, duration, setClickedTime, setPlay } = useAudioPlayer();
  const handleSelected =(e)=>{
    e.preventDefault()
    musicSelect(index)
  }

  const test=()=>{
    Player(index)
  }

  useEffect(()=>{

    if(musicRun!==index){
      setPlay(index,false)
    }
    else
      setPlay(index,true)

  })


  return (
    <div className="player">
      <audio id={index}>
        <source src={`https://dev.breshna.io/api/uploads/${data.file}`} type="audio/mpeg"/>
        Your browser does not support the <code>audio</code> element.
      </audio>
      <Song songName={data.name} />
      <div className="controls" disabled={Disable} >
        {musicRun===index? 
          <Pause name ="Pause" handleClick={() => setPlay(index,false)} handleClick2={()=>test()} /> 
          :
          <Play  name  ="Play"  handleClick={() => setPlay(index,true)}  handleClick2={()=>test()}  />
        }
        {index!==musicCheck?
        <button onClick={(e)=>handleSelected(e)} style={{background:'none',fontSize:'2.2rem' ,border:'none'}}>< BsFillPlusCircleFill style={{color:'#ce2877',background:'white', borderRadius:'20px',position: 'relative',right:'6px',bottom:'38px' }} color="#000"/></button>   
        :
        <button onClick={(e)=>handleSelected(e)} style={{background:'none',fontSize:'2.2rem' ,border:'none'}}>< BsFillCheckCircleFill style={{color:'#ce2877', backgroundColor:'none',position: 'relative',right:'6px',bottom:'38px' }} color="#000"/></button>
        }
        <Bar curTime={curTime} duration={duration} onTimeUpdate={(time) => setClickedTime(time)}/>
      </div>
      
    </div>
  );
}

export default Audio;
