import React, {useState, useEffect} from 'react';
import {Col} from 'shards-react'
import BikeCard from './BikeCard/BikeCard';
import axios from 'axios';

export default function AllVehicles(){
    const [allSellers, setAllSellers] = useState(null)
    useEffect(() => {
        async function getAllSellers(){
            const token = await localStorage.getItem('token')
            const response = await axios.get('http://localhost:4000/admin/getallsellers', {
                headers: {
                    'x-auth-token': token
                }
            })
            setAllSellers(response.data.data)
        }
        getAllSellers()
    }, [])
    return(
        <div>
        <Col></Col>
            <Col>
                <h3>All Vehicles and Selling Enquiries</h3>
                {allSellers ? allSellers.map(seller => {
                    return(<BikeCard seller={seller}/>)
                }): null}
            </Col>
        <Col></Col>
        </div>
        
    )
}