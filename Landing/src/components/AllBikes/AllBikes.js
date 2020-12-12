import React, {useEffect, useState} from "react";
import NavBar from "../NavBar/NavBar";
import BikeCard from './BikeCard/BikeCard';
import { Container, Row, Col } from 'shards-react';
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
        // function bikeRow(vehicle){
        //     return(
        //     <Row style={{alignItems: 'center', marginTop: '1.5%', marginBottom: '1%'}}>
        //         {vehicle.map(v => {
        //             //bikeCol(v)
        //             return(
        //                 <Col>
        //                     <Row>
        //                         <BikeCard brand={v.brand} model={v.model} km={v.kmDriven} image={v.images[0]} price={v.price}/>
        //                     </Row>
        //                 </Col>
        //             )  
        //         }) } 
        //     </Row>
        //     )
        // }
        function bikeRow(vehicle){
                return(
                    <Row style={{alignItems: 'center', marginTop: '1.5%', marginBottom: '1%'}}>
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
                   {vehicles ?
                        vehicles.map(vehicle => {
                            return(bikeRow(vehicle))
                        })
                    : null}
                </Container>
            </div>
        )
}