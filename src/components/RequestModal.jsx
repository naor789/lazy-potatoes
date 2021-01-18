import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'


export default function RequestModal(props) {
    
  const { id, area, time, store, quantity } = props.trip

  const [reqItem1, setReqItem1] = useState('')
  const [reqItem2, setReqItem2] = useState('')
  const [reqItem3, setReqItem3] = useState('')
  const [reqDropOff, setReqDropOff] = useState('')
  const [error, setError] = useState(false)

  function sendRequest() {
    if (!reqItem1 || !reqDropOff) {
      setError(true)
      return
    }
    const requestObject = {
      tripId: id,
      reqItem1,
      reqItem2,
      reqItem3,
      reqDropOff
    }
    console.log(requestObject)
    props.onHide()
  }

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Alert
        show={error}
        variant='danger'
        onClose={() => setError(false)}
        dismissible
      >
        <Alert.Heading>
            Oh no! You got an error 🙀
        </Alert.Heading>
        <p>
          You must fill out at least one requested item and your informaiton in
          order to send a request...
        </p>
      </Alert>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Make a Request for this trip!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>This user is willing to carry {quantity} items</h4>

        <p>Please state the Items you need</p>
        <input
          type='string'
          name='reqItem1'
          onChange={(e) => setReqItem1(e.target.value)}
        />
        <input
          type='string'
          name='reqItem2'
          onChange={(e) => setReqItem2(e.target.value)}
        />
        <input
          type='string'
          name='reqItem3'
          onChange={(e) => setReqItem3(e.target.value)}
        />

        <p>Drop Off Location</p>
        <input
          type='string'
          name='reqDropOff'
          onChange={(e) => setReqDropOff(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={sendRequest}>Send Request</Button>
      </Modal.Footer>
    </Modal>
  )
}
