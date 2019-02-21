
import React, {Component} from 'react'
import './DifficultySelectionPage.css'
import QuizzButton from '../Components/quizz_button';


export default class DifficultySelectionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionsOptions: props.questionsOptions 
        }
    }

    notifyDifficultySelected = (event) => {
        this.props.notifyDifficultySelected(event.target.value)
    }

    render() {
        return <div id="difficulty-selection" className="jumbotron">
          <h1 className="display-4">Quizz !</h1>
          <p className="lead">How many questions ?</p>
          <hr className="my-4"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                {this.state.questionsOptions.map((option, index) => 
                    <QuizzButton key={index}
                            name={"question_options-" + option }
                            type="button" 
                            className="btn btn-secondary" 
                            value={option} 
                            handle={this.notifyDifficultySelected}>{option}
                    </QuizzButton>)}
            </div>
        </div>
    }
}