import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Collapse, IconButton, Toolbar, Button } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link as Scroll } from 'react-scroll'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL+"/assets/background.jpg"})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
    },
    appbar: {
        background: 'none',
        fontFamily: 'Bungee'
    },
    appbarTitle: {
        flexGrow: '1',
        fontFamily: 'Bungee',
        color: 'white',
        fontSize: '2rem',
        marginTop: '1rem'
    },
    appbarWrapper: {
       width: '80%',
       margin: '0 auto'
    },
    icon: {
        color: '#fff',
        fontSize: '2rem'
    },
    container: {
        textAlign: 'center'
    },
    goDown: {
        color: 'white',
        fontSize: '4rem',
    },
}));

export default function Header(){
    const classes = useStyles();
    const[checked, setChecked] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    useEffect(() => {
        setChecked(true)
    }, [])
    return(
        <div className={classes.root} id="header">
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <h1 span className={classes.appbarTitle}><span style={{color: 'red'}}>PI</span>GO Auto</h1>
                    <div>
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                        <SortIcon className={classes.icon}/>
                    </IconButton>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Buy</MenuItem>
                        <MenuItem onClick={handleClose}>Sell</MenuItem>
                        <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                    </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Collapse in={checked} {...(checked?{timeout: 1500}:{})} collapsedHeight={50}>
            <div className={classes.container}>
                <div>
                <Button variant="outlined" color="primary" size="large" style={{border: "3px solid", borderColor: 'white', color: 'white', margin: '20px'}} href="/buy">
                    <span style={{fontSize: '1.3em', fontWeight: 'bold'}}>Buy</span>
                </Button>
                <Button variant="outlined" color="secondary" size="large" style={{border: "3px solid", borderColor: 'red', color: 'red', margin: '20px'}} href="/sell">
                    <span style={{fontSize: '1.3em', fontWeight: 'bold'}}>Sell</span>
                </Button>
                </div>
                <Scroll to="aboutUs" smooth={true}>
                    <IconButton style={{marginTop: '30%'}}>
                        <ExpandMoreIcon className={classes.goDown}/>
                    </IconButton>
                </Scroll>
            </div>
            </Collapse>
        </div>
    )
}
