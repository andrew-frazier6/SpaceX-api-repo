import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';
import { Footer } from './components/Footer/Footer';
import { FaRocket } from "react-icons/fa";
import { Earth } from './components/Earth/Earth'
import { LaunchContent } from './components/LaunchListContent/LaunchContent';
import { PieChart } from './components/PieChart/PieChart'
import { FaChevronCircleDown } from "react-icons/fa";
import { Rocket } from './components/Rocket/Rocket'


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
      <div className='section-1'>
        <div className='sky-section-1'>
          <div className='stars'>
            <LaunchContent data={data} />
            <div className='bounce'>
              <FaChevronCircleDown />
            </div>
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
            <div className='action-container'>
              <div className='bounce' >
                <FaChevronCircleDown />
              </div>
              <div className='data-list-main-container'>
                <Rocket data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-4'>
        <div className='sky-section-4'>
          <div className='stars'>
            <div className='earth-container'>
              <div className='earth-rocket'>
                <FaRocket style={{
                  height: '100%',
                  width: '100%'
                }} className='bounce' />
              </div>
              <Earth />
              <div className='footHolder'>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;