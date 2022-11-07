import React from 'react';
import '../style/TopBar.css'
import { BsCloudUploadFill } from "react-icons/bs"
import {AiOutlineUserAdd} from "react-icons/ai"
import {FaShare} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"

const Top = () => {
    return ( 
        <div className='nav'> 
            <div className='navContainer'>

                 
  
                <div style={{marginRight:'230px'}}>
                <button className='navButton' style={{backgroundColor:'#ce2877'}}><BsCloudUploadFill style={{verticalAlign: 'middle' , marginRight:'5px'}}/>Publish</button>
                <button className='navButton' style={{backgroundColor:'#8b3dff'}}><FaShare style={{verticalAlign: 'middle' , marginRight:'5px'}}/>Share</button>
                <button className='navButton' style={{backgroundColor:'#ce2877'}}><AiOutlineUserAdd style={{verticalAlign: 'middle' , marginRight:'5px'}}/>Collaborate</button>
                </div>
                
            </div>
        </div>
     );
}
 
export default Top;