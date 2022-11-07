import React from 'react'
import "../style/Comp-Bar.css"
import ImgSlider from './SubComponents/Slider';
import { BsCloudUploadFill } from "react-icons/bs"
import {ImCancelCircle} from 'react-icons/im'

const CompBar =({Expended,List ,Title ,close})=> {
  

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
        <button style={{height:'38px', background:'#8c3dff',border:"none", borderRadius:'6px', position:'relative', right:'45px', top:'19px', color:'white', width:'100px'}}>Search</button>
        </div>
        <button className='Comp-Button'><BsCloudUploadFill style={{verticalAlign: 'middle' , marginRight:'5px', marginLeft: 'auto', marginRight:'7px'}}/>Upload Avatar</button>
        
        
        <div style={{overflowX:'hidden',marginTop:'50px'}}>
      <div style={{width:'300px' , height:'60vh', marginLeft:'50px' }} >
        
      <ImgSlider Data = {List}/>
      </div>
      </div>
    </div>

    </>

  )
}
export default CompBar
