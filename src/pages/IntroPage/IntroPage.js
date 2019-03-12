import './IntroPage.css'
import React, {
    Component
} from 'react'
import moment from 'moment';
import config from '../../config'

export default class IntroPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            experiment_time: config.xp_time,
            current_step: 0
        }
        this.handleNextButton = this.handleNextButton.bind(this)
        this.handleButtonExample = this.handleButtonExample.bind(this)
        this.handleStartButton = this.handleStartButton.bind(this)
    }

    handleButtonExample(e) {
        this.state.bugModule.showAlertMessage()
    }

    handleNextButton() {
        this.setState({
            current_step: this.state.current_step + 1
        })
    }

    handleStartButton() {
        this.props.notifyIntroFinished()
    }

    // time in seconds
    displayTime(time) {
        return moment.utc(time*1000).format('mm:ss') + " minutes";
    }

    renderPage0() {
        return <div id="difficulty-selection" className="jumbotron">
          <h2>GUI Testing</h2>
          <p className="lead"> Bugs are hidden in this web appication and your goal is to find them by testing the GUI. </p>
          <p> To test the GUI you will have to click on the buttons of the application. You will know that you have triggered a bug when an alert message appears. <br/>
          Click on this button to trigger a bug : <button onClick={this.handleButtonExample} className="btn btn-info">Click me</button> <br/>
          Some bugs are easier to detect than others. <br/>
          Level 1 bugs require you to click on the right button to be triggered. <br/>
          Level 2 bugs require you to click on a combination of 2 buttons on the right order. <br/>
          Level n bugs require you to click on a combination of n buttons on the right order. <br/>
          </p> 
          <hr/>
          <p>
          The experimentation is time boxed {this.displayTime(this.state.experiment_time)} , and starts after clicking the Start button. 
          </p>
          <hr className="my-4"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button id="next" onClick={this.handleNextButton} className="btn btn-primary">Next</button>
            </div>
        </div>
    }

    renderPage1() {
        return <div id="difficulty-selection" className="jumbotron">
          <h2>GUI Testing assistant</h2>
          <p>
            To guide you during the experience, we provide you a GUI test assistant. <br/>
            The GUI test assistant watches your actions, and tries to guess what will be your next action. <br/>
         </p>
            <ul className="list-group">
                <li className="list-group-item"><button className="btn btn-primary entropy">button</button> The assistant has no opinion about that button</li>
                <li className="list-group-item"><button className="btn btn-primary entropy entropy0">button</button> There is very few chances you click on that button</li>
                <li className="list-group-item"><button className="btn btn-primary entropy entropy1">button</button> You may click on that button</li>
                <li className="list-group-item"><button className="btn btn-primary entropy entropy2">button</button> Pretty sure you will click on that button</li>
            </ul>
            For testing purpose, maybe it is a good thing to not be too much predictable.<br/>
            When you are ready, click the start button to start the Bug Hunt.
          
          <hr className="my-4"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button id="start" onClick={this.handleStartButton} className="btn btn-primary">Start</button>
            </div>
        </div>
    }

    render() {
        if (this.state.current_step === 0) {
            return this.renderPage0()
        } else if (this.state.current_step === 1) {
            return this.renderPage1()
        }
    }
}