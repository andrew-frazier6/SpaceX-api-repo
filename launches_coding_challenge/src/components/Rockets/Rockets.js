import React, { useMemo } from 'react';
import './styles.css'

export const Rockets = ({ data }) => {

    // console.log(data[149].upcoming)

    return (
        <div className='rockets-container'>
            {data.upcoming === 'true' ? data.map((upcoming, index) => {
                return (
                    <div rocket-div>
                        <div className='rocket-inner-div'
                            key={index}
                            alt="hello"
                        >{upcoming.name}</div>
                    </div>
                )
            })
                : 'error'
            }

            {/* <div rocket-div>
                <img alt='i suck' id="rocket" src="https://cdn4.iconfinder.com/data/icons/whsr-january-flaticon-set/512/rocket.png"></img>
            </div> */}
        </div>
    )
}
