import React, { useState, useEffect } from 'react';
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import Axios from "axios";
import { LaunchContent } from './components/LaunchListContent/LaunchContent';
import { PieChart } from './components/PieChart/PieChart'


function App() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);

  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASE_API_URL}/launches`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getData(), []);

  return (
    <div className="App">
      <div className='page-1'>
        <div className='sky'>
          <div className='stars'>
            <Header />
            <LaunchContent data={data} />
          </div>
        </div>
      </div>
      <div className='page-2'>
        <div className='sky'>
          <div className='stars'>
            <PieChart
              chartData={data}
              setData={setData}
              active={active}
              setActive={setActive} />
          </div>
        </div>
      </div>
      <div className='page-3'>
        <div className='sky'>
          <div className='stars'>
            {/* <RocketContent rocketData={data}/> */}

            <Footer />

          </div>
        </div>
      </div>


    </div >
  );
}

export default App;