import React, {Component} from 'react'
import "./questionPage.css";
import QuizzRadio from '../Components/quizz_radio';
import QuizzButton from '../Components/quizz_button';


export default class QuestionPage extends Component {

    constructor(props) {
        
        super(props);
        const answers = []
        const keeped_answers = this.props.question_module.keeped_answers
        for (const i in keeped_answers) {
            answers[i] = keeped_answers[i]
        }
        this.state = {
            answers,
            question_module: this.props.question_module
        }
    }

    handleAnswerChanged = (changeEvent) => {
        const answers = this.state.answers;
        const question_index = parseInt(changeEvent.target.name)
        answers[question_index] = (changeEvent.target.value  === 'true')
        this.setState({answers})
        if (this.state.question_module.isVisualBugTriggered(this.state.question_module.questions[question_index], answers)) {
            alert("Bug Found")
        }
    }

    handleValidate = (changeEvent) => {
        changeEvent.preventDefault();
        this.props.notifyQuestionsAnswered(this.state.answers)
    }

    handleCancel = (cancelEvent) => {
        cancelEvent.preventDefault();
        this.props.notifyCancel();
    }

    render() {
        return <form id="question-form" className="form-group" onSubmit={this.handleValidate}>
                {this.state.question_module.questions.map((question, index) =>
                    <div key={index}>
                        Question {index}
                        <div  className="row">
                        <div className="col-form-label col-sm-2 pt-0">
                            <span className="unary_operator">{question.left_unary} </span> 
                            <span className="operand">{question.left_operand} </span>
                            <span className="operator">{question.operator} </span>
                            <span className="unary_operator">{question.right_unary} </span> 
                            <span className="operand">{question.right_operand}</span>
                        </div>                        
                        <div className="col-sm-10">
                        
                            <div className="form-check">
                                <QuizzRadio type="radio" 
                                        id={"true-radio-" + index}
                                        className="form-check-input"
                                        name={index} 
                                        value={true}
                                        required
                                        checked={this.state["answers"][index] === true}
                                        handle={this.handleAnswerChanged}
                                    />
                                <label className="form-check-label" htmlFor={"true-radio-" + index}>True</label>
                            </div>

                            <div className="form-check">
                                <QuizzRadio type="radio" 
                                        className="form-check-input"
                                        id={"false-radio-" + index}
                                        name={index} 
                                        value={false}
                                        checked={this.state["answers"][index] === false}
                                        handle={this.handleAnswerChanged}
                                        />
                                <label className="form-check-label" htmlFor={"false-radio-" + index}>False</label>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                    
                )}

                <QuizzButton type="submit" 
                        id="validate_button"
                        className="btn btn-primary">
                        Validate
                </QuizzButton>
                <QuizzButton type="button" 
                        id="cancel_button"
                        handle={this.handleCancel}
                        className="btn btn-secondary">
                        Cancel
                </QuizzButton>
            </form>
        
    }
}