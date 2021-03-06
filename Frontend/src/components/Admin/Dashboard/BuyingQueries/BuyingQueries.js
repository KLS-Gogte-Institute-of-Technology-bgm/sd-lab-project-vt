import React, {useState, useEffect} from 'react';
import {Col} from 'shards-react'
import BikeCard from './BikeCard/BikeCard';
import axios from 'axios';

export default function AllVehicles(){
    const [allBuyers, setAllBuyers] = useState(null)
    useEffect(() => {
        async function getAllSellers(){
            const token = await localStorage.getItem('token')
            const response = await axios.get('https://pigoapi.el.r.appspot.com/admin/getallbuyers', {
                headers: {
                    'x-auth-token': token
                }
            })
            setAllBuyers(response.data.data)
        }
        getAllSellers()
    }, [])
    return(
        <div>
        <Col></Col>
            <Col>
                <h3>Vehicle Buying Enquries</h3>
                {allBuyers ? allBuyers.map(buyer => {
                    return(<BikeCard buyer={buyer}/>)
                }): null}
            </Col>
        <Col></Col>
        </div>
        
    )
}