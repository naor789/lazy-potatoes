import React from 'react'
import backgroundD from '../img/backgroundD.png'
import AllTrips from './AllTrips';


export default function Home() {

    return (
        <>
            <div className="container homePage">
                {/* <h1 className="welcome">HOME </h1> */}
                <span><img src={backgroundD} alt="man and a woman" className="img" width="80%" /></span>
            </div>

        </>
    )
}
