import React from "react";
import { Row, Col, Card, CardBody, CardImg, CardTitle, Button, CardFooter } from 'shards-react';

export default class BikeCard extends React.Component {
    render(){
        return(
            <Col style={{marginBottom: '2%'}}>
            <Card style={{ maxWidth: "250px" }}>
                <CardImg top src="https://place-hold.it/300x200"/>
                <CardBody style={{padding: '3%'}}>
                    <CardTitle>Bike Name</CardTitle>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            2013
                        </Col>
                        <Col>
                            23000KM
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <span style={{fontSize: '1em', fontWeight: 'bold', color: 'black'}}>Rs 60000</span>
                        </Col>
                        <Col>
                            <Button style={{padding: '10%'}} outline>View</Button>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </Col>
        )
    }
}