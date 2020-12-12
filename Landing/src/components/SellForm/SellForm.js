import React from 'react';
import { Container, Row, Col, Card, FormInput, CardBody, CardHeader, InputGroup, InputGroupAddon, InputGroupText} from 'shards-react';
import NavBar from '../NavBar/NavBar';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ContactModal from './ContactModal/ContactModal';

export default class SellForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {brand: null, model: null, km: null, owners: 0, validPapers: null, validInsurance: null, accident: null, type: null, images: null, price: null, year: null}
        this.onFileChange = this.onFileChange.bind(this);
    }
    handleBrandChange = (event) => {
        this.setState({brand: event.target.value})
    }
    handleModelChange = (event) => {
        this.setState({model: event.target.value})
    }
    handleKMChange = (event) => {
        this.setState({km: event.target.value})
    }
    handleChangeOwners = (event) => {
        this.setState({owners: event.target.value}) 
      };
    handleChangePapers = (event) => {
        this.setState({validPapers: event.target.value});
      };
    handleChangeInsurance = (event) => {
        this.setState({validInsurance: event.target.value});
      };
    handleChangeAccident = (event) => {
        this.setState({accident: event.target.value});
      };
    handleChangeType = (event) => {
        this.setState({type: event.target.value});
      };
    handlePriceChange = (event) => {
        this.setState({price: event.target.value})
    }
    onFileChange(e) {
        this.setState({ images: e.target.files })
    }
    handleYearChange = (event) => {
        this.setState({year: event.target.value})
    }

    render(){
        return(
            <div>
                <NavBar/>
                <Container style={{marginBottom: '2%'}}>
                    <Row>
                        <Col sm="12" md="4" lg="3">
                        </Col>
                        <Col sm="12" md="4" lg="6">
                            <Card style={{marginTop: '5%'}}>
                                <CardHeader style={{textAlign: 'center', fontSize: '1.2em', fontWeight: 'bold'}}>Get quoted for your vehicle!</CardHeader>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <TextField id="standard-basic" label="Brand" onChange={this.handleBrandChange}/>
                                        </Col>
                                        <Col>
                                            <TextField id="standard-basic" label="Model" onChange={this.handleModelChange}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <TextField id="standard-basic" label="KM Driven" onChange={this.handleKMChange}/>
                                        </Col>
                                        <Col>
                                        <TextField id="no_of_owners" select label="Owners" onChange={this.handleChangeOwners} helperText = "No. of Owners" style={{width: '100%'}}>
                                            <MenuItem key="1" value={"1"}>
                                                {"1"}
                                            </MenuItem>
                                            <MenuItem key="2" value={"2"}>
                                                {"2"}
                                            </MenuItem>
                                            <MenuItem key="3" value={"3"}>
                                                {"3"}
                                            </MenuItem>
                                        </TextField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <TextField id="valid_Papers" select label="Papers" onChange={this.handleChangePapers} helperText = "All Papers Valid" style={{width: '100%'}}>
                                            <MenuItem key="Yes" value={"Yes"}>
                                                {"Yes"}
                                            </MenuItem>
                                            <MenuItem key="No" value={"No"}>
                                                {"No"}
                                            </MenuItem>
                                        </TextField>
                                        </Col>
                                        <Col>
                                        <TextField id="valid_insurance" select label="Insurance" onChange={this.handleChangeInsurance} helperText = "Insurance Valid" style={{width: '100%'}}>
                                            <MenuItem key="Yes" value={"Yes"}>
                                                {"Yes"}
                                            </MenuItem>
                                            <MenuItem key="No" value={"No"}>
                                                {"No"}
                                            </MenuItem>
                                        </TextField>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                        <TextField id="accident" select label="Accident" onChange={this.handleChangeAccident} helperText = "Accident" style={{width: '100%'}}>
                                            <MenuItem key="Yes" value={"Yes"}>
                                                {"Yes"}
                                            </MenuItem>
                                            <MenuItem key="No" value={"No"}>
                                                {"No"}
                                            </MenuItem>
                                        </TextField>
                                        </Col>
                                        <Col style={{textAlign: 'center'}}>
                                            <TextField id="type" select label="Type" onChange={this.handleChangeType} helperText = "Type" style={{width: '100%'}}>
                                            <MenuItem key="Motorcycle" value={"Motorcycle"}>
                                                {"Motorcycle"}
                                            </MenuItem>
                                            <MenuItem key="Scooter" value={"Scooter"}>
                                                {"Scooter"}
                                            </MenuItem>
                                            </TextField>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop: '10px'}}>
                                        <Col style={{marginTop: '-10px'}}>
                                            <TextField id="standard-basic" label="Year of Purchase" onChange={this.handleYearChange}/>
                                        </Col>
                                        <Col>
                                            <InputGroup className="mb2">
                                                <InputGroupAddon type="prepend">
                                                    <InputGroupText>₹</InputGroupText>
                                                </InputGroupAddon>
                                                <FormInput onChange={this.handlePriceChange} placeholder = "Price"/>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'center', width: '100%'}}>
                                            <label htmlFor="images">Select Images</label>
                                            <FormInput id="images" onChange={this.onFileChange} placeholder="Upload Images" type="file" multiple/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{textAlign: 'center', marginTop: '3%'}}>
                                            <ContactModal brand={this.state.brand}  model={this.state.model} km={this.state.km} owners={this.state.owners} papers={this.state.validPapers} insurance={this.state.validInsurance} accident={this.state.accident} type={this.state.type} images={this.state.images} price={this.state.price} year={this.state.year}/>
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