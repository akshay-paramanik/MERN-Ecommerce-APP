import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CatagoryAPI() {
    const[catagory,setCatagory] = useState([]);

    const getCatagory = async ()=>{
        const res = await axios.get('http://localhost:5000/api/catagory');
        // console.log(res.data);
        
        setCatagory(res.data);
    }

    useEffect(()=>{
        getCatagory();
    },[])
    

  return {
    catagory : [catagory,setCatagory]
  }
}

export default CatagoryAPI