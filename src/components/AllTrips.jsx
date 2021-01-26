import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../axios-routes";
import { Row } from "react-bootstrap";
import TripCard from "./TripCard";
import React from "react";

export default function AllTrips() {
  const [allTrips, setAllTrips] = useState([]);
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
