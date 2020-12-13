import React from "react";
import { Row, Col, Card, CardBody, CardImg, CardTitle, Button, CardFooter } from 'shards-react';
import {Link, useParams} from 'react-router-dom';

export default function BikeCard(props) {
        return(
            <Col style={{marginBottom: '2%'}}>
            <Card style={{ maxWidth: "250px" }}>
                <CardImg top src={props.image} style={{padding: '5px'}}/>
                <CardBody style={{padding: '3%'}}>
                    <CardTitle>{props.brand} {props.model} </CardTitle>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            {props.year}
                        </Col>
                        <Col>
                            {props.km} KM
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Row style={{textAlign: 'center'}}>
                        <Col>
                            <span style={{fontSize: '1em', fontWeight: 'bold', color: 'black'}}>₹ {props.price}</span>
                        </Col>
                        <Col>
                            <Link to={'/display/'+props.id} params={useParams()}><Button style={{padding: '10%'}} outline>View</Button></Link>
                        </Col>
                    </Row>
                </CardFooter>
            </Card>
        </Col>
        )
}