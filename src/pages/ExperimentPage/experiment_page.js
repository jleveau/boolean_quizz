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
            nb_bug_found: 0,
            countdown_finished: props.countdown_finished,
            notifyExperimentFinished: props.notifyExperimentFinished
        }
        this.notifyBugTrigger = this.notifyBugTrigger.bind(this)
        this.onToggleNaturalness = this.onToggleNaturalness.bind(this)
        this.finished = this.finished.bind(this)
    }

    notifyBugTrigger() {
        this.setState({
            nb_bug_found: this.state.question_module.getNbBugTriggered()
        })
    }

    finished() {
        this.state.notifyExperimentFinished()
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
                <Countdown total_time={config.xp_time} callback_finished={this.finished}/>
            </div>
        </div>
    }
}