import React, { Component } from 'react';
import logo from './logo.png';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="logo-container">
          <img src={logo} className="dd-logo" alt="" />
        </div>
        <h1 className="App-title">Welcome to the Deloitte Digital FED exercise</h1>
        <p>You can view the instructions in the <code>README.md</code> file</p>
        <p>Remember to write any assumptions in an <code>ASSUMPTIONS.md</code> file</p>
        <p className="warning">Please overwrite the code for this page, we do not expect you to handle any routing in this test</p> 
      </div>
    );
  }
}

export default App;
