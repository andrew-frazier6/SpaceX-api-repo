import React from 'react'
import './styles.css'
import { LaunchList } from './LaunchList/LaunchList';

export const LaunchContent = ({ data }) => {

    let today = new Date();

    return (
        <div>
            <h1 className='main-title-header'>{`Launches as of ${today}`.slice(0, 30)}</h1>
            <LaunchList data={data} />
        </div >
    )
}
