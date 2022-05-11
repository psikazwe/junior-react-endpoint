import React, { Component } from 'react'
import logo from "./../assets/brand.svg";

export class Splash extends Component {
  render() {
    return (
      <div className='screen'>
          <div className='logo-animation'>
            <img src={logo}/>
            <p>Preparing Shop...</p>
          </div>
      </div>
    )
  }
}

export default Splash