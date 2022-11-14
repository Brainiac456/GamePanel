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

  const [apiCall , setApiCall] = useState([])

  const imgClickHanle = (assetSubTypes, name,assetTypeId,hasFrames,index) =>{
    console.log(assetTypeId)
    setExpendedState(true)
    setSubtypes(assetSubTypes)
    setTitle(name)
    setActiveIndex(index)
    setAssetsType(assetTypeId)
    setHasFrame(hasFrames)
  }
  const navBarPostion=()=>{
    setActiveIndex('-1')
    setExpendedState(false)
  }

  const menuItems = [
    {
      text: "Avatar",
      
      icon: "/Rocket.png",
      innerList:[
        {
            list:"Heroes",
            images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
        },
        {
          list:"villain",
          images:["https://picsum.photos/200/300", 
          "https://picsum.photos/200/300",
           "https://picsum.photos/200/300",
           "https://picsum.photos/200/300",
            "https://picsum.photos/200/300",
             "https://picsum.photos/200/300",
              "https://picsum.photos/200/300"]
      },
      {
        list:"Tree",
        images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
    },
    {
      list:"Fire-Fighter",
      images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
  },
  {
    list:"Police",
    images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
},
{
  list:"Doctor",
  images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
},
{
  list:"Doc",
  images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
}

    ]
    },
    {
      text: "BackGround",
     
      icon: "/Background.png",
      innerList:[
        {
            list:"fruit",
            images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
        },
        {
          list:"vegetable",
          images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
      }
    ]
    },
    {
      text: "Music",
      icon: "/Music.png",
      innerList:[
        {
            list:"Avici",
            images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
        }
    ]
    },
    {
      text: "Platform",
      icon: "/Box.png",
      innerList:[
        {
            list:"UNREAL",
            images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
        },
        {
          list:"CRYENGINE",
          images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
      }
    ]
    },
    {
      text: "Platform",
      icon: "/Lines.png",
      innerList:[
        {
            list:"UNREAL",
            images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
        },
        {
          list:"CRYENGINE",
          images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300"]
      }
    ]
    }
  ];

  const fetchData=async()=>{
   await axios.get("https://dev.breshna.io/api/game_templates/62d654ff301b4243bb87ffb1")
    .then((response)=>{
      console.log(response.data.data)
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
                
                <a className={activeIndex===index?"menu-items active":"menu-items"}>
                  <img src={image} onClick={()=>imgClickHanle(assetSubTypes,name,assetTypeId,hasFrames,index)} />
                  <div>{name}</div>
                 
                </a>
              );
            })}

          </div>
        </div >
       
           <div> 
        <CompBar Expended = {isExpended} Title={title} assetsType= {assetsType} subtypes = {subtypes} hasFrame= {hasFrame} close ={navBarPostion}   />
          </div>
     
      </div>
    </div>
  );
};

export default SideNav;
