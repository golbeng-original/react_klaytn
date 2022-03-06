import React, { useEffect, useState } from 'react';
import "aos/dist/aos.css"

import logo from './logo.svg';
import './App.css';

class Logo extends React.Component {

  logoStyle = {
    height: '40vmin',
    pointerEvents: 'none'
  }

  render() {
    return (
      <img src={logo} 
        style={{
        ...this.logoStyle,
        animation: 'App-logo-spin infinite 20s linear'
      }} alt="logo" />
    )
  }
}

class App extends React.Component {

  containerStyle = {
    textAlign: 'center'
  }

  headerStyle = {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  }

  render() {
    return (
      <div style={this.containerStyle}>
        <header style={this.headerStyle}>
          <Logo />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a 
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            color: "#61dafb"
          }}>
            Learn React
          </a>
        </header>
      </div>
    )
  }
}

export default App;
