import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header/Header'
import AboutUs from '../AboutUs/aboutUs';

const useStyles = makeStyles((theme) => ({
    
}))

export default function Landing(){
    const classes = useStyles()
    return(
        <div>
            <CssBaseline/>
            <Header/>
            <AboutUs/>
        </div>
    )
}