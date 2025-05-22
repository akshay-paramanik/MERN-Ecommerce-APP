import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { Link, Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ChangeStatus from './ChangeStatus';
function ViewOrders() {

  const state = useContext(GlobalState);
  const [token] = state.token;
  const[isAdmin,setIsAdmin] = state.userAPI.isAdmin
  const[isLogged,setIsLogged] = state.userAPI.isLogged
  const [users,setUsers] = state.userAPI.users;
  const [order,setOrder] = state.userAPI.order;
  const [currentUser,setCurrentUser] = state.userAPI.currentUser;
  const params = useParams();

 const selectedUser = users.find(user => user._id === params.id);

if (!isLogged) return <Navigate to='/login' />;

return (
  <>
    {selectedUser && selectedUser.order.length > 0 ? (
      selectedUser.order.map((order, orderIndex) => (
        <div key={orderIndex}>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Total:</strong> Rs. {order.totalAmount}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Date:</strong> {order.orderedAt ? new Date(order.orderedAt).toLocaleString() : "N/A"}</p>
          <h1>Change Status</h1>
          {isAdmin && <ChangeStatus userId={selectedUser._id} orderIndex={orderIndex} token={token} />}

          {order.items.map((item, index) => (
            <div className='detail' key={index}>
              <div className='product_detail_img'>
                <img src={item.images} alt='' />
              </div>
              <div className='box_detail'>
                <div className='row'>
                  <h2>{item.title}</h2>
                  <h6>{item.product_id}</h6>
                </div>
                <span>${item.price}</span>
                <p>{item.description}</p>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      ))
    ) : (
      <div>
        {
          isAdmin ? 'Not ordered yet':''
        }
        </div>
    )}

    {/* User section if not admin */}
    {!isAdmin && currentUser?.order?.length > 0 ? (
      <div style={{ marginTop: "30px" }}>
        <h2>Your orders:</h2>
        {currentUser.order.map((order, index) => (
          <div key={index}>
            <p>Status: {order.status}</p>
            <p>Total: Rs. {order.totalAmount}</p>
            <p>Order Date: {order.orderedAt ? new Date(order.orderedAt).toLocaleString() : "N/A"}</p>
            {order.items.map((item, i) => (
              <div className='detail' key={i}>
                <div className='product_detail_img'>
                  <img src={item.images} alt='' />
                </div>
                <div className='box_detail'>
                  <div className='row'>
                    <h2>{item.title}</h2>
                    <h6>{item.product_id}</h6>
                  </div>
                  <span>${item.price}</span>
                  <p>{item.description}</p>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
            <hr />
          </div>
        ))}
      </div>
    ):(
      <div>
        {
          !isAdmin ? <Link to='/'>Please order now</Link>:''
        }
        </div>
    )
    
    }
  </>
);


}

export default ViewOrders