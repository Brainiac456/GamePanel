import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import "../../style/slide.css";
import "../../style/theme.css";
import { DataContext } from "../../Helper/context";
import { useContext } from "react";


const ImgSlider = ({ Dat, assetsType , scrollTop , scrollHeight ,handleViewAll}) => {
  const [Data, setData] = useState(null);

  const [scrollLimit, setScrollLimit] = useState(32);
  const [viewMore, setViewMore] = useState();
  const [ind, setInd] = useState(null);
  const [viewButton, setViewButton] = useState("x");
  

  const {Image_data, container_data, TabData , TabName} = useContext(DataContext)
  const {ImageData , setImageData} = Image_data
  const {ContainerData, setContainerData} = container_data
  const {TableData , setTableData} = TabData
  const {tableName, setTableName} = TabName



  const viewAll = (subType, limit, index)=>{

    axios
    .get(
      `https://dev.breshna.io/api/assets?templateId=628cb173fdd0331e553ecd93`,
      {
        params: {
          limit: limit,
          assetTypeId: assetsType,
          assetSubType: subType,
        },
      }
    )
    .then((response) => {
      const dataa = [...Data];
      dataa[index] = response.data;
      setData([...dataa]);
    })
    .catch((error) => {
      console.log(error);
    });

  }

  const handleViewMore = async (index, subType, limit) => {
    handleViewAll()
    setViewMore(subType)
       viewAll(subType,limit,index)
     
       if (limit === "10") {
      setInd(null);
      setViewButton(null);
   
    } else {

      setInd(index);
      setViewButton(index);
    }

  };

  useEffect(()=>{
    console.log(TableData)
  },
  [TabData])

  const onImageClick = (data) =>{

    
  
  let image = [...ImageData];
  let table = [...TableData]
    for(let i=0; i<ContainerData.length ; i++){
     if(image[i][0][ContainerData[i]].asset_type_id === data.asset_type_id){
       image[i][0][ContainerData[i]]= data;
     }
     setImageData(image);
    }



  
  for (let i=0 ; i<tableName.length ;i++){

    if(table[i][tableName[i]][0] !== undefined ){
      console.log('tab',table[i][tableName[i]][0].asset_type_id,data.asset_type_id)
      if(table[i][tableName[i]][0].asset_type_id === data.asset_type_id){
          table[i][tableName[i]].push(data);
      }
    }
    else {
      table[i][TableData[i]].push(data);
    }
  }

   
      setTableData(table);
    




  
  

  }

  useEffect(()=>{
  
  },[])


    useEffect(()=>{

      if(scrollTop === scrollHeight-600 || scrollTop === scrollHeight-607){
        setScrollLimit(prev => prev +18)
      viewAll(viewMore, scrollLimit, ind)};

    },[scrollTop,scrollHeight])

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
  };



  useEffect(() => {
    setData(Dat);
  }, [Dat]);

  return (
    <div  >
      {ind === null && (
        <div style={{ overflowX: "hidden" }}>
          {Data?.map((Image, index) => {
            return (
              <div key={Image}>
                <div>
                  <h3 style={{ color: "white" }}>{Image.data?.[0].sub_type}</h3>

                  {Image.data.length > 4 && viewButton !== index && (
                    <button
                      style={{
                        backgroundColor: "#ce2877",
                        border: "none",
                        height: "35px",
                        width: "90px",
                        borderRadius: "5px",
                        color: "white",
                        position: "relative",
                        top: "-40px",
                        left: "306px",
                      }}
                      onClick={(e) =>
                        handleViewMore(index, Image.data?.[0].sub_type, "18")
                      }
                    >
                      {" "}
                      View All{" "}
                    </button>
                  )}
                </div>
                <div className="img-container" style={{ marginBottom: "50px" }}>
                  <Slider {...settings} key={index}>
                    {Image.data?.map((Im, ind) => {
                      return (
                        <div key={ind} className="img-container viewLess">
                          <img onClick={ ()=> onImageClick(Im)}
                            src={
                              "https://dev.breshna.io/api/uploads/" + Im.file
                            }
                            className="filter"
                            alt=""
                            width="100%"
                            style={{ margin: "auto" }}
                          />
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {ind !== null && (
        <div  style={{ overflowX: "hidden" }} >
          <div>
            <h3 style={{ color: "white" }}>{Data[ind].data[0].sub_type}</h3>
          
      

            {viewButton === ind && (
              <div>
                <button
                  style={{
                    backgroundColor: "#ce2877",
                    border: "none",
                    height: "35px",
                    width: "90px",
                    borderRadius: "5px",
                    color: "white",
                    position: "relative",
                    top: "-40px",
                    left: "306px",
                  }}
                  onClick={(e) =>
                    handleViewMore(ind, Data[ind].data[0].sub_type, "10")
                  }
                >
                  {" "}
                  View Less{" "}
                </button>

                <div>
                  {Data[ind]?.data.map((Im, ind) => {
                    return (
                      <div key={ind} className="img-container viewAll">
                        <img
                          src={"https://dev.breshna.io/api/uploads/" + Im.file}
                          className="filter"
                          alt=""
                          width="60%"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImgSlider;
