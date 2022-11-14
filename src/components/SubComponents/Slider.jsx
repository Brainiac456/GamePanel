import { margin } from "@mui/system";
import React ,{useState}from "react";
import Slider from "react-slick";

import "../../style/slide.css";
import "../../style/theme.css";
import MovieCard from "./MovieCard";



const ImgSlider = ({ Data , limit , view}) => {

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,


  };
  return (
     <div>
       {Data?.map((Image, index) => {
         return (
          <div>
            <div>       
         <h3>{Image.data?.[0].sub_type}</h3>
          <button
          onClick={()=>limit(index)} 
          style={{backgroundColor:'#ce2877' , border:'none' , borderRadius:'5px', height:'25px' , color:'white' ,position: 'relative', top: '-40px' , left:'306px' }} >View more</button>
          </div>
          <div style={{marginBottom:'50px'}}>
          <Slider {...settings}>
            {Image.data?.map((Im) => {
              return<div>

               <MovieCard movie={Im} />
              </div>
            })}
          </Slider>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImgSlider;
