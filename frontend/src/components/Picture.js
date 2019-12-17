import React, { Component } from 'react';
import '../stylesheets/Picture.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Webcam from "react-webcam";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

import Tour from 'reactour';

class Picture extends Component {
  state = {
    isTourOpen: false,
    screenshot: null,
    ethnicity: null,
    age: null
  };

  startTour = () => {
    this.setState({isTourOpen: true});
  }

  closeTour = () => {
    this.setState({isTourOpen: false});
  }

  steps = [
    {
      selector: 'button',
      content: 'There is no option to skip this step. This violates G17 that user data should only be taken with persmission.',
    },
    {
      selector: '.sidebar',
      content: 'The AI\'s decisions cannot be changed in this system, violating the requirement for efficient correction (G9).'
    },
    {
      selector: '.age',
      content: 'There is no explanation about why the system did it what it did and where it came from, violating G11.'
    },
    {
      selector: '.ethnicity',
      content: 'Ethnic identities are a very personal topic and using facial detection sounds like an idea that could go really wrong really quickly.'
    }
  ];


  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const screenshotVal = this.webcam.getScreenshot();
    this.setState({
      screenshot: screenshotVal
    })
    fetch('http://0.0.0.0:5000/ai', {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(screenshotVal)
    })
    .then(response => response.json())
    .then(json => this.setState(json));
  }

  render () {
    return (<>
      <BackArrow url='/gender' />
      {/* <ForwardArrow url='/picture' /> */}
      <div className='ContainerPic'>
        <div className="TitlePic">
          Picture
        </div>
        <div className="TextPic">
          Add a picture to your profile!
        </div>
        <div className="webcam">
          { this.state.screenshot ?
          <img src={`${this.state.screenshot}`}/>
          :
          <Webcam
          screenshotFormat="image/jpeg"
            ref={this.setRef}
            height={360}
          />
          }
          <div className="capture">
            <button class="actual" onClick={this.capture} disabled={this.state.screenshot}><FontAwesomeIcon icon={faCamera}/></button>
          </div>
          <div className="sidebar">
          {  this.state.ethnicity &&
            <div className="ethnicity">
              <div className="desc">Your ethnicity is:</div>
              <div className="label">{this.state.ethnicity}</div>
            </div> }
            { this.state.age &&
            <div className="age">
              <div className="desc">Your age is:</div>
              <div className="label">{this.state.age}</div>
            </div> }
            </div>
        </div>
        <a className="debreif" onClick={this.startTour}>Why is this bad?</a>
      </div>
      <Tour
        steps={this.steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour}/>
      </>
    )
  }
}

export default Picture;
