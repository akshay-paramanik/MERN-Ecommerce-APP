import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import CreateCatagory from "./CreateCatagory";
import axios from "axios";

function ViewCatagory() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [catagory, setCatagory] = state.catagoryAPI.catagory;

  const [updateCat, setUpdateCat] = useState({ name: "" });
  const [editId, setEditId] = useState(null); 

  const catagoryDelete = async (id) => {
    try {
      const updatedCatagory = catagory.filter((item) => item._id !== id);
      setCatagory(updatedCatagory);

      await axios.delete(`http://localhost:5000/api/catagory/${id}`, {
        withCredentials: true,
        headers: { Authorization: token },
      });
    } catch (err) {
      alert("Problem deleting category");
    }
  };

  const catagoryEdit = (ctgry) => {
    setEditId(ctgry._id);
    setUpdateCat({ name: ctgry.name });
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/catagory/${id}`, updateCat, {
        withCredentials: true,
        headers: { Authorization: token },
      });

      const updated = catagory.map((item) =>
        item._id === id ? { ...item, name: updateCat.name } : item
      );
      setCatagory(updated);
      setEditId(null);
    } catch (err) {
      alert("Edit error");
    }
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateCat({ ...updateCat, [name]: value });
  };

  return (
    <div className="catagory-container">
  <h1 className="catagory-heading">All Categories</h1>
  <ul className="catagory-list">
    {catagory.map((ctgry) => (
      <li key={ctgry._id} className="catagory-item">
        <div className="catagory-item-name">{ctgry.name}</div>

        {editId === ctgry._id && (
          <form className="catagory-form" onSubmit={(e) => handleSubmit(e, ctgry._id)}>
            <input
              type="text"
              name="name"
              placeholder="Enter category name"
              onChange={handleUpdate}
              value={updateCat.name}
              required
              className="catagory-input"
            />
            <button type="submit" className="catagory-button catagory-update-button">
              Update
            </button>
            <button type="button" onClick={() => setEditId(null)} className="catagory-button catagory-cancel-button">
              Cancel
            </button>
          </form>
        )}

        {editId !== ctgry._id && (
          <div style={{ marginTop: '10px' }}>
            <button onClick={() => catagoryDelete(ctgry._id)} className="catagory-button catagory-delete-button">
              Delete
            </button>
            <button onClick={() => catagoryEdit(ctgry)} className="catagory-button catagory-edit-button">
              Edit
            </button>
          </div>
        )}
      </li>
    ))}
  </ul>

  <h2 className="catagory-subheading">Create Categories</h2>
  <CreateCatagory />
</div>

  );
}

export default ViewCatagory;
