import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useWindowPosition from '../../hook/useWindowPosition';
import Avatar from '@material-ui/core/Avatar';
import picr from './picr.jfif'
import pic from './1.png'
import {Row, Col} from 'shards-react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
    //marginBottom: '5%'
  },
  paper: {
    padding: theme.spacing(10),
    //textAlign: 'center',
    color: 'white',
    backgroundColor: 'black'
  },
  large: {
    height: '100px',
    width: '100px',
    marginLeft: '15%'
  },
  poweredTitle: {
    fontSize: '1.5em',
    fontFamily: 'Bungee',
  },
  aboutText: {
    fontSize: '1.2em',
    fontFamily: 'Bungee',
  },
  tcText: {
    fontSize: '1em',
    fontFamily: 'Bungee'
  }
}));

export default function AutoGrid() {
  const classes = useStyles();
  const checked = useWindowPosition('header')
  return (
    <div className={classes.root} id='aboutUs' checked={checked}>
      <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{textAlign: 'center'}}>
                <span className={classes.poweredTitle}>About Us</span>
        </Grid>
        <Grid item xs={12} style={{textAlign: 'center', marginTop: '-1%'}}>
                <span className={classes.aboutText}>PIGO Auto is a pre-used vehicle marketplace. We are open to buying and selling of any type of vehicles at very resonable prices. We are also open for commission based opputunities. You can get great deals for both buying and selling through our portal.</span>
        </Grid>
        <Grid item xs={12} style={{textAlign: 'center', marginTop: '-1%'}}>
                <span className={classes.aboutText}>Terms and Conditions</span> <br/>
                <span className={classes.tcText}>To prevent spam, we will utilize OTP services, your personal details are not shared with anyone else and our team will require atleast 2 days to get in touch with you either for buying or selling of a vehicle.</span>
                <hr className={classes.hr}/>
        </Grid>
        </Grid>
        <Container>
        <Row style={{marginLeft: '15%'}}>
        <Col>
          <Row>
            <Avatar alt='ceo' src={picr} className={classes.large}/>
          </Row>
          <Row>
            <h5 style={{color: 'white'}}>Rushikesh Pise, Co-Founder</h5>
          </Row>
        </Col>
        <Col>
          <Row>
            <Avatar alt='ceo' src={pic} className={classes.large}/>
          </Row>
          <Row>
            <h5 style={{color: 'white'}}>Akshay Godse, Co-Founder</h5>
          </Row>
        </Col>
        </Row>
        </Container>
      </Container>
    </div>
  );
}
