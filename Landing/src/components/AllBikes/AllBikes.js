import React from "react";
import NavBar from "../NavBar/NavBar";
import BikeCard from './BikeCard/BikeCard';
import { Container, Row, Col } from 'shards-react';

export default class AllBikes extends React.Component {
    render(){
        function bikeRow(){
            return(
                <Row style={{alignItems: 'center', marginTop: '1.5%', marginBottom: '1%'}}>
                        <Col>
                            <Row>
                                <BikeCard/>
                                <BikeCard/>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <BikeCard/>
                                <BikeCard/>
                            </Row>
                        </Col>
                    </Row>
            )
        }
        return(
            <div>
            <NavBar/>
                <Container style={{marginTop: '3%', marginBottom: '1%'}}>
                   {bikeRow()}
                </Container>
            </div>
        )
    }
}