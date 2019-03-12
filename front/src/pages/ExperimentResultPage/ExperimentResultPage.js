import './ExperimentResultPage.css'

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
            naturalnessModule: props.naturalnessModule
        }
    }

    render() {
        return <div>
            <table className="table">
                <thead>
                    {this.renderBugTableHeader()}                    
                </thead>
                <tbody>
                    {this.renderBugTableContent()}
                </tbody>
            </table>
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
}