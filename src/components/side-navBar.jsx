import React, { useState } from "react";
import CompBar from "./Comp-Bar";
import "../style/side-navBar.css";
import "../style/Comp-Bar.css";

const SideNav = () => {
  const [isExpended, setExpendedState] = useState(false);
  const [Inner, setInner] = useState()
  const [title, setTitle] = useState()

  const imgClickHanle = (list, text) =>{
    setExpendedState(true)
    setInner(list)
    setTitle(text)
  }
  const navBarPostion=()=>{
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
          images:["https://picsum.photos/200/300", "https://picsum.photos/200/300", "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300",, "https://picsum.photos/200/300"]
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
  ];


  return (
    <div>
      <div className="side-nav-container">
        
        <div className="nav-upper">
          <div className="nav-menu">
            {menuItems.map(({ icon, text, innerList }) => {
              return (
    
                <a className="menu-items">
                  <img src={icon} onClick={()=>imgClickHanle(innerList , text)} />
                  
                 
                </a>
              );
            })}

          </div>
        </div >
       
           <div> 
        <CompBar Expended = {isExpended} Title={title} List = {Inner} close = {navBarPostion}  />
          </div>
     
      </div>
    </div>
  );
};

export default SideNav;
