import React, {useState, useEffect} from 'react';
import { Button,Nav, NavItem, NavLink, Container, NavbarBrand } from 'shards-react';
import {Redirect} from 'react-router-dom'
import AllVehicles from './AllVehicles/AllVehicles'
import BuyingQueries from './BuyingQueries/BuyingQueries';

export default function Dashboard(){
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [notLoggedIn, setNotLoggedIn] = useState(null)
    const [showAllVehicles, setAllVehicles] = useState(true)
    const [buyingQueries, setBuyingQueries] = useState(false)
    useEffect(() => {
        async function checkLoggedIn(){
            const token = await localStorage.getItem('token')
            if(token){
                setIsLoggedIn(true)
            } else {
                setNotLoggedIn(true)
            }
        }
        checkLoggedIn()
    })
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setNotLoggedIn(true)
    }
    const NavBar = () =>{
        return (
            <Nav type="dark">
            <NavbarBrand style={{color: 'black'}}>PIGO Admin</NavbarBrand>
              <NavItem>
                <NavLink active onClick={() => setAllVehicles(!showAllVehicles)}>
                    All Vehicles
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => setAllVehicles(!showAllVehicles)}>
                    Buying Enquiries
                </NavLink>
              </NavItem>
              <NavItem style={{textAlign: 'right'}}>
                <NavLink>
                    <Button onClick={handleLogout}>Logout</Button>
                </NavLink>
              </NavItem>
            </Nav>
          );
    }
    return(
        <div>
            {isLoggedIn ? 
                <div>
                    <Container>
                        {NavBar()}
                        {showAllVehicles ? <AllVehicles/> : <BuyingQueries/>}
                    </Container>
                </div>
            : null }
            {notLoggedIn? <Redirect to='/admin/login'/>:null}
        </div>
    )
}