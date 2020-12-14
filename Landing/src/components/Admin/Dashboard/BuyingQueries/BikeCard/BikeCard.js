import React, {useState, useEffect} from 'react';
import {Row, Col} from 'shards-react'
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'
import "./alice-carousel.css";
const handleDragStart = (e) => e.preventDefault();

export default function BikeCard(props){
    const [vehicle, setVehicle] = useState(null)


    useEffect(() => {
        async function getVehicle(){
            console.log(props.buyer)
          const response = await axios.get('http://localhost:4000/display/'+props.buyer.vehicle)
          setVehicle(response.data.data[0])
        }
        getVehicle()
    }, [props.buyer.vehicle])

    return(
        <div>
            {vehicle ? 
            <Row>
                <Col style={{width: '100%', marginBottom: '5%'}}>
                    <Row style={{padding: '20px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}}>
                        <Col sm="12" md="4" lg="3">
                        <AliceCarousel mouseTracking disableDotsControls={true}>
                                        {vehicle.images.map(link => {
                                            return(<img src = {link} onDragStart={handleDragStart} alt={vehicle.brand} style={{width: '100%', height: '100%'}}/>)
                                        })}
                                    </AliceCarousel>
                        </Col>
                        <Col sm="12" md="4" lg="6">
                            <Row>
                                <Col>
                                    <h4>Bike Details</h4>
                                    Brand: {vehicle.brand} <br/>
                                    Model: {vehicle.model} <br/>
                                    KM: {vehicle.kmDriven} KM <br/>
                                    Owners: {vehicle.owners} <br/>
                                    Papers: {vehicle.papers} <br/>
                                    Insurance: {vehicle.insurance} <br/>
                                    Accident: {vehicle.accident} <br/>
                                    Type: {vehicle.type} <br/>
                                    Price: Rs. {vehicle.price} <br/>
                                    Registration Number: {vehicle.registrationNo} <br/>
                                    Description: {vehicle.description} <br/>
                                </Col>
                                <Col>
                                    <h4>Seller Details</h4>
                                    Name: {props.buyer.name} <br/>
                                    Contact Number: {props.buyer.phoneNumber} <br/>
                                    City: {props.buyer.city}
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="12" md="4" lg="3">
                        </Col>
                    </Row> 
                </Col>
            </Row>
            : null}
        </div>
    )
}