import { useState } from "react";
import { Form, Button , Variant , Alert} from "react-bootstrap";
import newTrip from "../axios-routes";

const AddTrip = () => {
	const [time, setTime] = useState();
	const [date, setDate] = useState();
  const [store, setStore] = useState();
  const [quantity, setQuantity] = useState();
  const [container, setContainer] = useState();
  const [area, setArea] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    const addTrip = {
      area: area,
		time: time,
	  date: date,
      store: store,
      container: container,
      quantity: quantity,
    };
    // newTrip(addTrip);
  };

  return (
      <div className="container w-50">
        <Form onSubmit={handleSubmit}>
          <Form.Group id="area">
            <Form.Label>Area</Form.Label>
            <Form.Control
              type="text"
              value={area}
              required
              onChange={(e) => setArea(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="time">
            <Form.Label>When?</Form.Label>
            <Form.Control
              type="time"
              value={time}
              required
              onChange={(e) => setTime(e.target.value)}
				  />
				  </Form.Group>
					            <Form.Group id="date">
            <Form.Label>choose a day</Form.Label>
            <Form.Control
              type="date"
              value={date}
              required
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="store">
            <Form.Label>Where?</Form.Label>
            <Form.Control
              type="text"
              value={store}
              required
              onChange={(e) => setStore(e.target.value)}
            />
          </Form.Group>
          <Form.Group id="quantity" inline>
            <Form.Label>How many items are you willing to shlep?</Form.Label>
            <Form.Control
              type="number"
              value={quantity}
              max={3}
              required
              inline
              onChange={(e) => setQuantity(e.target.value)}
            />
            {quantity > 3 && (
              <Alert variant="danger">can't add more than 3 items!</Alert>
            )}
          </Form.Group>
          <Button
            onClick={handleSubmit}
            className="button mt-3"
            type="submit"
            disabled={true}>
            Submit
          </Button>
        </Form>
      </div>
  );
};

export default AddTrip;
