import React from 'react';
import './App.css';
import InputFields from './components/InputFields';
import Clock from './components/Clock';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      displayMins: 0,
      displaySecs: 0,
      calSecs: 0,
      minsOri1: 0,
      minsOri2: 0,
      times: 0,
      snd: new Audio(`${window.location.origin}/bell_ring.mp3`),
      cssClass: "start-time",
      secondTimer: true,
      showPause: false,
      timerId: 0
    }
  }

  handleChange = (event) => {
    let tempMins = parseInt(event.target.value);
    let n1 = (event.target.name === 'displayMins');
    let n2 = (event.target.name === 'times');
    if (isNaN(tempMins)) {
      (n1)
        ? this.setState({
          displayMins: 0
        })
        : this.setState({
          minsOri2: 0
        })
    } else {
      (n2) ? this.setState({
        times: tempMins
      }) : (n1) ? this.setState({
        displayMins: tempMins,     // vary
        calSecs: tempMins * 10,// vary
        minsOri1: tempMins,     // const
      }) : this.setState({
        minsOri2: tempMins,     // const
      });
    }
  }

  changeState = (minutes, seconds) => {
    // console.log(`time: ${minutes} : ${seconds % 10}`);
    seconds--;
    this.setState({
      calSecs: seconds,  //0
      displaySecs: seconds % 10,
      cssClass: (seconds % 10 <= 5 && minutes === 0)
        ? "last-30secs"
        : "start-time"
    })
    if (seconds === 0 && minutes === 0) this.play();
  }
  // fun c pauseResume() {
  //   if text == pause => change text to resume and pause = true
  //   else text == resume => change text to pause and pause = false && call decrement()
  // }

  decrement = () => {
    // if(pause == false) {...}
    var minutes = this.state.displayMins;
    var seconds = this.state.calSecs;
    if (seconds > 0) {   // 1st timer
      if (seconds % 10 !== 0) {
        this.changeState(minutes, seconds)
      } else {
        this.changeState(minutes, seconds);
        this.setState({
          displayMins: (minutes !== 0) ? minutes - 1 : minutes,   //0
        })
      }
      // setTimeout(this.decrement, 1000);
    } else {  // 2nd timer
      if (
        (this.state.minsOri2 && (this.state.minsOri2 * 10)) > 0 
        && this.state.secondTimer
        ) { // 2nd exists
        console.log("Time's Up of 1st timer");
        this.setState({
          displayMins: this.state.minsOri2,
          calSecs: this.state.minsOri2 * 10,
          secondTimer: false
        });
        this.decrement();
      } else {  // 1nd
        console.log("Time's Up of 2nd timer");
        if (this.state.times > 1) {
          this.setState({
            displayMins: this.state.minsOri1,
            calSecs: this.state.minsOri1 * 10,
            secondTimer: true,
            times: this.state.times - 1
          });
          this.decrement();
        } else {
          this.setState({
            showPause: false,
            displayMins: 0,
            displaySecs: 0,
            secondTimer: true,
            cssClass: "start-time"
          })
          alert(`Time's up!`);
          clearInterval(this.state.timerId);
        }
      };
    }
  }

  play = async () => {
    this.state.snd.play();
  }

  startTimer() {
    // console.log(window.location.origin)
    // var snd = ;
    if (this.state.calSecs > 0
      || this.state.minsOri2 > 0) { // 1st exists
      let tempId = setInterval(this.decrement, 1000);
      this.setState({
        showPause: true,
        timerId: tempId
      })
      console.log("inside setTimer");
    } else alert("please enter valid minutes");
  }

  render() {
    return (
      <div className="App">
        <Clock
              cssClass={this.state.cssClass}
              displayMins={this.state.displayMins}
              displaySecs={this.state.displaySecs}
            /> 
        <InputFields 
          name={"displayMins"} 
          handleChange={this.handleChange} 
          placeholder={"First Timer"}
          className={"input"}
        />
        <InputFields 
          name={"minsOri2"} 
          handleChange={this.handleChange} 
          placeholder={"Second Timer"}
          className={"input"}
        />
        <InputFields 
          name={"times"} 
          handleChange={this.handleChange} 
          placeholder={"Laps"}
          className={"input"}
        />
        {!this.state.showPause && <button
          className="start-button"
          onClick={()=>this.startTimer()}>
          Start
        </button>}
        {this.state.showPause && <button
          className="start-button"
          onClick={()=>{
            clearInterval(this.state.timerId)
            this.setState({
              showPause: false
            })
          }}>
            Pause
        </button> }
        {/* {this.state.showClock &&
          <React.Fragment>
            <Clock
              cssClass={this.state.cssClass}
              displayMins={this.state.displayMins}
              displaySecs={this.state.displaySecs}
            /> 
            <button
              className="start-button"
              onClick={()=>clearInterval(this.state.timerId)}>Pause
            </button> 
            <button
              className="start-button"
              onClick={this.startTimer}>Start
            </button>
          </React.Fragment>
        }
        {!this.state.showClock 
        && <React.Fragment>
          <InputFields handleChange={this.handleChange} />
        <button
          className="start-button"
          onClick={this.startTimer}>Start
        </button>
        </React.Fragment>
        } */}
      </div>
    );
  }
}

export default App;