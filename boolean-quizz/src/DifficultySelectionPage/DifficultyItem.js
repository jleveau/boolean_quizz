
import React, {Component} from 'react'



export default class DifficultyItem extends Component {

    onClick = (event) => {
        this.props.notifyDifficultySelected(this.props.name)
    }

    render() {
        return <button type="button" onClick={this.onClick}>{this.props.name}</button>
    }
}