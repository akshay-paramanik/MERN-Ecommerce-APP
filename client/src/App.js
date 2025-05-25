import React from 'react'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import {BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import React, { useContext } from 'react';

function App() {
  const state = useContext(DataProvider);
  const [loading] = state.loading;

  if (loading) {
    return <h2 style={{ textAlign: "center", padding: "20px" }}>Loading...</h2>;
  }

  return (
    <DataProvider>
    <Router>
    <div className='App'>
      <Header/>
      <Pages/>
    </div>
    </Router>
    </DataProvider>
  )
}

export default App
