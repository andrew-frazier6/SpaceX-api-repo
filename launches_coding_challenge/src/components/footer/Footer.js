import React from 'react'
import './styles.css'

export const Footer = () => {

    let newDay = new Date();

    return (
        <div>
            <ul className='footer-list'>
                <li className='footer-list-item'>{`${newDay}`.slice(0, 15)}</li>
                <li className='footer-list-item'>
                    <a className="hyperLink" href="https://github.com/r-spacex/SpaceX-API">SpaceX Launch API</a>
                </li>
                <li className='footer-list-item'>Andrew Frazier</li>
            </ul>
        </div>
    )
}
