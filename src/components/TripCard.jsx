import React from 'react'
import { Button, Card } from 'react-bootstrap'
import TripCardModal from './TripCardModal'
import './tripCard.css'
import ListGroup from 'react-bootstrap/ListGroup'

export default function TripCard(props) {
  const [modalShow, setModalShow] = React.useState(false)

  const { id, area, time, store, quantity, name, requests } = props.trip

  const {
    requesterUser,
    accepted,
    reqDropOff,
    reqItem1,
    reqItem2,
    reqItem3,
    requestId
  } = props.trip.requests

  console.log(props.trip)
  console.log(props.trip.requests)

  return (
    <Card className='m-3 tripCard' style={{ width: '18rem' }} key={id}>
      <Card.Body>
        <Card.Title>{name}'s trip</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>Area: {area}</Card.Subtitle>
        <Card.Text>
          Store: <b>{store}</b>
        </Card.Text>
        <Card.Text>
          Time: <b>{time}</b>
        </Card.Text>
        <Card.Text>
          Able to carry: <b>{quantity}</b>
        </Card.Text>
        <Button onClick={() => setModalShow(true)} className='buttons'>
          Make a Request
        </Button>

        {requests.length > 0 && (
          <div className='div'>
            <Card.Header>Current requests</Card.Header>
            <ListGroup variant='flush'>
              {requests.map((request) => (
                <ListGroup.Item key={request.requestId}>
                  <h3>{request.requesterUser.firstname}'s request</h3>
                  <p>
                    Items requested:
                    {request.reqItem1}, {request.reqItem2}, {request.reqItem3}
                  </p>
                  <p>Dropoff Location: {request.reqDropOff}</p>
                  {request.accepted && 
                  <p> Request has been accepted</p>
                  }
                  {!request.accepted && 
                  <button>Accept this Request</button>
                  }
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
        <TripCardModal
          trip={props.trip}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Card.Body>
    </Card>
  )
}
