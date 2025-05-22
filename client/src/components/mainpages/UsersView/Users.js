import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

function Users() {
  const state = useContext(GlobalState);
  const[isAdmin,setIsAdmin] = state.userAPI.isAdmin
  const [users,setUsers] = state.userAPI.users;
  
  const [token] = state.token;

  const deleteUser = async (id)=>{
    try{
      const res = await axios.delete(`http://localhost:5000/user/delete/${id}`,{
        headers: {Authorization:token}
      })
     const updateUser = users.filter(item => item._id !== id);
      setUsers(updateUser);
    }catch(err){
      alert(err)
    }
  }

  if(!isAdmin) return <Navigate to='/' />

  return (
    <div>
      <h2>View Users</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Serial No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Orders</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role == 1?'Admin':(<Link to={`/orders/${item._id}`}>View {item.order.length}</Link>)}</td>
              <td>{item.role === 1?'Admin':"User"}</td>
              <td id='delete' onClick={()=> deleteUser(item._id)}>
                Delete
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users