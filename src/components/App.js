import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'
import CryptoList from './CryptoList';
import Crypto from './Crypto';
import Header from './Header'
import './App.css'

const App = () => (
  <Router>
    <React.Fragment>
      <Header />
      <Route exact path="/" component={CryptoList} />
      <Route path="/crypto/:id" component={Crypto} />
    </React.Fragment>
  </Router>
)

export default App
