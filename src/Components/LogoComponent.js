import React from 'react'
import logo from '../logo.svg'

//import styles from './LogoComponent.css';

const styles = {
    height: '40vmin',
    pointerEvent: 'none'
}

export default class LogoComponent2 extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <img src={logo} style={styles} alt="logo" />
      )
    }
  
  }
  