import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState';
import { Navigate } from 'react-router-dom';

function CatagoryAPI(token) {
 
    const[catagory,setCatagory] = useState([]);

    const getCatagory = async ()=>{
        const res = await axios.get('http://localhost:5000/api/catagory');
        // console.log(res.data);
        
        setCatagory(res.data);
    }
    const createCatagoryOfItem = async ({name})=>{
      try{
            await axios.post('http://localhost:5000/api/catagory',{name},{
                headers: { Authorization: token }
            },{
                withCredentials:true
            });
            await getCatagory();
            alert("Catagory Added")

        }catch(err){
            alert("server error");
        }
    }

    useEffect(()=>{
        getCatagory();
    },[])
    

  return {
    catagory : [catagory,setCatagory],
    createCatagoryOfItem:createCatagoryOfItem
  }
}

export default CatagoryAPI
