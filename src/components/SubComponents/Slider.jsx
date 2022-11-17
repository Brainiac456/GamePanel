import React, { useState ,useEffect } from "react";
import Slider from "react-slick";

import "../../style/slide.css";
import "../../style/theme.css";

const ImgSlider = ({ Dat, limit}) => {
  const [isSlider, setIsSlider] = useState([]);
  const [Data , setData ]= useState()


const handleViewMore = (index, subType) => {

  if(isSlider.includes(index)){
 
  let temp= isSlider
  let arr = temp.filter(item => item !== index)  
  setIsSlider(arr)
  console.log('index',index)
}
else
{
  let temp = isSlider
  temp.push(index)
  setIsSlider(temp);
  console.log('slider', isSlider)
}
    limit(subType);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };

  useEffect(()=>{
      console.log('shit', Dat)
    setData(Dat)

  },[][isSlider])
  return (
    <div>

      {Data?.map((Image, index) => {
        return (
          <div key={Image}>
            <div>
              <h3 style={{ color: "white" }}>{Image.data?.[0].sub_type}</h3>
              <button
                onClick={() => handleViewMore(index,Image.data?.[0].sub_type)}
                name={index}
                style = {{
                  backgroundColor: "#ce2877",
                  border: "none",
                  borderRadius: "5px",
                  height: "25px",
                  color: "white",
                  position: "relative",
                  top: "-40px",
                  left: "306px",
                }}
              >
                {isSlider.includes(index)?<div>View Less</div> :<div>ViewMore</div>}
              </button>

            </div>
            <div className="img-container" style={{ marginBottom: "50px" }}>
            {console.log(" this",isSlider.includes(index),index , isSlider)}
            
              {!isSlider?.includes(index) ? 
                <Slider {...settings}  key={index}>
                  {Image.data?.map((Im,ind) => {
                    return (
                      <div key={ind} className="img-container viewLess">
                        <img 
                          src={"https://dev.breshna.io/api/uploads/" + Im.file}
                          className="filter"
                          alt=""
                          width="80px"
                          height="100px"
                          style={{ borderRadius: "16px" }}
                        />
                        
                      </div>
                    );
                  })}
                </Slider>
              : 
                
                Image.data?.map((Im,ind) => {
                  return (
                <div key={ind}  className="img-container viewAll">
                      <img 
                        src={"https://dev.breshna.io/api/uploads/" + Im.file}
                        className="filter"
                        alt=""
                        width="80px"
                        height="100px"
                      />
                  
                    </div>
                  );
                })
              
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ImgSlider;
