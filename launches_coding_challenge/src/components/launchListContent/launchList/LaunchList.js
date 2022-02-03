import React from 'react'
import './styles.css';

export const LaunchList = ({ data }) => {

    return (
        <div>
            <ul className='launches-list'>{data.map((data, index) => {
                return (
                    <ul className="launches-item" key={index}>{data.name} - {data.date_utc.slice(0, 10)}</ul>
                );
            })}</ul>
        </div>
    )
}
