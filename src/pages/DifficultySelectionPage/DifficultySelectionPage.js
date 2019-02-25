
import React, {Component} from 'react'
import './DifficultySelectionPage.css'


export default class DifficultySelectionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notifyDifficultySelected: props.notifyDifficultySelected,
            questionsOptions: props.questionsOptions,
            naturalnessModule: props.naturalnessModule,

        }
        this.handleSelected = this.handleSelected.bind(this)
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
                    value={option}>
                    {option}
                </button>))
    }
    
}