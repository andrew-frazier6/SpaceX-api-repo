import React, { useState, useEffect } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { Text } from '@visx/text';
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
        console.log(data)
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

  const width = 600;
  const half = width / 2;

  return (
    <div className="App">
      {/* HOME */}
      <div className='page-container'>
        <div className='sky'>
          <div className='stars'>
            <h1 style={{ color: 'white', textDecoration: 'underline', margin: '2.5%' }}>Space X Launches</h1>
            <ul className='launches-list'>{data.map((data, index) => {
              return (
                <ul className="launches-item" key={index}>{data.name} - {data.date_utc.slice(0, 10)}</ul>
              );
            })}</ul>
          </div>
        </div>
      </div>
      <div className='page-container2'>
        <div className='sky'>
          <div className='stars'>
            <div className='pie-chart-container'>
              <svg width={width} height={width} >
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
                      // console.log(active)
                      const size = active === data.result ? 20 : 12;
                      return half - size;
                    }}
                    padAngle={0.01}>
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

                  {active ? (
                    <>
                      <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                        {modeledData.total}
                      </Text>

                      <Text
                        textAnchor="middle"
                        fill={active.color}
                        fontSize={20}
                        dy={20}
                      >
                        {`${active.total} ${active.result}`}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                        {`${Math.floor(modeledData[0].total / 152 * 100)}%`}
                      </Text>

                      <Text textAnchor="middle" fill="#aaa" fontSize={20} dy={20}>
                        {`${data.length} total launches`}
                      </Text>
                    </>
                  )}
                </Group>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;