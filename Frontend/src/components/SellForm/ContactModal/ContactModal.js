import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Row, Col, FormInput } from "shards-react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';


export default class BasicModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "", phoneNumber: "", city: "", open: false, openOtp: false, otpMessageText: "", otpMessage: false, sessionID: null, otp: "", thankYouModal: false, isLoading: false };
    this.toggle = this.toggle.bind(this);
    this.toggleOtp = this.toggleOtp.bind(this);
    this.thankYouToggle = this.thankYouToggle.bind(this)
  }

  toggle() {
    this.setState({
      open: !this.state.open
    });
  }
  thankYouToggle() {
    this.setState({open: false,thankYouModal: !this.state.thankYouModal})
  }
  toggleOtp() {
    this.setState({
      openOtp: !this.state.openOtp
    });
    axios.get('https://2factor.in/API/V1/47bfce72-412d-11eb-83d4-0200cd936042/SMS/'+this.state.phoneNumber+'/AUTOGEN')
      .then(resp => {
        if(resp.data.Status == "Success"){
          this.setState({otpMessageText: "OTP has been sent successfully!", otpMessage: true, sessionID: resp.data.Details})
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  handleNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  handlePhoneNumberChange = (event) => {
    this.setState({phoneNumber: event.target.value})
  }

  handleCityChange = (event) => {
    this.setState({city: event.target.value})
  }

  handleOtpChange = (event) => {
    this.setState({otp: event.target.value})
  }
  
  submit = () => {
    this.setState({isLoading: true})
    console.log(this.props.images)
    axios.get('https://2factor.in/API/V1/47bfce72-412d-11eb-83d4-0200cd936042/SMS/VERIFY/'+this.state.sessionID+'/'+this.state.otp)
      .then(resp => {
        if(resp.data.Status == "Success"){
          this.setState({otpMessageText: "OTP Verified!"})
          let formData = new FormData();
          for (const key of Object.keys(this.props.images)) {
              formData.append('images', this.props.images[key])
            }
          formData.append('name', this.state.name)
          formData.append('phoneNumber', this.state.phoneNumber)
          formData.append('city', this.state.city)
          formData.append('brand', this.props.brand)
          formData.append('model', this.props.model)
          formData.append('kmDriven', this.props.km)
          formData.append('owners', this.props.owners)
          formData.append('papers', this.props.papers)
          formData.append('insurance', this.props.insurance)
          formData.append('accident', this.props.accident)
          formData.append('type', this.props.type)
          formData.append('price', 0)
          formData.append('year', this.props.year)
          formData.append('isLive', false)
          axios.post("https://pigoapi.el.r.appspot.com/upload", formData, {
          }).then(res => {
              this.setState({openOtp: false, open: false, thankYouModal: true})
          })
        }
      })
      .catch(err => {
        this.setState({otpMessageText: "Incorrect OTP or something went wrong! Please try again!"})
      })
    }

  render() {
    const { open, openOtp, thankYouModal } = this.state;
    console.log(process.env.OTP_API)
    return (
      <div>
        <Button onClick={this.toggle} theme='success'>Proceed</Button>
        <Modal open={open} toggle={this.toggle}>
          <ModalHeader>👋 Enter your details</ModalHeader>
          <ModalBody>
            <Row>
                <Col sm="12" md="4" lg="2">
                </Col>
                <Col sm="12" md="4" lg="8">
                    <TextField required id="standard-required" onChange={this.handleNameChange} label="Name" helperText="Your Name" style={{width: '100%'}}/>
                    <TextField required id="standard-required" onChange={this.handlePhoneNumberChange} label="Phone Number" helperText="Your Phone Number" style={{width: '100%'}}/>
                    <TextField required id="standard-required" onChange={this.handleCityChange} label="City" helperText="Your City" style={{width: '100%'}}>
                      <MenuItem key="Belgaum" value="Belgaum">{"Belgaum"}</MenuItem>
                    </TextField>
                </Col>
                <Col sm="12" md="4" lg="2">  
                </Col>
            </Row>
            <Button theme="info" onClick={this.toggleOtp}>Verify</Button>
          </ModalBody>
        </Modal>


        <Modal open={openOtp} toggle={this.toggleOtp} style={{height: '10%', width: '10%'}}>
          <ModalHeader>Enter the OTP sent to your mobile number</ModalHeader>
          <ModalBody>
            <Row>
              <Col>
                <FormInput onChange={this.handleOtpChange} placeholder="OTP" />
              </Col>
              <Button theme="success" onClick={() => {this.submit()}}>Submit</Button>
            </Row>
            {this.state.otpMessage ? <Row style={{textAlign: 'center', padding: '3px', marginLeft:'5%'}}>{this.state.otpMessageText}</Row> : null}
            {this.state.isLoading?<Row style={{textAlign:'center'}}><Col><CircularProgress /></Col></Row>:null}
          </ModalBody>
        </Modal>


        <Modal open={thankYouModal} toggle={this.thankYouToggle} style={{height: '10%', width: '10%'}}>
          <ModalHeader>Thank you!✔️</ModalHeader>
          <ModalBody>
            <Row>
              Your request has been submitted successfully! Please wait for us to contact you with our price offer!
            </Row>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}