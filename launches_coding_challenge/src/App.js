import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import PieChart from './components/pieChart/PieChart'
import Axios from "axios";
import LaunchContent from './components/launchListContent/LaunchContent';


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

  return (
    <div className="App">
      <div className='page-container'>
        <div className='sky'>
          <div className='stars'>
            <Header />
            <LaunchContent data={data} />
          </div>
        </div>
      </div>
      <PieChart
        data={data}
        setData={setData}
        modelData={modeledData}
        setModelData={setModeledData}
        active={active}
        setActive={setActive} />
      <Footer />
    </div >
  );
}

export default App;