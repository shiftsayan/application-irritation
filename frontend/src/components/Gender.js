import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'
import QIcon from '../assets/q-mark.jpg';
import { Test, QuestionGroup, Question, Option } from 'react-multiple-choice';

import '../stylesheets/Gender.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';
import Tour from 'reactour';

class Gender extends Component {
  questions = ['Which do you like the best?',
               'Which holiday do you like the least?',
               'What is your favorite color?',
               'Pick a random number.'];
  possibleAnswers = [
      ['Mac & Cheese', 'Fried Chicken', 'Burgers', 'Ice Cream'],
      ['Christmas', 'Valentine\'s Day', 'Thanksgiving', 'Halloween'],
      ['Blue', 'Pink', 'Green', 'Yellow'],
      ['10', '4', '122', '318']
  ];

  state = {isTourOpen: false,
           isQuizDone: false,
           selectedOptions: {},
           currQ: 'What is your favorite food?',
           qNum: 0};

  closeTour = () => {
    console.log('finished tour');
  }

  steps = [
    {
      selector: '.Text',
      content: 'Why do we need a quiz to determine gender?',
    },
    {
      selector: '.results',
      content: 'There\'s no level of confidence in the AI!'
    },
    {
      selector: '.retry',
      content: 'Forces you to retake the whole quiz, no easy way to fix answers!'
    }
  ];

  startTour = () => {
    this.setState({isTourOpen: true});
  }

  closeTour = () => {
    this.setState({isTourOpen: false});
  }

  decisionTree = (selectedOptions) => {
    let total = [0, 0, 0, 0]
    for (let q in selectedOptions) {
        total[selectedOptions[q]] += 1
    }
    if (total.indexOf(4) > -1 || total.indexOf(3) > -1 || (total[1] + total[2] > 2)) {
      return 'Male';
    } else {
      return 'Female';
    }
  }

  moveOn = (selectedOptions) => {
    if (this.state.qNum === this.questions.length - 1) {
      this.setState({
          guess: this.decisionTree(selectedOptions),
          isQuizDone: true});
      console.log(this.state.guess)
    }
    this.setState({ selectedOptions,
                    qNum: (this.state.qNum + 1),
                    currQ: this.questions[this.state.qNum + 1]});
  }

  resetQuiz = () => {
    this.setState({
      qNum: 0,
      isQuizDone: false,
      selectedOptions: {},
      currQ: this.questions[0]
    })
  }

  render () {
    const testStyle = {
      width: '30vw',
      textAlign: 'left'
    };
    return (<>
      <BackArrow url='/name' />
      <ForwardArrow url='/picture' />
      <div className='Container'>
        <div className="Title static">
          Gender
        </div>
        <div className="Text static">
            Take this quick quiz and we'll show our guess!
            <a data-tip data-for='info' href="/birthday"><img alt="Info bubble" style={{width: 20, paddingLeft: 10}} src={QIcon}/></a>
            <ReactTooltip place='right' id='info' type='info' effect='solid'>
                <span>We get this right 99% of the time!</span>
            </ReactTooltip>
        </div>
        {
          (this.state.isQuizDone) ?
          <>
            <div className="results">
                You are a {this.state.guess}!
            </div>
            <button onClick={this.resetQuiz} className="retry">Try Again?</button>
          </>
          : null
        }
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

export default Gender;
