import React, { useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
// import { Text } from '@visx/text';
import Axios from "axios";
import './App.css';

function App() {
  const [data, setData] = useState([]);
  const [modeledData, setModeledData] = useState([])
  const [active, setActive] = useState(null);

  const getData = () => {
    Axios.get(
      'https://api.spacexdata.com/v4/launches'
    )
      .then((res) => {
        setData(res.data);
        setModeledData(
          [{
            result: "Success",
            total: res?.data?.filter(data => data.success).length,
            color: "#25744c"
          },
          {
            result: "Failure",
            total: res?.data?.filter(data => !data.success).length,
            color: "#a91114"
          }]
        )
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getData();
  }, []);

  const width = 300;
  const half = width / 2;

  return (
    <div className="App">
      <h1>Launches</h1>
      <svg className='pie-chart' >
        <Group top={half} left={half}>
          <Pie
            data={modeledData}
            pieValue={((data) => {
              const failures = data?.result === 'Failure' ? data.total : 0;
              const success = data?.result === 'Success' ? data.total : 0;
              return success + failures;
            })}
            outerRadius={half}
            innerRadius={({ data }) => {
              console.log(active)
              const size = active === data.result ? 14 : 8;
              return half - size;
            }}
            padAngle={0.007}>
            {(pie) => {
              return pie.arcs.map((arc) => {
                return (
                  <g key={arc.data.result} style={{ cursor: 'pointer' }} onMouseEnter={() => setActive(arc.data.result)}
                    onMouseLeave={() => setActive(null)}>
                    <path d={pie.path(arc)} fill={arc.data.color}></path>
                  </g>
                )
              })
            }}
          </Pie>
        </Group>
      </svg>
      <div style={{ height: '100vh', width: '100vw' }}>{data.map((data, index) => {
        return (
          <li key={index}>{data.name}</li>
        );
      })}</div>
    </div>
  );
}

export default App;