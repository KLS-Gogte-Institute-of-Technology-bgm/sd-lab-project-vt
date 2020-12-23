import React, {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import BikeCard from './BikeCard/BikeCard';
import { Container, Row, Col } from 'shards-react';
import FeaturedVehicles from './FeaturedVehicles/FeaturedVehicles'
import axios from 'axios'

export default function AllBikes(){
    const [vehicles, setVehicles] = useState(null)
    useEffect(() => {
        function getAllVehicles(){
            axios.get('http://localhost:4000/allvehicles')
            .then(resp => {
                setVehicles(resp.data.data)
            })
            .catch(err => {
                console.log("Some error has occured!")
            })
        }
        getAllVehicles()
    }, [])

    function bikeRow(vehicle){
        return(
            <Row style={{marginTop: '1.5%', marginBottom: '1%'}}>
                {vehicle.map(v => {
                    return <BikeCard id = {v._id} brand={v.brand} model={v.model} km={v.kmDriven} image={v.images[0]} price={v.price} year={v.year}/>
                })}   
            </Row>
            )
    }
        return(
            <div>
            <NavBar/>
                <Container style={{marginTop: '3%', marginBottom: '1%'}}>
                <Row>
                    <Col sm="12" md="4" lg="1">
                    </Col>
                    <Col sm="12" md="4" lg="10">
                        <FeaturedVehicles/>
                    </Col>
                    <Col sm="12" md="4" lg="1">
                    </Col>
                </Row>
                <Row>
                    <Col sm="12" md="4" lg="1">
                    </Col>
                    <Col sm="12" md="4" lg="10">
                    {vehicles ?
                        vehicles.map(vehicle => {
                            return(bikeRow(vehicle))
                        })
                    : null}
                    </Col>
                    <Col sm="12" md="4" lg="1">
                    </Col>
                </Row>
                </Container>
            </div>
        )
}