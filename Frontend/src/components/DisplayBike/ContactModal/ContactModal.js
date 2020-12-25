import React from "react";
import { Button, Modal, ModalBody, ModalHeader, FormInput, Row, Col} from "shards-react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';


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
    // console.log(this.props.images)
    axios.get('https://2factor.in/API/V1/47bfce72-412d-11eb-83d4-0200cd936042/SMS/VERIFY/'+this.state.sessionID+'/'+this.state.otp)
      .then(resp => {
        if(resp.data.Status == "Success"){
          this.setState({otpMessageText: "OTP Verified!"})
          axios.post('http://localhost:4000/buyquery', {
              name: this.state.name,
              phoneNumber: this.state.phoneNumber,
              city: this.state.city,
              vehicle: this.props.vehicle._id,
              queryType: 'Buy'
          })
          .then(resp => {
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
    return (
      <div>
        <Button onClick={this.toggle}>Contact Us</Button>
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
          <ModalBody style={{textAlign: 'center'}}>
            <Row>
              Your request has been submitted successfully! Please wait for us to contact you!
            </Row>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}