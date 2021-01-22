import { useEffect, useState } from 'react'
import axios  from 'axios'
import { baseURL } from '../axios-routes'
import { Row } from 'react-bootstrap'
import TripCard from './TripCard'

import React from 'react'

export default function AllTrips() {

  const [allTrips, setAllTrips] = useState([
    // {
    //     id: 1,
    //     area: 'florentine',
    //     time: 12,
    //     store: 'AMPM',
    //     container: 'bag',
    //     quantity: 2
    //   },
    //   {
    //     id: 2,
    //     area: 'jaffa',
    //     time: 12,
    //     store: 'AMPM',
    //     container: 'bag',
    //     quantity: 3
    //   },
    //   {
    //     id: 3,
    //     area: 'tel aviv',
    //     time: 12,
    //     store: 'AMPM',
    //     container: 'bag',
    //     quantity: 1
    // }
  ])
    useEffect(() => {
      const showAllTrips = async () => {
        const res = await axios.get(`${baseURL}/api/alltrips`);
        setAllTrips(res.data);
        console.log(allTrips);
      };
      showAllTrips();
    }, []);


  return (
    <>
      <h1>All Trips</h1>
      {allTrips && (
        <Row className='m-3'>
          {allTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </Row>
      )}
    </>
  )
}
