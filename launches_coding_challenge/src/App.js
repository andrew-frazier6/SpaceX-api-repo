import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Earth } from './components/Earth/Earth'
import { LaunchContent } from './components/LaunchListContent/LaunchContent';
import { PieChart } from './components/PieChart/PieChart'
import { Rockets } from './components/Rockets/Rockets'


function App() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);

  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASE_API_URL}/launches`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getData(), []);
  console.log(data)

  return (
    <div className="App">
      <div className='section-1'>
        <div className='sky-section-1'>
          <div className='stars'>
            <Header />
            <LaunchContent data={data} />
          </div>
        </div>
      </div>
      <div className='section-2'>
        <div className='sky-section-2'>
          <div className='stars'>
            <PieChart
              chartData={data}
              setData={setData}
              active={active}
              setActive={setActive} />
          </div>
        </div>
      </div>
      <div className='section-3'>
        <div className='sky-section-3'>
          <div className='stars'>
            <div className='rockets-outer-div'>
              <Rockets data={data} />
            </div>
          </div>
        </div>
      </div>
      <div className='section-4'>
        <div className='sky-section-4'>
          <div className='stars'>
            <div className='earth-container'>
              <Earth />
              <div className='footHolder'>
                <Footer />
              </div>
            </div>
            {/* <RocketContent rocketData={data}/> */}

          </div>
        </div>
      </div>


    </div >
  );
}

export default App;