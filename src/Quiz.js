import React, {Component} from 'react';
import Options from './Options';
import classNames from 'classnames';

class Quiz extends Component {
  constructor (props) {
    super(props);

    let riddle = this.game();
    let correct = false;
    let gameOver = false;
    this.state = {
      riddle: riddle,
      correct: correct,
      gameOver: gameOver
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    // this.checkResult = this.checkResult.bind(this);
  }

  randomNumber (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  fillRandomChoicesInArray (numberOfChoices) {
    let array = [];
    while (array.length < numberOfChoices) {
      let randomChoice = this.randomNumber(1, 100);
      // check array doesn't already contain number
      if (array.indexOf(randomChoice) !== -1) {
        continue;
      }
      array.push(randomChoice);
    }
    return array;
  }

  game () {
    let field1 = this.randomNumber(1, 100);
    let field2 = this.randomNumber(1, 100);
    let result = field1 + field2;
    let choicesArray = this.fillRandomChoicesInArray(3);
    let randomIndex = this.randomNumber(0, 3);

    choicesArray.splice(randomIndex, 0, result);

    let riddle = {
      choicesArray: choicesArray,
      field1: field1,
      field2: field2,
      result: result
    };

    if (this.state && this.state.gameOver) {
      this.setState({
        riddle: riddle
      });
    } else {
      return riddle;
    }
  }

  checkResult (number) {
    console.log(`Result ${number} clicked`);
    if (number === this.state.riddle.result) {
      console.log(`You clicked the correct square !`);
      this.setState({correct: true, gameOver: true});
    } else {
      console.log(`You clicked the wrong square !`);
      this.setState({correct: false, gameOver: true});
    }
  }

  renderOptions () {
    return (
      <div className='options animated zoomIn'>

        {this.state.riddle.choicesArray.map((number, i) => {
          return <Options number={number} key={i} checkResult={(number) => this.checkResult(number)} />;
        })}

      </div>
    );
  }

  renderMessage () {
    if (this.state.correct) {
      return <h3>Great! Correct answer</h3>;
    } else {
      return <h3>Wrong answer. Try again</h3>;
    }
  }

  playAgain () {
    this.setState({
      correct: false,
      gameOver: false
    });
    this.game();
  }

  render () {
    return (
      <div className='quiz'>
        <div className='quiz-content'>
          <p className='question'>What is the sum of <span className='text-info'>{this.state.riddle.field1}</span> + <span className='text-info'>{this.state.riddle.field2}</span>?</p>
          {this.renderOptions()}
        </div>
        <div className={classNames('after', {'hide': !this.state.gameOver}, {'wrong': !this.state.correct}, {'correct': this.state.correct})}>
          {this.renderMessage()}
        </div>
        <div className='play-again'>
          <a className='button' onClick={() => this.playAgain()}>Play Again</a>
        </div>
      </div>

    );
  }
}

export default Quiz;
