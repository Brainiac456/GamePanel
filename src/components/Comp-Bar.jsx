import React from 'react'
import "../style/Comp-Bar.css"
import ImgSlider from './SubComponents/Slider';
import { BsCloudUploadFill } from "react-icons/bs"
import {ImCancelCircle} from 'react-icons/im'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const CompBar =({Expended,subtypes,assetsType ,Title,hasFrame ,close})=> {
  console.log('Frame', hasFrame)
  const [apiCall , setApiCall]= useState(null);
  const [typeAll , setTypeAll] = useState();
  const [limit , setLimit ] = useState(10);
  const [viewIndex , setViewIndex ] = useState()

  const fetchData = async () => {
   let Api = subtypes?.map( (sub) =>{
    return axios.get(`https://dev.breshna.io/api/assets?assetTypeId=${assetsType}&templateId=62d654ff301b4243bb87ffb1&assetSubType=${sub}&limit=${limit}`)
   }
 )
 await axios.all(Api).then(axios.spread((...responses) => {  
  let Arr =[]
  responses.map(resp=>{
    Arr.push(resp.data)
  })
  setTypeAll(Arr)
      console.log(typeAll)

})).catch(errors => {
})

   } 

  useEffect(()=>{ 
  fetchData() 
  },[])

  useEffect(()=>{
    fetchData() 
  },[limit])

  const handleLimit = (index)=>{
    setViewIndex(index)
    setLimit(20)

  }


  return (
    <>    
    
    <div className ={Expended ===false?'CompBar':'CompBar active'}>

       <button onClick={(e)=>close(e)}  style={{float:'right', border:'none', backgroundColor:'transparent', color:'white', marginTop:'10px'}}><ImCancelCircle style={{fontSize:'20px'}}/></button>
       <div className='Compbar-title'>{Title}</div>

       <div style={{display:'flex'}}>
         <form>
          <input 
              type="text"
              name="Search"
               placeholder="Search "
             />           
              </form>
              <button style={{height:'38px', background:'#8c3dff',border:"none", borderRadius:'6px', position:'relative', right:'5%', top:'19px', color:'white', width:'100px'}}>Search</button>
          </div>
           {hasFrame===false|| hasFrame===undefined &&
              <button className='Comp-Button'><BsCloudUploadFill style={{verticalAlign: 'middle' , marginLeft: 'auto', marginRight:'7px'}}/>Upload</button>
          }
        
          <div style={{marginTop:'50px'}}>
      <div style={{width:'409px' , height:'60vh', marginLeft:'27px',overflowX:'hidden' }} >

     
        <ImgSlider Data = {typeAll} limit = {handleLimit}  view= {viewIndex} />
 
  
      </div>
      </div>
    </div>

    </>

  )



  
}
export default CompBar
