// GlobalState.js
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import ProductAPI from "./api/ProductAPI";
import UserAPI from "./api/UserAPI";
import CatagoryAPI from "./api/CatagoryAPI";
import configURL from './configURL';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [loading, setLoading] = useState(true); // ✅ new loading state

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${configURL}/user/refresh_token`, {
        withCredentials: true,
      });
      setToken(res.data.accesstoken);
    } catch (err) {
      console.log("Token refresh failed");
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) {
      refreshToken();
    } else {
      setLoading(false); // ✅ if not logged in, stop loading
    }
  }, []);

  const state = {
    token: [token, setToken],
    loading: [loading, setLoading], // ✅ add loading to global state
    productsAPI: ProductAPI(),
    userAPI: UserAPI(token),
    catagoryAPI: CatagoryAPI(token),
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  );
};
