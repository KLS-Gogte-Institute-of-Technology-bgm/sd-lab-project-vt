import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Container, Row, Col, Card, CardTitle, CardBody, Button, CardSubtitle, CardFooter } from 'shards-react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AliceCarousel from 'react-alice-carousel';
import "./alice-carousel.css";

const handleDragStart = (e) => e.preventDefault();


export default class DisplayBike extends React.Component {
    render(){
        return(
            <div>
                <NavBar/>
                <Container>
                    <Row>
                        <Col sm="12" lg="6" style={{marginTop: '2%'}}>
                        <Row>
                            <Col sm="12" md="3">
                            </Col>
                            <Col sm="12" md="6" lg="12">
                                <Paper elevation={3}>
                                    <AliceCarousel mouseTracking disableDotsControls={true}>
                                        <img src = 'https://picsum.photos/id/1018/650/450/' onDragStart={handleDragStart}/>
                                        <img src = 'https://picsum.photos/id/1015/650/450/' onDragStart={handleDragStart}/>
                                        <img src = 'https://picsum.photos/id/1019/650/450/' onDragStart={handleDragStart}/>
                                    </AliceCarousel>
                                </Paper>
                            </Col>
                            <Col sm="12" md="3">
                            </Col>
                        </Row>
                        </Col>
                        <Col sm="12" lg="6" style={{textAlign: 'center', marginTop: '2%'}}>
                            <Card>
                                <CardTitle style={{textAlign: 'left', marginTop: '5%',marginLeft: '5%', fontSize: '25px'}}>Bike Name</CardTitle>
                                <CardSubtitle style={{textAlign: 'left',marginLeft: '5%', marginTop: '1%'}}>2007</CardSubtitle>
                                <CardBody style={{textAlign: 'left'}}>
                                    <h6>Details:</h6>
                                    <table style={{width: '100%'}}>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>Brand</td>
                                        <td>Bajaj</td>
                                        <td style={{fontWeight: 'bold'}}>Model</td>
                                        <td>Avenger</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>KM Driven</td>
                                        <td>16000</td>
                                        <td style={{fontWeight: 'bold'}}>Owner</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>Papers Valid</td>
                                        <td>Yes</td>
                                        <td style={{fontWeight: 'bold'}}>Insurance Valid</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td style={{fontWeight: 'bold'}}>Accident</td>
                                        <td>No</td>
                                    </tr>
                                    </table>
                                    <hr/>
                                    <span style={{fontWeight: 'bold'}}>Description - </span>
                                </CardBody>
                                <CardFooter>
                                    <Row>
                                        <Col style={{textAlign: 'left'}}>
                                            <h4>Price</h4>
                                        </Col>
                                        <Col style={{textAlign: 'right'}}>
                                            <Button primary>Contact Us</Button>
                                        </Col>
                                    </Row>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}