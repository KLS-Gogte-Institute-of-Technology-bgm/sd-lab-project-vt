import React, {useState, useEffect} from 'react';
import {Button, Container, Row, Col} from 'shards-react'
import Switch from '@material-ui/core/Switch';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'
import "./alice-carousel.css";
const handleDragStart = (e) => e.preventDefault();

export default function BikeCard(props){
    const [state, setState] = useState({checkedB: null});
    const [vehicle, setVehicle] = useState(null)
    const handleChange = async(event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    await axios.post('http://localhost:4000/admin/setdisplay', {
        id: vehicle._id,
        isLiveStatus: event.target.checked
    })
    };
    useEffect(() => {
        async function getVehicle(){
          const response = await axios.get('http://localhost:4000/display/'+props.seller.vehicle)
          setVehicle(response.data.data[0])
          const isLive = response.data.data[0].isLive
          setState({checkedB: isLive})
        }
        getVehicle()
    }, [props.seller.vehicle])
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
                                </Col>
                                <Col>
                                    <h4>Seller Details</h4>
                                    Name: {props.seller.name} <br/>
                                    Contact Number: {props.seller.phoneNumber} <br/>
                                    City: {props.seller.city}
                                </Col>
                            </Row>
                        </Col>
                        <Col sm="12" md="4" lg="3">
                        <h4>Display for Sale</h4>
                        <Switch
                            checked={state.checkedB}
                            onChange={handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                        </Col>
                    </Row> 
                </Col>
            </Row>
            : null}
        </div>
    )
}