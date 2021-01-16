import React from 'react'
import './App.css';
import { Nav, Navbar, Image } from "react-bootstrap";
import Home from './components/Home';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ModalLogIn from './components/ModalLogIn';
import ModalSignUp from './components/ModalSignUp';

// import logo from "./img/logo.png";


function App() {



  return (
    <Router>
      <div className=" container-fluid w-100  ">
        <div className="row p-5">
          <Navbar bg="dark" variant="dark" className="navbar-expand-lg navbar navbar-dark bg-primary shadow-lg" fixed="top">
            <Nav className="collapse navbar-collapse d-flex justify-content-between">
              {/* <Image src={logo} alt="logo-nav" width="4%"></Image> */}
              <Link className=" nav" to="/">Home</Link>
              <Link className=" nav" to="/profilesetting">Profile Setting</Link>
              <Link className=" nav" to="/mypets">My Pets</Link>
              <form className="form-inline my-2 my-lg-0 float-end">
                <ModalLogIn />
                <ModalSignUp />
              </form>
            </Nav>
          </Navbar>
        </div>

        <Switch>
          <Route exact path="/">
            <Home ></Home>
          </Route>
          <Route path="/profilesetting">
          </Route>
          <Route path="/mypets">
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
