import React, {
    Component
} from 'react'
import "./experiment_page.css";
import config from '../../config'
import Countdown from './countdown/countdown'

export default class ExperimentPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question_module: props.question_module,
            experiment_module: props.experiment_module,
            naturalnessModule: props.naturalnessModule,
            nb_bug_found: 0
        }
        this.state.question_module.addBugsObserver(this.state)
        this.notifyBugTrigger = this.notifyBugTrigger.bind(this)
        this.toggle = this.toggle.bind(this)
        this.finished = this.finished.bind(this)
        this.onToggleNaturalness = this.onToggleNaturalness.bind(this)
    }

    notifyBugTrigger() {
        this.setState({
            nb_bug_found: this.state.question_module.getNbBugTriggered()
        })
    }

    toggle() {
        this.state.experiment_module.toggleExperiment()
    }

    finished() {
        this.state.experiment_module.finishExperiment()
    }

    onToggleNaturalness(e) {
        this.state.experiment_module.notifyNaturalnessToggled();
        this.setState({
            naturalness_activated: this.state.naturalnessModule.naturalness_activated
        })
    }

    render() {
        return <div>
            <div>
                <span>Bugs Found : {this.state.experiment_module.nb_bug_found}</span>
                <Countdown total_time={config.xp_time} callback_toggle={this.toggle} callback_finished={this.finished}/>
            </div>
            <div className="custom-control custom-switch">
                <input type="checkbox" checked={this.state.naturalnessModule.naturalness_activated} onChange={this.onToggleNaturalness} className="custom-control-input" id="naturalness_switch"/>
                <label className="custom-control-label" htmlFor="naturalness_switch">Toggle Naturalness</label>
            </div>
            <hr/>
            <p>Your mission is to test the GUI of the web application.<br/> 
            You have to find the bugs hidden in the QUIZZ. To find the bugs, you have to click on the buttons of the quizz.<br/> 
            Their is no bug to find on the Start/Pause button</p>
        </div>
    }
}