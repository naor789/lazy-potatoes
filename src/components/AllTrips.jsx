import { useEffect, useState } from 'react'
import { axios } from 'axios'
import { baseURL } from '../axios-routes'
import { ListGroup, Button, ListGroupItem } from 'react-bootstrap'
import TripCard from './TripCard'

import React from 'react'

export default function AllTrips() {

  const [allTrips, setAllTrips] = useState([{
        id: 1,
        area: 'florentine',
        time: 12,
        store: 'AMPM',
        container: 'bag',
        quantity: 2
      },
      {
        id: 2,
        area: 'florentine',
        time: 12,
        store: 'AMPM',
        container: 'bag',
        quantity: 2
      },
      {
        id: 3,
        area: 'florentine',
        time: 12,
        store: 'AMPM',
        container: 'bag',
        quantity: 2
      }])

  return (
    <>
      <h1>All Trips</h1>
      {allTrips && (
        <div className='tripList'>
          {allTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      )}
    </>
  )
}
