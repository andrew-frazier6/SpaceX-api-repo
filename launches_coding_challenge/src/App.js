import React, { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';
import { Footer } from './components/Footer/Footer';
import { Earth } from './components/Earth/Earth'
import { LaunchContent } from './components/LaunchListContent/LaunchContent';
import { PieChart } from './components/PieChart/PieChart'
import { FaChevronCircleDown } from "react-icons/fa";


function App() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState(null);
  const [randomNumber, setRandomNumber] = useState(0);
  const [randomShip, setRandomShip] = useState([]);


  const getData = () => {
    Axios.get(`${process.env.REACT_APP_BASE_API_URL}/launches`)
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => getData(), []);

  console.log(data)

  const getShip = () => {
    setRandomNumber(Math.floor(Math.random() * (151)));
    setRandomShip(data[`${randomNumber}`]);
  };

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
                {randomShip.length === 0 ? '' : <img style={{ maxHeight: '320px' }} alt='please' src={randomShip.links.patch.small}></img>}
                <div className='searchButton' onClick={() => {
                  getShip()
                }}> Search Random Ship</div>
                {randomShip.length < 1 ? '' : <>
                  <h1 style={{ color: 'orange' }}>{randomShip.name}</h1>
                  <div className='details-flexBox-container'>
                    <div className='details-bubbles'><h3 className='details-headers'>Flight #</h3>{randomShip.flight_number}</div>
                    <div className='details-bubbles'><h3 className='details-headers'>ID</h3>{randomShip.id}</div>
                    <div className='details-bubbles'><h3 className='details-headers'>Details</h3>{randomShip.details === null ? 'Upcoming Flight' : randomShip.details}</div>
                  </div>
                </>}
              </div>
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
          </div>
        </div>
      </div>


    </div >
  );
}

export default App;