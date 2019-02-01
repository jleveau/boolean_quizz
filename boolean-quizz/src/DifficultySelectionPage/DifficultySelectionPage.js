
import React, {Component} from 'react'
import './DifficultySelectionPage.css'

export default class DifficultySelectionPage extends Component {

    onClick = (event) => {
        console.log(event.target.value)
        this.props.notifyDifficultySelected(event.target.value)
    }

    render() {
        return <div id="difficulty-selection" className="jumbotron">
          <h1 className="display-4">Quizz !</h1>
          <p className="lead">How many questions ?</p>
          <hr className="my-4"/>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary" value="2" onClick={this.onClick}>2</button>
                <button type="button" className="btn btn-secondary" value="5" onClick={this.onClick}>5</button>
                <button type="button" className="btn btn-secondary" value="10" onClick={this.onClick}>10</button>
            </div>
        </div>
    }
}