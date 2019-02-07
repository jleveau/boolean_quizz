
import React, {Component} from 'react'
import QuestionModule from '../modules/questions/questions_module'

export default class ResultPage extends Component {

    constructor(props) {
        super(props);
        const score = this.props.question_module.computeResult(props.answers)
        const global_result = (score === this.props.question_module.questions.length)

        this.state = {
            answers: props.answers,
            question_module: this.props.question_module,
            global_result,
            score,
        }
    }

    render() {
        return <div className={this.state.global_result ? "alert alert-success" : "alert alert-danger" } role="alert">
            <h4 id="result" className="alert-heading">{this.state.global_result ? "Correct !" : "Wrong !"} - Score : {this.state.score} / {this.state.question_module.questions.length}</h4>
        </div>
    }

}

