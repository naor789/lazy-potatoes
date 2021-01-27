import React from "react";
// import imgA from "../img/imgA.png";
// import imgD from "../img/imgD.png";
import AllTrips from "../components/AllTrips/AllTrips";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const { currentUser } = useContext(UserContext);
  //   const url = "http://localhost:3000/";

  return (
    <div className="container homePage">
      <Row>
        <h1 className="home-heading">Welcome {currentUser.firstName}</h1>
      </Row>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          <p className="home-text">
            Welcome to our platform. Here, you can post your trips to the
            makolet, ask a neighbor to bring you something from teh makolet if
            you are in potatoe-mode, through a simple point system.
          </p>
        </Col>
        <Col md="4"></Col>
      </Row>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          <h4>How does it work? </h4>
          <p>
            When you sign up, you are awarded 20 points. <br />
            Every time you ask for something, you give that person point, and
            every time you bring something to a potatoe, you earn points.
          </p>
        </Col>
        <Col md="4"></Col>
      </Row>
      <Row>
        <Col md="4"></Col>
        <Col md="4">
          <Link to="/alltrips">
            <Button className="home-button m-4"> All trips </Button>
          </Link>
          <Link to="/add-trip">
            <Button className="home-button m-4"> Add a new trip </Button>
          </Link>
        </Col>
        <Col md="4"></Col>
      </Row>
    </div>
  );
}
