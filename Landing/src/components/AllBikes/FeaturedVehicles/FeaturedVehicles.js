import React, {useEffect, useState} from "react";
import classes from './FeaturedVehicles.module.css';
import BikeCard from '../BikeCard/BikeCard';
import axios from 'axios'

export default function FeaturedVehicles(props){
    const [vehicles, setVehicles] = useState(null)
    useEffect(() => {
        function getAllVehicles(){
            axios.get('http://localhost:4000/allfeatured')
            .then(resp => {
                if(resp.data.data[0]){
                    setVehicles(resp.data.data)
                } else {
                    setVehicles(null)
                }
            })
            .catch(err => {
                console.log("Some error has occured!")
            })
        }
        getAllVehicles()
    }, [])

    return(
        <div>
            { vehicles ? 
            <div className={classes.box}>
                <span style={{fontSize: '18px', fontWeight: 'bold', marginLeft: '5%'}}>{}Featured Vehicles <span>🔥</span></span>
                <div style={{width: '80%', marginLeft: '10%', overflowX: 'scroll', overflowY: 'hidden', whiteSpace: 'nowrap'}}>
                    <div className={classes.scrollingWrap}>
                    {vehicles ?
                        vehicles.map(v => {
                            return(<div class={classes.card}><BikeCard id = {v._id} brand={v.brand} model={v.model} km={v.kmDriven} image={v.images[0]} price={v.price} year={v.year}/></div>)
                        })
                    : null}
                    </div>
                </div>
            </div>
            : null}
        </div>
    )
}