import React, {useState, useEffect} from 'react';
import NavBar from '../NavBar/NavBar';
import { Container, Row, Col, Card, CardTitle, CardBody, CardSubtitle, CardFooter } from 'shards-react';
import { useParams} from 'react-router-dom'
import Paper from '@material-ui/core/Paper';
import ContactModal from './ContactModal/ContactModal';
import AliceCarousel from 'react-alice-carousel';
import "./alice-carousel.css";
import axios from 'axios';

const handleDragStart = (e) => e.preventDefault();

export default function DisplayBike() {
        let {id} = useParams()
        const [vehicle, setVehicle] = useState(null)
        const [error, setError] = useState(null)
        
        useEffect(() => {
            function fetchVehicle(){
                axios.get('http://localhost:4000/display/'+id)
                .then(response => {
                    setVehicle(response.data.data[0])
                    console.log(vehicle)
                })
                .catch(err => {
                    setError("Some error has occured!")
                })
            }
            fetchVehicle()
        }, [])

        
        return(
            <div>
                <NavBar/>
                {vehicle ? 
                <Container style={{marginBottom: '4%'}}>
                    <Row style={{marginTop: '20px', marginBottom: '-5px'}}><h2>Used {vehicle.brand} {vehicle.model}</h2></Row>
                    <Row>
                        <Col sm="12" lg="6" style={{marginTop: '2%'}}>
                        <Row>
                            <Col sm="12" md="3">
                            </Col>
                            <Col sm="12" md="6" lg="12">
                                <Paper elevation={3} style={{height: '100%', width: '100%'}}>
                                    <AliceCarousel mouseTracking disableDotsControls={true}>
                                        {vehicle.images.map(link => {
                                            return(<img src = {link} onDragStart={handleDragStart} alt={vehicle.brand} style={{width: '100%', height: '100%'}}/>)
                                        })}
                                    </AliceCarousel>
                                </Paper>
                            </Col>
                            <Col sm="12" md="3">
                            </Col>
                        </Row>
                        </Col>
                        <Col sm="12" lg="6" style={{textAlign: 'center', marginTop: '2%'}}>
                            <Card>
                                <CardTitle style={{textAlign: 'left', marginTop: '5%',marginLeft: '5%', fontSize: '25px'}}>{vehicle.brand} {vehicle.model}</CardTitle>
                                <CardSubtitle style={{textAlign: 'left',marginLeft: '5%', marginTop: '1%'}}>{vehicle.year}</CardSubtitle>
                                <CardBody style={{textAlign: 'left'}}>
                                    <h6>Details:</h6>
                                    <table style={{width: '100%'}}>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>Brand</td>
                                        <td>{vehicle.brand}</td>
                                        <td style={{fontWeight: 'bold'}}>Model</td>
                                        <td>{vehicle.model}</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>KM Driven</td>
                                        <td>{vehicle.kmDriven}</td>
                                        <td style={{fontWeight: 'bold'}}>Owner</td>
                                        <td>{vehicle.owners}</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>Papers Valid</td>
                                        <td>{vehicle.papers}</td>
                                        <td style={{fontWeight: 'bold'}}>Insurance Valid</td>
                                        <td>{vehicle.insurance}</td>
                                    </tr>
                                    </table>
                                    <hr/>
                                    <span style={{fontWeight: 'bold'}}>Description - </span>
                                </CardBody>
                                <CardFooter>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h4>Rs. {vehicle.price}</h4>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <ContactModal vehicle={vehicle}/>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                 : null }
            </div>
        )
}