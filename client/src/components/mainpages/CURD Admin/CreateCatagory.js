import axios from 'axios';
import React, { useContext, useState } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Navigate } from 'react-router-dom';

function CreateCatagory() {
     const state = useContext(GlobalState);
     const [token] = state.token;
     const [catagory, setCatagory] = state.catagoryAPI.catagory;
     const createCatagoryOfItem = state.catagoryAPI.createCatagoryOfItem;
    const[isAdmin,setIsAdmin] = state.userAPI.isAdmin
    const[isLogged,setIsLogged] = state.userAPI.isLogged
    const[newCatagory,setNewCatagory] = useState({
        name:''
    })

    if(!isAdmin && !isLogged){
        return(
            <Navigate to='/' />
        )
    }

    const onInputChange = (e)=>{
        const {name,value} = e.target;
        setNewCatagory({...newCatagory, [name]:value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        createCatagoryOfItem(newCatagory)
        
    }
    
  return (
    <div>
        <form className="catagory-form" onSubmit={handleSubmit}>
            <input type='text' className="catagory-input" name='name' placeholder='Enter catagory name' onChange={onInputChange} value={newCatagory.name} required />
            <input className='catagory-button catagory-update-button' type='submit' value='Create Catagory'/>
        </form>
    </div>
  )
}

export default CreateCatagory