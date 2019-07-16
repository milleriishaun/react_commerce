import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Route, Switch} from "react-router-dom";

import Cart from './components/Cart';
import Default from './components/Default';
import Details from './components/Details';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import React from 'react';
import logo from './logo.svg';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact
          path="/"
          component={ProductList}
        />
        <Route
          path="/details"
          component={Details}
        />
        <Route
          path="/cart"
          component={Cart}
        />
        <Route
          component={Default}
        />
      </Switch>
    </React.Fragment>
  );
}

export default App;
