import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Col} from 'shards-react'

const useStyles = makeStyles({
  root: {
    width: '100%',
    background: 'black',
    bottom: 0,
    position: 'static',
    // //marginTop: '10%'
  },
  icon: {
      color: '#fff',
      fontSize: '1.5em'
  }
});

export default function LabelBottomNavigation() {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root}>
          <Col sm="12" md="4" lg="3">
          </Col>
          <Col sm="12" md="4" lg="6" style={{textAlign: 'center'}}>
              <TwitterIcon className={classes.icon}/>
              <InstagramIcon className={classes.icon}/> <br/>
              <span style={{color: 'white'}}>Powered by Vaibhav Muchandi</span>
          </Col>
          <Col sm="12" md="4" lg="3">
          </Col>
    </BottomNavigation>
  );
}
