import React, { useState ,useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "../../style/slide.css";
import "../../style/theme.css";

const ImgSlider = ({ Dat,assetsType,onScrollHandler}) => {
  const [isSlider, setIsSlider] = useState([]);
  const [Data , setData ]= useState(null)
  const [limit ,setLimit] = useState(10)
  const [scroll, setScroll]= useState()

  const [isViewMore , setIsViewMore] =useState() 

 const viewMore = (length) => {
  console.log('huz',length )
  if(length>3){
    setIsViewMore(false)
  }
  else
  setIsViewMore(true)

 } 

const handleViewMore = async(index, subType) => {
  setLimit(20)
  if(isSlider.includes(index)){
 
  let temp= isSlider
  let arr = temp.filter(item => item !== index)  
  setIsSlider(arr)
 

}
else
{
  let temp = isSlider
  temp.push(index)
  setIsSlider([...temp]);
}

 axios.get((`https://dev.breshna.io/api/assets?templateId=62d654ff301b4243bb87ffb1`),
{params :{
  "limit": 20,
  "assetTypeId": assetsType,
  "assetSubType": subType
}}).then((response) => {
    const dataa = [...Data];
    dataa[index]= response.data;
      setData([...dataa]);
      console.log('dat',)

}
).catch(error => {
  console.log(error);
})



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
  console.log('data',Data)
},[Data])


  useEffect(()=>{ 


  setData(Dat)
    
  },[])
 
  return (
     <div style={{ overflowX: "hidden",}}>

      {Data?.map((Image, index) => {
        return (
          <div key={Image}>
           
            <div>
              <h3 style={{ color: "white" }}>{Image.data?.[0].sub_type}</h3>
             
              {Image.data.length > 4 &&
              <button
                onClick={() => handleViewMore(index,Image.data?.[0].sub_type,'40')}
               
                style = {{
                  backgroundColor: "#ce2877",
                  border: "none",
                  height: '35px',
                  width:'90px',
                  borderRadius: "5px",
                  color: "white",
                  position: "relative",
                  top: "-40px",
                  left: "306px",
                }}
              >
                {isSlider.includes(index)?<div>View Less</div> :<div>View More</div>}
              </button>
                
               }
            </div>
            <div className="img-container" style={{ marginBottom: "50px" }}>
           
              {!isSlider?.includes(index) ? 
                <Slider {...settings}  key={index}>
                  {Image.data?.map((Im,ind) => {

                    return (
                      <div key={ind} className="img-container viewLess">
                      
                          <img 
                          src={"https://dev.breshna.io/api/uploads/" + Im.file}
                          className="filter"
                          alt=""
                          width="100%"
                          
                          style={{margin:'auto'}}
  
                        />
                        
                      </div>
                    );
                  })}
                </Slider>
              : 
                Image.data?.map((Im,ind) => {
                  return (   
                <div key={ind}  className="img-container viewAll">
                 
                   {console.log('f', Image.data.length)}
                      <img 
                        src={"https://dev.breshna.io/api/uploads/" + Im.file}
                        className="filter"
                        alt=""
                        width="60%"
                      
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
