import { margin } from "@mui/system";
import React from "react";
import Slider from "react-slick";

import "../../style/slide.css";
import "../../style/theme.css";
import MovieCard from "./MovieCard";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}


const ImgSlider = ({ Data }) => {
  console.log("Data", Data);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    className: "center",

  };

  return (
    <div>
      {Data?.map((Image) => {

        return (
          <div>
            <div >
          <h3>{Image.list}</h3>
          <button style={{backgroundColor:'#ce2877' , border:'none' , borderRadius:'5px', height:'25px' , color:'white' ,position: 'relative', top: '-40px' , left:'200px' }} >View more</button>
          </div>
          <div style={{marginBottom:'50px'}}>
          <Slider {...settings}>
            {Image.images.map((Im) => {
              return <MovieCard movie={Im} />;
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
