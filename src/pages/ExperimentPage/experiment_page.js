import React, {
    Component
} from 'react'
import "./experiment_page.css";


export default class ExperimentPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            question_module: props.question_module,
            nb_bug_found: props.question_module.getNbBugTriggered()
        }
        this.state.question_module.addBugsObserver(this)
        this.notifyBugTrigger = this.notifyBugTrigger.bind(this)
    }

    notifyBugTrigger() {
        this.setState({
            nb_bug_found: this.state.question_module.getNbBugTriggered()
        })
    }

    render() {
        return <div>
            <span>Bugs Found : {this.state.nb_bug_found}</span> 
        </div>
    }
}