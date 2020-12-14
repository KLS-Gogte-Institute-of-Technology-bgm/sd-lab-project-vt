import React, {useState, useEffect} from 'react';
import {Button, Row, Col, Modal, ModalBody, ModalHeader, ModalFooter, FormInput} from 'shards-react'
import Switch from '@material-ui/core/Switch';
import AliceCarousel from 'react-alice-carousel';
import axios from 'axios'
import "./alice-carousel.css";
const handleDragStart = (e) => e.preventDefault();

export default function BikeCard(props){
    const [state, setState] = useState({checkedB: null});
    const [checkedC, setCheckedC] = useState(null)
    const [token, setToken] = useState(null)
    const [openPriceModal, setPriceModal] = useState(false)
    const [vehicle, setVehicle] = useState(null)
    const [newPrice, handlePriceChange] = useState(null)
    const [openRegistrationModal, setRegistrationModal] = useState(false)
    const [registrationNo, handleRegistrationNoChange] = useState(null)
    const [openDescriptionModal, setDescriptionModal] = useState(false)
    const [description, handleDescriptionChange] = useState(null)

    const handleChange = async(event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        await axios.post('http://localhost:4000/admin/setdisplay', {
                id: vehicle._id,
                isLiveStatus: event.target.checked
            },{
            headers: {
                'x-auth-token': token
            }})
        };

    const handleChangeC = async(event) => {
        setCheckedC(event.target.checked)
        await axios.post('http://localhost:4000/admin/setfeatured', {
            id: vehicle._id,
            isFeatured: event.target.checked
        },{
            headers: {
                'x-auth-token': token
        }})
        };

    useEffect(() => {
        async function getVehicle(){
          const response = await axios.get('http://localhost:4000/display/'+props.seller.vehicle)
          setVehicle(response.data.data[0])
          const isLive = response.data.data[0].isLive
          const isFeatured = response.data.data[0].isFeatured
          console.log(isFeatured)
          setState({checkedB: isLive})
          setCheckedC(isFeatured)
          const t = await localStorage.getItem('token')
          setToken(t)
        }
        getVehicle()
    }, [props.seller.vehicle])

    const updatePrice = () => {
        axios.post('http://localhost:4000/admin/updateprice', {
            id: vehicle._id,
            newPrice: newPrice
        },{
        headers: {
            'x-auth-token': token
        }})
        .then(() => {
            setPriceModal(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const updateRegistration = () => {
        axios.post('http://localhost:4000/admin/updateregistration', {
            id: vehicle._id,
            registrationNo: registrationNo
        },{
            headers: {
                'x-auth-token': token
        }})
        .then(() => {
            setRegistrationModal(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const updateDescription = () => {
        axios.post('http://localhost:4000/admin/updatedescription', {
            id: vehicle._id,
            description: description
        },{
            headers: {
                'x-auth-token': token
        }})
        .then(() => {
            setDescriptionModal(false)
        })
        .catch(err => {
            console.log(err)
        })
    }

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
                                    Price: Rs. {vehicle.price} <Button size="sm" style={{padding: '2px'}} onClick={() => setPriceModal(true)}>Change</Button><br/>
                                    Registration Number: {vehicle.registrationNo} <Button size="sm" style={{padding: '2px'}} onClick={() => setRegistrationModal(true)}>Add</Button><br/>
                                    Description: {vehicle.description} <Button size="sm" style={{padding: '2px'}} onClick={() => setDescriptionModal(true)}>Change</Button><br/>
                                </Col>
                                <Col>
                                    <h4>Seller Details</h4>
                                    Name: {props.seller.name} <br/>
                                    Contact Number: {props.seller.phoneNumber} <br/>
                                    City: {props.seller.city}
                                </Col>
                                <Modal open={openPriceModal}>
                                    <ModalHeader>Enter new price</ModalHeader>
                                    <ModalBody>
                                        <FormInput placeholder="Enter new price" onChange={(e) => handlePriceChange(e.target.value)}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={() => setPriceModal(false)} outline>Close</Button>
                                        <Button onClick={() => updatePrice()} theme="success">Submit</Button>
                                    </ModalFooter>
                                </Modal>
                                <Modal open={openRegistrationModal}>
                                    <ModalHeader>Enter Registration Number</ModalHeader>
                                    <ModalBody>
                                        <FormInput placeholder="Enter Registration Number" onChange={(e) => handleRegistrationNoChange(e.target.value)}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={() => setRegistrationModal(false)} outline>Close</Button>
                                        <Button onClick={() => updateRegistration()} theme="success">Submit</Button>
                                    </ModalFooter>
                                </Modal>
                                <Modal open={openDescriptionModal}>
                                    <ModalHeader>Enter Description</ModalHeader>
                                    <ModalBody>
                                        <FormInput placeholder="Enter Description" onChange={(e) => handleDescriptionChange(e.target.value)}/>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={() => setDescriptionModal(false)} outline>Close</Button>
                                        <Button onClick={() => updateDescription()} theme="success">Submit</Button>
                                    </ModalFooter>
                                </Modal>
                            </Row>
                        </Col>
                        <Col sm="12" md="4" lg="3">
                            <Row>
                                <h4>Display for Sale</h4>
                                <Switch
                                    checked={state.checkedB}
                                    onChange={handleChange}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Row>
                            <Row>
                                <h4>Featured Ad</h4>
                                <Switch
                                    checked={checkedC}
                                    onChange={handleChangeC}
                                    color="primary"
                                    name="checkedB"
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </Row>
                        </Col>
                    </Row> 
                </Col>
            </Row>
            : null}
        </div>
    )
}