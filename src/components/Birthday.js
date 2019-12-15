import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import QIcon from '../assets/q-mark.jpg';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';

import '../stylesheets/Birthday.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Tour from 'reactour';

class Name extends Component {
  questions = ['What is your favorite food?',
               'What is your favorite holiday?',
               'What is your favorite color?',
               'This is an example last question.'];
  possibleAnswers = [
      ['Mac & Cheese', 'Fried Chicken', 'Burgers', 'Ice Cream'],
      ['Christmas', 'Easter', 'Thanksgiving', 'Halloween'],
      ['Blue', 'Pink', 'Green', 'Yellow'],
      ['1', '2', '3', '4', '5', '6']
  ];

  state = {isTourOpen: false,
           selectedOptions: {},
           currQ: 'What is your favorite food?',
           qNum: 0};

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
    if (this.state.qNum === this.questions.length - 1) {
      console.log('finished!');
      console.log(selectedOptions);
      // TODO: add call to API
    }
    this.setState({ selectedOptions,
                    qNum: (this.state.qNum + 1),
                    currQ: this.questions[this.state.qNum + 1]});
  }

  render () {
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
            Take this quick quiz and we'll show our top 3 guesses!
            <a data-tip data-for='info' href="/birthday"><img alt="Info bubble" style={{width: 20, paddingLeft: 10}} src={QIcon}/></a>
            <ReactTooltip place='right' id='info' type='info' effect='solid'>
                <span>We get this right 99% of the time!</span>
            </ReactTooltip>
        </div>
        <div className="questions">
          <Test style={testStyle} onOptionSelect={selectedOptions => this.moveOn(selectedOptions)}>
            {
              this.possibleAnswers.map((ans, idx) => {
                let optionStyleShow = (this.state.qNum === idx) ?
                  {option: {width: '100%', display: 'block'}} : {option: {width: '100%', display: 'none'}};
                let styleShow = (this.state.qNum === idx) ?
                  {display: 'block'} : {display: 'none'};
                return (
                  <QuestionGroup style={optionStyleShow} questionNumber={idx}>
                      <Question style={styleShow}>{this.questions[idx]}</Question>
                        {
                            ans.map((val, ansIdx) => {
                                return <Option key={val + ansIdx} style={optionStyleShow} checked={false} value={ansIdx.toString()}>{val}</Option>
                            })
                        }
                  </QuestionGroup>
                );
              })
            }
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
