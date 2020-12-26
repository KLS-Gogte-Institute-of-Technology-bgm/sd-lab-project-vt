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
    //marginTop: '10%'
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
          
          <Col sm="12" md="8" lg="6" style={{textAlign: 'center'}}>
              <span style={{color: 'white'}}>Powered by <a href="https://vaibhavmm.in" target="_blank" rel="noopener noreferrer" style={{color: 'white'}}>Vaibhav Muchandi</a></span>
          </Col>
          
    </BottomNavigation>
  );
}
