import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import Landing from './components/Landing/Landing.js';
import Footer from './components/Footer/Footer';
import AllBikes from './components/AllBikes/AllBikes';
import DisplayBike from './components/DisplayBike/DisplayBike';
import SellForm from './components/SellForm/SellForm';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";

function App() {
  return (
    <div>
      <Route path='/' exact component={Landing}/>
      <Route path='/buy' exact component={AllBikes}/>
      <Route path='/display' exact component={DisplayBike}/>
      <Route path='/sell' exact component={SellForm}/>
      <Footer/>
    </div>
  );
}

export default App;
