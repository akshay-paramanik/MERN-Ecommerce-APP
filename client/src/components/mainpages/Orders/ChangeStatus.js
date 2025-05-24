import React, { useContext, useState } from 'react'
import axios from 'axios'
import { GlobalState } from '../../../GlobalState';
import { Navigate } from 'react-router-dom';
import configURL from '../../../configURL';

function ChangeStatus({ userId, orderIndex, token }) {
  const state = useContext(GlobalState)
  const[isAdmin,setIsAdmin] = state.userAPI.isAdmin
  const [changeStatus, setChangeStatus] = useState({
    statusChange: 'Ordered'
  });

  const handleChangeStatus = (e) => {
    const { name, value } = e.target;
    setChangeStatus({ ...changeStatus, [name]: value });
  };

  const onSubmitStatus = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`${configURL}/user/updatestatus/${userId}`, {
        statusChange: changeStatus.statusChange,
        orderIndex: orderIndex
      }, {
        headers: { Authorization: token }
      });

      alert(res.data.msg);
      window.location.reload()
    } catch (err) {
      alert(err.response?.data?.msg || "Something went wrong");
    }
  };

  if(!isAdmin){
    return <Navigate to='/' />
  }

  return (
    <div>
      <form onSubmit={onSubmitStatus}>
        <select name='statusChange' value={changeStatus.statusChange} onChange={handleChangeStatus}>
          <option value="Ordered">Ordered</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
        <input type='submit' value="Change" />
      </form>
    </div>
  );
}

export default ChangeStatus;
