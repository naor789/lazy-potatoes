import React from "react";
// import imgA from "../img/imgA.png";
// import imgD from "../img/imgD.png";
import AllTrips from "./AllTrips";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const { currentUser } = useContext(UserContext);
//   const url = "http://localhost:3000/";
  
  return (
    <div className="container homePage"
      >

      <h1 className="home-heading">Welcome {currentUser.firstName}</h1>
      <p className="home-text">
        There are many variations of passages of Lorem Ipsum available,
        <br />
        but the majority have suffered alteration in some form, by injected
        <br /> humour, or randomised words which don't look even slightly <br />
        believable. If you are going to use a passage of Lorem Ipsum, <br />
        you need to be sure there isn't anything embarrassing <br />
        hidden in the middle of text.{" "}
      </p>
      {/* <span>
        <img src={imgA} alt="man and a woman" className="imgA" width="70%" />
      </span>
      <span>
        <img src={imgD} alt="man and a woman" className="imgD" width="70%" />
      </span> */}
      <Link to="/alltrips">
        <Button className="home-button-all"> All trips </Button>
      </Link>
      <Link to="/add-trip">
        <Button className="home-button-new"> Add a new trip </Button>
      </Link>
    </div>
  );
}
