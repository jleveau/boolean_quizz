
import React, {Component} from 'react'
import logo from './quizz.svg'
import DifficultyItem from './DifficultyItem'


export default class DifficultySelectionPage extends Component {

    render() {
        return <div id="difficulty-selection">
            <img src={logo} alt="Quizz"></img>
            <DifficultyItem name="Easy" notifyDifficultySelected={this.props.notifyDifficultySelected}></DifficultyItem>
            <DifficultyItem name="Medium" notifyDifficultySelected={this.props.notifyDifficultySelected}></DifficultyItem>
            <DifficultyItem name="Hard" notifyDifficultySelected={this.props.notifyDifficultySelected}></DifficultyItem>
        </div>
    }
}