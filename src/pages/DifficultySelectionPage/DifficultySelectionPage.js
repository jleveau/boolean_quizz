
import React, {Component} from 'react'
import './DifficultySelectionPage.css'


export default class DifficultySelectionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifyDifficultySelected: props.notifyDifficultySelected,
            questionsOptions: props.questionsOptions,
            naturalnessModule: props.naturalnessModule,
            experimentModule: props.experimentModule,
            stopped: !props.experimentModule.experiment_running
        }
        this.state.experimentModule.addObserver(this)
        this.handleSelected = this.handleSelected.bind(this)
    }

    notifyExperimentStart() {
        this.setState({
            stopped: false
        })
    }

    notifyExperimentStop() {
        this.setState({
            stopped: true
        })
    }

    handleSelected = (event) => {
        this.state.notifyDifficultySelected(event.target.value)
        this.state.naturalnessModule.notify(event.target)
    }

    getOptions_probas

    render() {
        return <div id="difficulty-selection" className="jumbotron">
          <h1 className="display-4">Quizz !</h1>
          <p className="lead">How many questions ?</p>
          <hr className="my-4"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                {this.renderQuestionsOptions()}
            </div>
        </div>
    }

    renderQuestionsOptions() {
        return this.state.questionsOptions.map((option, index) => 
            this.state.naturalnessModule.applyMask(
                <button key={index}
                    id={"question_options-" + option}
                    name={"question_options-" + option }
                    className="btn btn-secondary" 
                    onClick={this.handleSelected}
                    disabled={this.state.stopped}
                    value={option}>
                    {option}
                </button>))
    }
    
}