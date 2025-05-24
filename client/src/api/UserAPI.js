import React, { useEffect, useState } from 'react';
import axios from 'axios';
import configURL from '../configURL';

const UserAPI = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [users,setUsers] = useState([]);
    const [order,setOrder] = useState([]);
    const [currentUser,setCurrentUser] = useState([]);

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get(`${configURL}/user/infor`, {
                        headers: { Authorization: token }
                    });

                    setIsLogged(true);
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

                    setCart(res.data.cart)
                    setCurrentUser(res.data);
                    

                    if(res.data.role === 1){
                        findUser();
                    }

                } catch (err) {
                    alert(err.response.data.msg);
                }
            };
            getUser();

        }
    }, [token]);


    

    const addCart = async (product) => {
    if (!isLogged) return alert("Please log in first.");

    try {
        const res = await axios.patch(`${configURL}/user/addcart`,
            { product },
            { headers: { Authorization: token } }
        );

        // ✅ Update local cart with the latest one from the server
        setCart(res.data.cart);

    } catch (err) {
        alert(err.response.data.msg);
    }
};

const findUser = async ()=>{
    try{
        const res = await axios.get(`${configURL}/user/viewusers`,{
            headers:{Authorization: token}
        })
        setUsers(res.data);
        console.log(res.data);
        
        
    }catch(err){
        alert("users nhi mil rha hai");
    }
}




const orders = async (orderItems, formData)=>{
    if (!isLogged) return alert("Please log in first.");
    try{
        await axios.patch('http://localhost:5000/user/order', {
    cart: orderItems,
    address: formData.address,
    totalAmount: formData.totalAmount
  }, {
    headers: { Authorization: token }
  });
  alert("Thank you")
        
    }catch(err){
        alert("error in find order");
    }
}

const removeFromCart = async (id)=>{
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);

    // sync with backend
    await axios.patch(`${configURL}/user/remove_cart`,{cart:updatedCart},{
        headers:{Authorization:token}
    })

}




    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart:[cart,setCart],
        addCart: addCart,
        addOrder:orders,
        order:[order,setOrder],
        users:[users,setUsers],
        removeFromCart : removeFromCart,
        currentUser: [currentUser,setCurrentUser]
    };
};

export default UserAPI;
