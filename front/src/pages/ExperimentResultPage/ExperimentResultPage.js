import './ExperimentResultPage.css'
import axios from 'axios'
import config from '../../config'

import React, {
    Component
} from 'react'

export default class ExperimentResultPage extends Component {
    
    constructor(props) {
        super(props)
        const levels = []
        for (const bug of props.bugModule.bugs) {
            if (!levels.includes(bug.level)) {
                levels.push(bug.level)
            }
        }
        this.state = {
            bugModule: props.bugModule,
            levels,
            naturalnessModule: props.naturalnessModule,
            hideAlertKO: true,
            hideAlertOK: true,
            data_sent: false
        }
        this.sendResultsToServer = this.sendResultsToServer.bind(this) 
    }

    render() {
        return <div>
            <div className={`alert alert-danger ${this.state.hideAlertKO ? 'hidden' : ''}`}  role="alert">
                {this.state.alertKOMessage}
            </div>
            <div className={`alert alert-success ${this.state.hideAlertOK ? 'hidden' : ''}`}  role="alert">
                {this.state.alertOKMessage}
            </div>
            <div className="container thank-you-container">
                <h2 className="display-4">Thank you for your participation!</h2>
            </div>
            <table className="table">
                <thead>
                    {this.renderBugTableHeader()}                    
                </thead>
                <tbody>
                    {this.renderBugTableContent()}
                </tbody>
            </table>
            <button className="btn btn-success"
                    disabled={`${this.state.data_sent ? 'hidden' : ''}`}
                    onClick={this.sendResultsToServer}>
                    Send my results
            </button>
        </div>
    }

    renderBugTableHeader() {
        return <tr>
            <th scope="col">Assistant enabled</th>
            <th scope="col">Total found</th>
            {this.state.levels.map((level, index) => 
                <th key={index} scope="col">level {level}</th>)}
        </tr>
    }

    renderBugTableContent() {
        return <tr>
            <td>{this.state.naturalnessModule.naturalness_activated ? "Yes" : "No"}</td>
            <td>{this.state.bugModule.getBugsTriggered().length}/{this.state.bugModule.getBugs().length}</td>
            {this.state.levels.map((level, index) => 
                <td key={index}>{this.state.bugModule.getBugsTriggered(level).length} / {this.state.bugModule.getBugs(level).length}</td>)}
        </tr>
    }

    async sendResultsToServer() {
        try {
            await axios.post(`${config.api_adresse}/result`, {
                result: {
                    assistant_enabled: this.state.naturalnessModule.naturalness_activated,
                    time: config.xp_time,
                    level1: this.state.bugModule.getBugs(1).length,
                    level2: this.state.bugModule.getBugs(2).length,
                    level3: this.state.bugModule.getBugs(3).length,
                    level4: this.state.bugModule.getBugs(4).length,
                    level5: this.state.bugModule.getBugs(5).length,
                    level1_found: this.state.bugModule.getBugsTriggered(1).length,
                    level2_found: this.state.bugModule.getBugsTriggered(2).length,
                    level3_found: this.state.bugModule.getBugsTriggered(3).length,
                    level4_found: this.state.bugModule.getBugsTriggered(4).length,
                    level5_found: this.state.bugModule.getBugsTriggered(5).length
                }
                
            })
            this.setState({
                alertOKMessage: "Your data have been sent",
                hideAlertOK: false,
                data_sent: true
            })
        } catch(error) {
            this.setState({
                alertKOMessage: "An error as occured when saving your results",
                hideAlertKO: false
            })
        }
    }
}