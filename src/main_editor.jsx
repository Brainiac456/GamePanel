import React, {useEffect,useState} from 'react'
import SideNav from "./components/side-navBar";
import Top from "./components/top-navBar";
import Editor_Setting from './components/editor_setting';
import axios from 'axios';
import { DataContext } from './Helper/context';
import _ from 'lodash'

const Main_Editor =()=> {
  const [Data , setData] = useState()
  const [ImageData , setImageData] = useState()
  const [ContainerData, setContainerData] = useState()
  const [levels , setLevels] = useState()

  const [TableData , setTableData] = useState()
 

  const [assets , setAssets] = useState()
  const [tableName , setTableName] = useState()

  const fetchData=async()=>{
    await axios.get("https://dev.breshna.io/api/game_templates/628cb173fdd0331e553ecd93")
     .then((response)=>{
   
       setData(response.data.data)
       setLevels(response.data.data.levels[0])
       setAssets(response.data.data.game_config.assets)
       console.log('assets',response.data.data)
     })
     .catch(error=>console.error(`Error: $(error)`))
 
   }




   useEffect(()=>{

    let temp2 = []

        if(levels !== undefined){
          let temp= assets.map(_levels =>{ 
            if(_levels.assetBox === true)
               return _levels.assetTypeName
          })
                temp= temp.filter(cur => cur);

          setContainerData([...temp])
      
          const temp3 = temp.map((_data)=>{

       return  [{ [_data] : levels[_data] }]
     
        })

        setImageData([...temp3])
      
        }
   
    
   },[levels])

   useEffect(()=>{

    fetchData()


   },[])

   useEffect(()=>{



     if(assets !==undefined){     
   
      let temp= assets.map(_levels =>{ 
      if(_levels.isMulti === true)
         return _levels.assetTypeName
    })
          temp= temp.filter(cur => cur);
         
     setTableName([...temp])
   let temp2 = Object.keys(levels).map(_levels=>{

       if(temp.includes(_levels))
       {
       return  [{ [_levels] : levels[_levels] }]
       }
      })  
      temp2= temp2.filter(cur => cur);
      temp2 =  _.flatten(temp2);
        setTableData(temp2)
      
    

      }
   },[assets])
 

    return (
        <div >
        <DataContext.Provider value= {{Image_data:{ImageData , setImageData}
                                       ,container_data:{ContainerData, setContainerData} 
                                       ,TabData:{TableData , setTableData} 
                                       ,TabName: {tableName, setTableName}
                                        }}>
        <Top/>
        <SideNav Data={Data}/>
        <Editor_Setting Data = {Data}/>
        </DataContext.Provider>
      </div>
    )

}

export default Main_Editor