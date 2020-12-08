import React from 'react';
import { Container, Row, Col, Card, FormInput, CardBody, CardHeader, Button } from 'shards-react';
import NavBar from '../NavBar/NavBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default class SellForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {owners: 0, validPapers: null, validInsurance: null, accident: null, type: null}
    }
    render(){
        const nos = ["1","2","3"]
        const choice = ["Yes", "No"]
        const type=["Motorcycle", "Scooter"]
        const handleChangeOwners = (event) => {
            this.setState({owners: event.target.value}) 
          };
        const handleChangePapers = (event) => {
            this.setState({validPapers: event.target.value});
          };
        const handleChangeInsurance = (event) => {
            this.setState({validInsurance: event.target.value});
          };
        const handleChangeAccident = (event) => {
            this.setState({accident: event.target.value});
          };
        const handleChangeType = (event) => {
            this.setState({accident: event.target.value});
          };
        return(
            <div>
                <NavBar/>
                <Container>
                    <Row>
                        <Col sm="12" md="4" lg="3">
                        </Col>
                        <Col sm="12" md="4" lg="6">
                            <Card style={{marginTop: '5%'}}>
                                <CardHeader style={{textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold'}}>Get quoted for your vehicle!</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <TextField id="standard-basic" label="Brand" />
                                        </Col>
                                        <Col>
                                            <TextField id="standard-basic" label="Model" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <TextField id="standard-basic" label="KM Driven" />
                                        </Col>
                                        <Col>
                                        <TextField id="no_of_owners" select label="Owners" onChange={handleChangeOwners} helperText = "No. of Owners" style={{width: '100%'}}>
                                        {nos.map((value, index) => (
                                            <MenuItem key={value} value={value}>
                                            {value}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <TextField id="valid_Papers" select label="Papers" onChange={handleChangePapers} helperText = "All Papers Valid" style={{width: '100%'}}>
                                        {choice.map((value, index) => (
                                            <MenuItem key={value} value={value}>
                                            {value}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                        </Col>
                                        <Col>
                                        <TextField id="valid_insurance" select label="Insurance" onChange={handleChangeInsurance} helperText = "Insurance Valid" style={{width: '100%'}}>
                                        {choice.map((value, index) => (
                                            <MenuItem key={value} value={value}>
                                            {value}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <TextField id="accident" select label="Accident" onChange={handleChangeAccident} helperText = "Accident" style={{width: '100%'}}>
                                        {choice.map((value, index) => (
                                            <MenuItem key={value} value={value}>
                                            {value}
                                            </MenuItem>
                                        ))}
                                        </TextField>
                                        </Col>
                                        <Col style={{textAlign: 'center'}}>
                                            <TextField id="type" select label="Type" onChange={handleChangeType} helperText = "Type" style={{width: '100%'}}>
                                            {type.map((value, index) => (
                                                <MenuItem key={value} value={value}>
                                                {value}
                                                </MenuItem>
                                            ))}
                                            </TextField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'center', width: '100%'}}>
                                            <label htmlFor="images">Select Images</label>
                                            <FormInput id="images" placeholder="Upload Images" type="file" multiple/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'center', marginTop: '3%'}}>
                                        <Button theme="success">Proceed</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" md="4" lg="3">
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}