import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Form, Button, Col } from "react-bootstrap";
import TripCard from "../TripCard/TripCard";
import { areas } from "../Add-Trip/add-trip";
import { baseURL } from "../../App";
import "./allTrips.css";

export default function AllTrips() {
  const [allTrips, setAllTrips] = useState([]);
  const [showAllTrips, setShowAllTrips] = useState([]);
  const [areaTrips, setAreaTrips] = useState([]);
  const [searchArea, setSearchArea] = useState();

  // const handleSearch = async event => {
  // 	event.preventDefault();
  // 	setSearchArea(searchArea);
  // 	const res = await axios.get(
  // 		`http://localhost:5000/api/alltrips/search?area=${searchArea}`
  // 	);
  // 	setAreaTrips(res.data);
  // 	console.log(areaTrips);
  // }; 
	

  const handleSearch = async (event) => {
    event.preventDefault();
    // const newSearch = {
    //   searchArea: searchArea,
    // };
    const res = await axios.get(
      `http://localhost:5000/api/alltrips/search?area=${searchArea}`
    );
    setAllTrips(res.data);
  };

  useEffect(() => {
    const showAllTrips = async () => {
      const res = await axios.get(`${baseURL}/api/alltrips`);
		setAllTrips(res.data);
		setShowAllTrips(allTrips.reverse());
    };
    showAllTrips();
  }, []);

  // const handleSearch = async e => {
  // 	e.preventDefault();
  // 	setSearchArea(searchArea);
  // 	const newSearch = { searchArea: searchArea };
  // 	const res = await axios.get(`${baseURL}/api/alltrips`);
  // 	setAllTrips(res.data);
  // 	console.log(newSearch);
  // 	const result = allTrips.area.filter(newSearch);
  // 	// setAreaTrips(searchArea.filter(area));
  // 	console.log(result);
  // };

  return (
    <>
      <div className="container mb-5 ">
        <h1>Available Trips</h1>

        <Form>
          <Form.Group controlId="searchArea">
            <Row className="justify-content-md-center">
              <Col xs lg="2"></Col>
              <Col md="auto">
                <Form.Control
                  aria-label="Choose your area"
                  style={{ width: "200px" }}
                  as="select"
                //   defaultValue="choose area"
                  value={searchArea}
                  required
                  onChange={(e) => setSearchArea(e.target.value)}
                >
                  {areas.map((area) => (
                    <option key={area.id} area={{ area }}>
                      {area}
                    </option>
                  ))}
                </Form.Control>
              </Col>
              <Col md="auto">
                <Button
                  className="searchBtn"
                  onClick={handleSearch}
                  type="submit"
                >
                  Search
                </Button>
              </Col>
              <Col xs lg="2"></Col>
            </Row>
          </Form.Group>
        </Form>
        {allTrips && (
          <Row className="m-3">
            {allTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </Row>
        )}
        {showAllTrips && (
          <Row className="m-3">
            {showAllTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </Row>
        )}
      </div>
    </>
  );
}
