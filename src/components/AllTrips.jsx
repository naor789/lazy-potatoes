import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Form, Button } from "react-bootstrap";
import TripCard from "./TripCard";
import React from "react";
import { areas } from "./add-trip"
import { baseURL } from "../App";


export default function AllTrips() {
  const [allTrips, setAllTrips] = useState([]);
  const [areaTrips, setAreaTrips] = useState([])
    const [searchArea, setSearchArea] = useState();


  useEffect(() => {
    const showAllTrips = async () => {
      const res = await axios.get(`${baseURL}/api/alltrips`);
      setAllTrips(res.data);
    };
    showAllTrips();
  }, []);

      const handleSearch = async (event) => {
        event.preventDefault();
        const newSearch = {
          searchArea: searchArea,
        };
        const res = await axios.get(
          `http://localhost:5000/api/trips/search?area=${searchArea}`
        );
        setAreaTrips(res.data);
      };


  return (
    <>
      <Form>
        <Form.Group controlId="Type">
          <Form.Label className="mt-1">Area</Form.Label>
          <Form.Control
            as="select"
            defaultValue="Glilot"
            value={searchArea}
            required
            //   name="type"
            onChange={(e) => setSearchArea(e.target.value)}
          >
            {areas.map((area) => (
              <option key={area.id} area={{ area }}>
                {area}
              </option>
            ))}
            <Button
              onClick={handleSearch}
              // className="button w-100"
              type="submit"
            ></Button>
          </Form.Control>
        </Form.Group>
      </Form>
      <div className="container mb-5 ">
        <h1>All Trips</h1>
        {allTrips && (
          <Row className="m-3">
            {allTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </Row>
        )}
      </div>
    </>
  );
}
