import React, { Component } from 'react';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';
import '../stylesheets/Birthday.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Tour from 'reactour';

class Name extends Component {
  questions = ['What is your favorite holiday?',
               'What is your favorite color?',
               'This is an example last question.'];
  state = {isTourOpen: false,
           selectedOptions: {},
           currQ: 'What is your favorite food?'};

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

  moveOn = (selectedOptions) => {
    this.setState({ selectedOptions, currQ: this.questions.shift()});
  }

  render () {
    const optionStyle = {
        option: {
            width: '100%'
        }
    };
    const testStyle = {
        width: '30vw',
        textAlign: 'left'
    };
    return (<>
      <BackArrow url='/name' />
      <ForwardArrow url='/birthday' />
      {/* TODO: change route url */}
      <div className='Container'>
        <div className="Title static">
          Date of Birth
        </div>
        <div className="Text static">
            Take this quick quiz and we'll definitely guess the right answer!
        </div>
        <div className="questions">
            <Test style={testStyle} onOptionSelect={selectedOptions => this.moveOn(selectedOptions)}>
                <QuestionGroup questionNumber={0}>
                    <Question>{this.state.currQ}</Question>
                    <Option style={optionStyle} value="0">Mac n Cheese</Option>
                    <Option style={optionStyle} value="1">Steak</Option>
                    <Option style={optionStyle} value="2">Sushi</Option>
                    <Option style={optionStyle} value="3">Pad Thai</Option>
                </QuestionGroup>
            </Test>
        </div>
        <button onClick={this.startTour}>Preview Tour</button>
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
