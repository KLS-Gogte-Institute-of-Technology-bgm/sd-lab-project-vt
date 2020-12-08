import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import useWindowPosition from '../../hook/useWindowPosition';
import Avatar from '@material-ui/core/Avatar';
import pic from './1.png'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black'
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  poweredTitle: {
    fontSize: '1.5em',
    fontFamily: 'Bungee',
  },
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
                <hr className={classes.hr}/>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
              <Grid item xs={12}>
                    <Avatar alt='ceo' src={pic} className={classes.large}/>
                    <h5 style={{color: 'white'}}>Rushikesh Pise, CEO</h5>
              </Grid>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Grid item xs={12}>
                    <Avatar alt='ceo' src={pic} className={classes.large}/>
                    <h5 style={{color: 'white'}}>Rushikesh Pise, CEO</h5>
              </Grid>
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
}
