import React from 'react'

import QuizzComponent from './quizz_component'

export default class QuizzButton extends QuizzComponent {


    render() {
        return <button {...this.props} onClick={this.handle}></button>
    }

}