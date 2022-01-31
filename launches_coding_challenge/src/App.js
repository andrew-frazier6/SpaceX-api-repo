import React, { useState, useEffect } from 'react';
import Axios from "axios";

import './App.css';


function App() {
  const [data, setData] = useState([]);

  const getData = () => {
    Axios.get(
      'https://api.spacexdata.com/v4/launches'
    )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log("there was an error", err));
  };

  useEffect(() => {
    getData();
    console.log(data)
  });

  return (
    <div className="App">
      <h1>Launches</h1>
      <div style={{ height: '100vh', width: '100vw' }}>{data.map((data, index) => {
        return (
          <li key={index}>{data.failures.length}</li>
        );
      })}</div>
    </div>
  );
}

export default App;
