import React, {Component} from 'react'
import "./questionPage.css";


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
            question_module: this.props.question_module,
            naturalnessModule: this.props.naturalnessModule,
            bugModule: this.props.bugModule
        }
    }

    handleAnswerChanged = (changeEvent) => {
        this.state.naturalnessModule.notify(changeEvent.target)
        this.state.bugModule.notifyEvent(changeEvent.target.id)

        const answers = this.state.answers;
        const question_index = parseInt(changeEvent.target.name)
        answers[question_index] = (changeEvent.target.value  === 'true')
        this.setState({answers})
        this.forceUpdate()
    }

    handleSubmit = (submitEvent) => {
        submitEvent.preventDefault();
        this.props.notifyQuestionsAnswered(this.state.answers)
    }

    handleCancel = (cancelEvent) => {
        this.state.naturalnessModule.notify(cancelEvent.target)
        this.state.bugModule.notifyEvent(cancelEvent.target.id)
        cancelEvent.preventDefault();
        this.props.notifyCancel();
    }

    handleValidate = (validateEvent) => {
        this.state.naturalnessModule.notify(validateEvent.target)
        this.state.bugModule.notifyEvent(validateEvent.target.id)
        this.forceUpdate()
    }

    render() {
        return <form id="question-form" className="form-group" onSubmit={this.handleSubmit}>
                {this.state.question_module.questions.map((question, index) =>
                    <div key={index}>
                        Question {index}
                        <div  className="row">
                        <div className="col-form-label col-sm-4 pt-0">
                            <span className="unary_operator">{question.left_unary} </span> 
                            <span className="operand">{question.left_operand} </span>
                            <span className="operator">{question.operator} </span>
                            <span className="unary_operator">{question.right_unary} </span> 
                            <span className="operand">{question.right_operand}</span>
                        </div>                        
                        <div className="col-sm-6">
                            <div className="form-check">
                                {this.state.naturalnessModule.applyMask(
                                    <input type="radio" 
                                    id={"true-radio-" + this.state.question_module.questions.length + "-" + index}
                                    className="form-check-input"
                                    name={index} 
                                    value={true}
                                    required
                                    checked={this.state["answers"][index] === true}
                                    onChange={this.handleAnswerChanged}
                                />
                                )}
                                
                                <label className="form-check-label" htmlFor={"true-radio-" + index}>True</label>
                            </div>

                            <div className="form-check">
                                {this.state.naturalnessModule.applyMask(
                                    <input type="radio" 
                                        className="form-check-input"
                                        id={"false-radio-" + this.state.question_module.questions.length + "-" + index}
                                        name={index} 
                                        value={false}
                                        checked={this.state["answers"][index] === false}
                                        onChange={this.handleAnswerChanged}
                                        />
                                )}
                                <label className="form-check-label" htmlFor={"false-radio-" + index}>False</label>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                    
                )}
                {this.state.naturalnessModule.applyMask(
                    <button type="submit" 
                            id="validate_button"
                            onClick={this.handleValidate}
                            className="btn btn-primary">
                            Validate
                    </button>
                )}
                {this.state.naturalnessModule.applyMask(
                    <button type="button" 
                            id="cancel_button"
                            onClick={this.handleCancel}
                            className="btn btn-secondary">
                            Cancel
                    </button>
                )}
            </form>
    }
}