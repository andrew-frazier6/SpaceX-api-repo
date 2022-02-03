import React, { useState } from 'react';
import './styles.css'

export const Rocket = ({ data }) => {

    const [randomNumber, setRandomNumber] = useState(0);
    const [randomShip, setRandomShip] = useState([]);

    const getShip = () => {
        setRandomNumber(Math.floor(Math.random() * (151)));
        setRandomShip(data[`${randomNumber}`]);
    };

    return (
        <>
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
        </>
    )
}
