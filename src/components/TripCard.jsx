import React from 'react'
import Button from 'react-bootstrap/Button'
import RequestModal from './RequestModal'

export default function TripCard(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const { id, area, time, store, container, quantity } = props.trip

  return (
    <div className='tripCard' style={{ width: '18rem' }} key={id}>
      <div>
        <h2>Area: {area}</h2>
        <p>Time: {time}</p>
        <p>Store {store}</p>
        <p>
          Able to carry {quantity} {container}
        </p>
        <Button onClick={() => setModalShow(true)}>Make a Request</Button>
      </div>
      <RequestModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}
