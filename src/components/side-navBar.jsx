import React, { useEffect, useState } from "react";
import CompBar from "./Comp-Bar";
import "../style/side-navBar.css";
import "../style/Comp-Bar.css";
import axios from 'axios';

const SideNav = () => {
  //Main data silos
  const [Data , setData] = useState()
  const [NavData ,setNavData] = useState()
 
  //sideBar functionality related 
  const [isExpended, setExpendedState] = useState(false);
  const [activeIndex, setActiveIndex]= useState('-1')
  
  //Assets data
  const [title, setTitle] = useState()
  const [subtypes, setSubtypes] = useState()
  const [assetsType , setAssetsType]= useState()
  const [hasFrame, setHasFrame]= useState()

  const [isClicked , setIsClikced]=useState(false)


  const imgClickHanle = (assetSubTypes, name,assetTypeId,hasFrames,index) =>{
    
    setExpendedState(true)
    setSubtypes(assetSubTypes)
    setTitle(name)
    setActiveIndex(index)
    setAssetsType(assetTypeId)
    setHasFrame(hasFrames)
    setIsClikced(true)
    
  }
  const navBarPostion=()=>{
    setActiveIndex('-1')
    setExpendedState(false)
    setIsClikced(false)
  }



  const fetchData=async()=>{
   await axios.get("https://dev.breshna.io/api/game_templates/62d654ff301b4243bb87ffb1")
    .then((response)=>{
  
      setData(response.data.data)
    })
    .catch(error=>console.error(`Error: $(error)`))

  }

  useEffect(()=>{

     fetchData()

   },[])

  useEffect(()=>{
    setNavData(Data?.game_config.assets)
  },[Data])

  

  return (
    <div>
         <div className="side-nav-container">
        
         <div className="nav-upper">
           <div className="nav-menu">
            {NavData?.map(({ image, name, assetSubTypes,assetTypeId,hasFrames } ,index) => {
            
              return (
                
                <a key={image} className={activeIndex===index?"menu-items active":"menu-items"}>
                  <img src={image} onClick={()=>imgClickHanle(assetSubTypes,name,assetTypeId,hasFrames,index)} />
                  <div>{name}</div>
                 
                </a>
              );
            })}

          </div>
        </div >
      {isClicked && 
           <div> 
        <CompBar Expended = {isExpended} Title={title} assetsType= {assetsType} subtypes = {subtypes} hasFrame= {hasFrame} close ={navBarPostion}   />
          </div>
      }
      </div>
    </div>
  );
};

export default SideNav;
