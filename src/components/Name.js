import React, { Component } from 'react';
import '../stylesheets/Name.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Tour from 'reactour';

class Name extends Component {
  state = {isTourOpen: false}

  closeTour = () => {
    console.log('finished tour');
  }

  steps = [
    {
      selector: '.Title',
      content: 'This title sucks!',
    },
    {
      selector: '.group',
      content: 'Bar is too long!'
    }
  ];

  startTour = () => {
    this.setState({isTourOpen: true});
  }

  closeTour = () => {
    this.setState({isTourOpen: false});
  }

  render () {
    return (<>
      <BackArrow />
      <ForwardArrow url='/birthday' />
      <div className='Container'>
        <div className="Title">
          Name
        </div>
        <div className="group">
          <input type="text" required />
          <span className="highlight"></span>
          <span className="bar"></span>
          <label>What's your name?</label>
        </div>
        <button onClick={this.startTour}>Preview Tour</button>
        {/* <div className="Text">
          This is Application Irritation, an AI (geddit?) that helps you fill out online forms. Except, this AI does not follow the best design principles. It is a demonstration of what <span className="not">NOT</span> to do while designing your AI-powered software. Your task is to sign up for a new account on our service against the wishes of AI!
        </div>
        <div className="Footer">
          Designed with ❤️ by Emily Lo and Sayan Chaudhry.
        </div> */}
      </div>
      <Tour
        steps={this.steps}
        isOpen={this.state.isTourOpen}
        onRequestClose={this.closeTour}/>
      </>
    )
  }
}

export default Name;
