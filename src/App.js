import React, { useEffect, useState, createRef } from 'react'
import './App.css'
import { Nav, Navbar, Image } from 'react-bootstrap'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ModalLogIn from './components/ModalLogIn'
import ModalSignUp from './components/ModalSignUp'
import AddTrip from './components/add-trip'
import AllTrips from './components/AllTrips'
import { UserContext } from './contexts/UserContext'
import Footer from './components/Footer'
import axios from "axios";

function App() {

  const [currentUser, setCurrentUser] = useState('')

  const wrapper = createRef();

  const baseURL = "http://localhost:5000";

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setCurrentUser(foundUser)
    }
    const node = wrapper.current;
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    baseURL,
  }

  return (
    <UserContext.Provider
  value={value}
	>
      <Router>
        <div className=' container-fluid w-100  '>
          <div className='row p-5'>
            <Navbar
              bg='dark'
              variant='dark'
              className='navbar-expand-lg navbar navbar-dark bg-primary shadow-lg'
              fixed='top'
            >
              <Nav className='collapse navbar-collapse d-flex justify-content-between'>
                <Link className=' nav' to='/'>
                  Home
                </Link>
                <form className='form-inline my-2 my-lg-0 float-end'>
                  <ModalLogIn />
                  <ModalSignUp />
                </form>
              </Nav>
            </Navbar>
            <Footer />

          </div>

          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/profilesetting'></Route>
            <Route path='/add-trip'>
              <AddTrip />
            </Route>
            <Route path='/alltrips'>
              <AllTrips />
            </Route>
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  )
}

export default App
