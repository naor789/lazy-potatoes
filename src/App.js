import React, { useEffect, useState } from 'react'
import './App.css'
import { Nav, Navbar, Image, Container } from 'react-bootstrap'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import ModalLogIn from './components/ModalLogIn'
import ModalSignUp from './components/ModalSignUp'
import AddTrip from './components/add-trip'
import AllTrips from './components/AllTrips'
import { UserContext } from './contexts/UserContext'
import Footer from './components/Footer'

export const baseURL = "http://localhost:5000";
 

function App() {

  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user')
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser)
      setCurrentUser(foundUser)
    }
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
  }

  return (
    <UserContext.Provider
	value={value}
	>
      <Router>
        <div className=' container-fluid w-100 '>
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
                <Link className=' nav' to='/alltrips'>
                  All Trips
                </Link>
                <form className='form-inline my-2 my-lg-0 float-end'>
                  <ModalLogIn />
                  <ModalSignUp />
                </form>
              </Nav>
            </Navbar>
          </div>
            <Footer />


          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
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
