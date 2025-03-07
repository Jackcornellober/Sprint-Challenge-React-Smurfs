import React, { Component } from 'react';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';
import axios from 'axios'
import { Link } from 'react-router-dom'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }

  componentDidMount() {
    axios.get( 'http://localhost:3333/smurfs' )
         .then( res => this.setState( {smurfs: res.data} ) )
         .catch( err => console.log( err ) );
  }

  addSmurf = (newSmurf) => {
    console.log(newSmurf);
    axios.post('http://localhost:3333/smurfs', {
      name: newSmurf.name,
      age: newSmurf.age,
      height: newSmurf.height,
    })
    .then((res) => {
      this.setState({smurfs: res.data});
      // this.props.history.push('/');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // add any needed code to ensure that the smurfs collection exists on state and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them down to props.
  render() {
    return (
      <div className="App">
        <Router >
          <div>
            <nav>
              <NavLink className = 'navlink' exact to="/">
                Smurf List
              </NavLink>
              <NavLink className = 'navlink' exact to="/form">
                Add Smurfs
              </NavLink>
            </nav>
            <Route path = '/form' render = {props => (<SmurfForm {...props} addSmurf = {this.addSmurf}/>)} />
            <Route exact path = '/' render = {props => (<Smurfs {...props} smurfs = {this.state.smurfs}/>)} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
