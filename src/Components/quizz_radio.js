import React from 'react'

import QuizzComponent from './quizz_component'

export default class QuizzRadio extends QuizzComponent {


    render() {
        return <input {...this.props} onChange={this.handle}></input>
    }

}