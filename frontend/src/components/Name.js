import React, { Component } from 'react';
import '../stylesheets/Name.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Tour from 'reactour';
import Fuse from "fuse.js";
import firstNames from '../assets/firstNames.js';
import lastNames from '../assets/lastNames.js';


const fuseOptionsFirst = {
  shouldSort: false,
  threshold: 0.4,
  location: 0,
  distance: 0.5,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: ['first']
};

const fuseOptionsLast = {
  shouldSort: false,
  threshold: 0.4,
  location: 0,
  distance: 0.5,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: ['last']
};

const fuseFirst = new Fuse(firstNames, fuseOptionsFirst);
const fuseLast = new Fuse(lastNames, fuseOptionsLast);

class Name extends Component {
  state = {isTourOpen: false}

  closeTour = () => {
    console.log('finished tour');
  }

  steps = [
    {
      selector: '.Title',
      content: 'We didn\'t make clear what the system does, and what role it plays in the website.'
    },
    {
      selector: '.complaintContainer',
      content: 'Usually, you want your system to be able to support efficient dismissal (G11), but here, the suggesstion persists until you enter a valid name.',
    },
    {
      selector: '#lastName',
      content: 'A good AI system will also support efficient correction, which this interaction fails to do.'
    },
    {
      selector: '.select',
      content: 'The back button is disabled, which is bad functionality and reduces the user\'s control over the system.'
    }
  ];

  startTour = () => {
    this.setState({isTourOpen: true});
  }

  closeTour = () => {
    this.setState({isTourOpen: false});
  }

  checkBoth = () => {
    this.checkFirst();
    this.checkLast();
  }

  checkFirst = () => {
    let firstName = document.getElementById('firstName').value;
    if (firstName !== '') {
      // this.setState({firstNameSuggest: 'Bob'});
      let results = fuseFirst.search(firstName);
      if (results.length === 0) {
        // Try looking for closest match after removing one letter
        while (results.length === 0 && firstName.length > 0) {
          firstName = firstName.slice(0, -1);
          results = fuseFirst.search(firstName);
        }
      }
      if (results.length !== 0) {
        if (results.find((val) => (val.first.toLowerCase() === firstName))) {
          // Ignore valid names
          this.setState({firstNameSuggest: ''});
        } else {
          let randResult = results[Math.floor(Math.random() * results.length)];
          // console.log(randResult);
          this.setState({firstNameSuggest: randResult.first});
        }
      } else {
        // Name is just nonexistent??
      }
    }
  }

  checkLast = () => {
    let lastName = document.getElementById('lastName').value;
    if (lastName !== '') {
      let results = fuseLast.search(lastName);
      if (results.length === 0) {
        // Try looking for closest match after removing one letter
        while (results.length === 0 && lastName.length > 0) {
          lastName = lastName.slice(0, -1);
          results = fuseLast.search(lastName);
        }
      }
      if (results.length !== 0) {
        if (results.find((val) => (val.last.toLowerCase() === lastName))) {
          // Ignore valid names
          this.setState({lastNameSuggest: ''});
        } else {
          let randResult = results[Math.floor(Math.random() * results.length)];
          this.setState({lastNameSuggest: randResult.last});
        }
      } else {
        // Name is just nonexistent??
      }
    }
  }

  render () {
    return (<>
      <BackArrow className=".select" />
      <ForwardArrow url='/gender' />
      <div className='Container'>
        <div className="Title">
          Name
        </div>
        <div className="group">
          <div className="inputContainer" onBlur={this.checkFirst}>
            <input id="firstName" type="text" required />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>What's your first name?</label>
          </div>
          {
            (this.state.firstNameSuggest) ?
            <div className="complaintContainer">
              Oops! Did you mean {this.state.firstNameSuggest}?
            </div>
            : <> </>
          }
        </div>
        <div className="group">
          <div className="inputContainer" onBlur={this.checkLast}>
            <input id="lastName" type="text" required />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>Last name?</label>
          </div>
          {
            (this.state.lastNameSuggest) ?
            <div className="complaintContainer">
              You sure? A more common last name is {this.state.lastNameSuggest}...
            </div>
            : <> </>
          }
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

export default Name;
