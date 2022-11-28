import React, { useState, useContext } from "react";
import "../style/editor_setting.css";
import { AiOutlineCloudUpload,AiOutlineEdit } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";
import { useEffect } from "react";
import TagsInput from "react-tagsinput";
import axios from "axios";
import { DataContext } from "../Helper/context";


import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "react-tagsinput/react-tagsinput.css";

const Editor_Setting = ({ Data }) => {
  const [toggleState, setToggleState] = useState(1);
  const [feild, setFeild] = useState();
  const [level, setLevel] = useState([1, 2, 3]);
  const [currentLevel, setCurrentLevel] = useState("1");
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState();
  const { Image_data, container_data, TabData } = useContext(DataContext);
  const { ImageData, setImageData } = Image_data;
  const { TableData, setTableData } = TabData;




  const [InpType, setInpType] = useState()
  const [TempText , setTempText] = useState({
    text : '',
    scrumber : ''
  })

  const [Text , setText] = useState({
    asset_type_id:'',
    text : '',
    scrumber : '',
    file:null,
    type:'text'
    
})

  useEffect(() => {
    if (Data !== undefined) {
      setFeild([...Data.game_config.fields]);
    }
  }, [Data]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleTags = (tag) => {
    setTags(tag);
  };

const handleInputType=(type)=>{
  setInpType(type)
}
  
  const handleDelete = (Asset, Collection, Index) => {


    let reducedArr = [];
    let temp = TableData.map((_TableData) => {
      if (Object.keys(_TableData)[0] === Collection) {
        reducedArr = Object.values(_TableData)[0].filter((_, key) => {
          return key !== Index;
        });
        return { [Object.keys(_TableData)[0]]: reducedArr };
      }
      return _TableData;
    });
    setTableData([...temp]);
  };


  const handleText = (Index , Collection, type , secondIndex )=>{
    let Temp = [...TableData]
  
    if(type ==='Add')
    {    
    Temp[Index][Collection].push(Text)

    setTableData([...Temp])

}
else {

  console.log('Hellcat',Temp[Index][Collection] ,secondIndex)

}

  }

  

  const fetchData = async () => {
    await axios
      .get("https://dev.breshna.io/api/categories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => console.error(`Error: $(error)`));
  };


  const toggleTab = (index) => {
    setToggleState(index);
  };


  return (
    <div className="right_container">
      <div className="tab_right">
        <div className="btn-group">
          <button
            className={
              toggleState === 1 ? "righttablinks-active-tab" : "righttabslinks"
            }
            onClick={() => toggleTab(1)}
          >
            <AiOutlineCloudUpload style={{ fontSize: "19px" }} /> Game Info
          </button>
          <button
            className={
              toggleState === 2 ? "righttablinks-active-tab" : "righttabslinks"
            }
            onClick={() => toggleTab(2)}
          >
            <AiOutlineCloudUpload style={{ fontSize: "19px" }} /> Levels
          </button>
        </div>
      </div>

      <div>
        <div className="right_tab_contents">
          <div className={toggleState === 1 ? "active-content" : "tabcontent"}>
            <label htmlFor="gameTitle" className=" d-flex label_game">
              Game Title
            </label>

            <input
              type="text"
              className="game_title"
              name="gameTitle"
              placeholder="Game Title"
            />

            <p className="caption">Max Character limit 30 Characters</p>

            <form>
              <label htmlFor="category" className="label_game">
                Game Category
              </label>
              <select
                style={{ textAlign: "left", border: "1px solid #ce2877" }}
                className="game_title"
                value={``}
                onChange={``}
              >
                {categories?.map((level) => {
                  return <option value={level.name}>{level.name}</option>;
                })}
              </select>
            </form>

            <label htmlFor="gameTags" className="d-flex label_game">
              Game Tags
            </label>
            <TagsInput
              className="gametitle"
              value={tags}
              onChange={handleTags}
              placeholder="fdsf"
            />

            <div className="form-check form-switch d-flex row">
              <label className="switch" htmlFor="flexSwitchCheckDefault">
                Collect Player Email
              </label>
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
              />
            </div>

            <label htmlFor="description" className="label_game">
              Description
            </label>
            <textarea
              type="text"
              rows="5"
              cols="50"
              className="txtField"
              placeholder="About the Game"
            ></textarea>
          </div>

          <div className={toggleState === 2 ? "active-content" : "tabcontent"}>
            <div className="btn-group d-flex justify-content-end">
              <button
                className="purple_cta"
                style={{
                  width: "82px",
                  height: "32px",
                  fontSize: "12px",
                  padding: "5px",
                  marginRight: "10px",
                }}
              >
                {" "}
                Add Level
              </button>
              <button
                className="purple_cta"
                style={{
                  width: "96px",
                  height: "32px",
                  marginRight: "25px",
                  padding: "5px",
                  fontSize: "12px",
                }}
              >
                {" "}
                Delete Level
              </button>
            </div>

            <form>
              <label>Select Level</label>
              <select
                style={{ textAlign: "left", border: "1px solid #ce2877" }}
                className="game_title"
                value={``}
                onChange={``}
              >
                {level.map((level) => {
                  return <option value={level}>{`Level ${level}`}</option>;
                })}
              </select>
            </form>

            <div className="level_button">{`Level ${currentLevel}`}</div>

            <div className="images_container">
              {ImageData?.map((img, index) => {
                return (
                  <div className="m-3 right_images_div" key={index}>
                    {Object.keys(img[0]).map((a) => {
                      return (
                        <div key={a}>
                          <img
                            src={`https://dev.breshna.io/api/uploads/${img[0][a].file}`}
                            className="right_filter"
                          />
                          <div className="d-flex justify-content-center">
                            <p className="right_images_text"> {a} </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {feild &&
              feild.map((feild_data) => {
                return (
                  <div >
                    <label htmlFor="gameTitle" className=" d-flex label_game">
                      {feild_data.label}
                    </label>
                    {feild_data.type === "textfield" ||
                    feild_data.type === "number" ? (
                      <input
                        type={feild_data.type}
                        className="game_title"
                        name={feild_data.type}
                        placeholder={feild_data.placeHolder}
                      />
                    ) : (
                      <textarea
                        rows="5"
                        cols="50"
                        className="txtField"
                        placeholder={feild_data.placeHolder}
                      ></textarea>
                    )}
                  </div>
                );
              })}

            <Container>
              {TableData?.map((_TabData, TableIndex) => {
                return (
                  <div>
                    <div style={{marginBottom:'10px'}}>{Object.keys(_TabData)[0].slice(0,1).toUpperCase()+ Object.keys(_TabData)[0].slice(1, Object.keys(_TabData)[0].length)}</div>
                    {Object.keys(_TabData).map((Tab, index) => {
                      return (
                        <div >
                          <div style={{ position: "relative", bottom: "1px" , fontSize:'10px' , marginLeft:'40px' }}>
                            Assets
                          </div>
                          <div
                            style={{
                              position: "relative",
                              bottom: "17px",
                              left: "156px",
                              fontSize:'10px'
                            }}
                          >
                            {Tab === "collectibles" ? "Score": Tab === "nonCollectibles" ? "Damage":''}
                          </div>
                          <div
                            style={{
                              position: "relative",
                              bottom: "32px",
                              left: "276px",
                              fontSize:'10px',
                              
                            }}
                          >
                            Action
                          </div>
                          {_TabData[Tab].map((table, index) => {
                            return (
                              <div>
                              <Row>
                                <Col>
                                 {table.file!==null ?<img
                                    style={{
                                      inset: "0px",
                                      boxSizing: "border-box",
                                      padding: "0px",
                                      border: "none",
                                      margin: "auto",
                                      display: "block",
                                      width: "55px",
                                      
                                      objectFit: "contain",
                                    }}
                                    src={`https://dev.breshna.io/api/uploads/${table.file}`}
                                  />:<h3 style={{textAlign:'center' , fontSize:'20px', marginTop:'17px' }}>TEXT</h3>
                          }
                                </Col>

                                <Col>
                                {table.score!==undefined || table.damage!==undefined || table.type ==='text'?
                                
                                  <div>
                                      <input
                                      style={{
                                        position: "relative",                                  
                                        background:'#1a1327',
                                        opacity: 1,
                                      }}
                                      type="number"
                                      className="Collect_feild"
                                      name="gameTitle"
                                      placeholder="Enter"
                                      defaultValue={table.scrumber}
                                    
                                    />
                                  </div>
                                  :''
                          }
                                </Col>
                                <Col>
                                {table.type && table.type ==='text' &&
                                  <button   data-bs-toggle="modal" data-bs-target={`#${Tab}`} style={{position:'relative', right:'40px', top:'20px' ,marginRight:'-40px',background:'none', border:'none'}} onClick={()=>{handleInputType('Edit')}}>< AiOutlineEdit style={{fontSize:"30px", color:'white'}} /></button>
                                }
                                  <button
                                    onClick={() =>
                                      handleDelete(table, Tab, index)
                                    }
                                    style={{
                                      background: "none",
                                      border: "none",
                                     
                                    }}
                                  >
                                    <MdOutlineCancel
                                      style={{
                                        position: "absolute",
                                        fontSize: "30px",
                                        color: "#b9036f",
                                      }}
                                    />
                                  </button>
                                </Col>
                                <hr
                                  style={{
                                    background: "rgba(123, 120, 170, 1)",
                                    border: "0.25px solid #7B78AA",
                                    width: "416px",
                                    marginLeft: "24px",
                                  }}
                                />
                              </Row>
                            
  <div class="modal fade" id={Tab} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">

    <div style={{background: '#1d2633'}}>
       <div class="modal-header border-0" style={{background: '#262350'}}>
        <h1 class="modal-title fs-5" id="exampleModalLabel" style={{color:'white'}}>{InpType} Custom Asset</h1>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
       
   
              <p style={{color:'white'}}>
                Text
              </p>
              <input
              defaultValue={TempText.text}
              onChange={(e)=>{
                let txt = Text   
                txt.text = e.target.value
                setText(txt)
              }}
                style={{ width:'100%', border:'none' , background:'#0c0b0f' , borderRadius:'5px' , height:'35px'  , color:'white', opacity:'1'}}
                type='text'
              >
              </input>
          
              <div style={{color:'white', marginTop:'10px'}}>
                Score
              </div>

              <input
              defaultValue={TempText.scrumber}
                 onChange={(e)=>{
                  let scrumber = Text
                  scrumber.scrumber = e.target.value
                  setText(scrumber)
                }}
                style={{ width:'20%', border:'none' , background:'#0c0b0f' , borderRadius:'5px' , height:'35px', color:'white', opacity:'1' }}
                min='0'
                type='number'
              >
              </input>
         

      </div>
      <div class="modal-footer border-0">
      <button type="button" class="btn btn-primary " data-bs-dismiss="modal" style={{width:'100%' , background:'#8b3dff' ,border:'none'}} onClick={()=>handleText(TableIndex, Tab, InpType,index )}>{InpType} Asset</button>
      </div>
      </div>
   
    </div>
  </div>
</div>                        
                            </div>
                            );
                          })}

                          <div
                            style={{ marginBottom: "30px" }}
                            className="btn-group d-flex justify-content-center"
                          >
                            <button 
                              className="purple_cta"
                              style={{
                                width: "85px",
                                height: "32px",
                                marginRight: "10px",
                                padding: "5px",
                                fontSize: "12px",
                              }}
                            >
                              {" "}
                              Add Asset
                            </button>
                            {Tab === "collectibles" | Tab === "nonCollectibles" ?
                            <button
                            onClick={()=>{handleInputType('Add')}}
                              data-bs-toggle="modal" data-bs-target={`#${Tab}`}
                              className="purple_cta"
                              style={{
                                width: "128px",
                                height: "32px",
                                padding: "5px",
                                fontSize: "12px",
                              }}
                            >
                              {" "}
                              Add Custom Text
                            </button>
                            :''
                    }
                          </div>

                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </Container>
            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor_Setting;
