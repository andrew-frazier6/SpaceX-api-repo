import React, { useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
import Axios from "axios";

import './App.css';


function App() {
  const [data, setData] = useState([]);
  const pieData = [{
    "success": 147
  }, {
    "failure": 5
  }];

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
  }, []);

  const width = 300;
  const half = width / 2;

  return (
    <div className="App">
      <h1>Launches</h1>
      <svg className='pie-chart' >
        <Group top={half} left={half}>
          <Pie
            data={pieData}
            // pieValue={(data) => (data.failure / data.success) * 100}
            pieValue={pieData.length}
            outerRadius={half}
            innerRadius={half - 8}
            padAngle={0.1}>
          </Pie>
        </Group>
      </svg>
      <div style={{ height: '100vh', width: '100vw' }}>{data.map((data, index) => {
        return (
          <li key={index}>{data.failures.length}</li>
        );
      })}</div>
    </div>
  );
}

export default App;
