import React, {Component} from 'react'
import config from '../config';
import "./questionPage.css";
const unary_operator = ["!", ""]
const binary_operators = ["AND", "OR"]
const operand = ["TRUE", "FALSE"]

export default class QuestionPage extends Component {

    constructor(props) {
        super(props);
        const questions = []
        for (let i = 0; i < this.props.nb_questions; ++i) {
            questions.push(this.createQuestion())
        }
        this.state = {
            answers: [],
            questions,
            nb_bugs: config.nbBugs
        }
    }

    createQuestion() {
        return {
            left_unary: unary_operator[Math.floor(Math.random() * unary_operator.length)],
            left_operand: operand[Math.floor(Math.random() * operand.length)],
            right_unary: unary_operator[Math.floor(Math.random() * unary_operator.length)],
            right_operand: operand[Math.floor(Math.random() * operand.length)],
            operator: binary_operators[Math.floor(Math.random() * binary_operators.length)],
        }
    }

    handleAnswerChanged = (changeEvent) => {
        const answers = this.state.answers;
        answers[parseInt(changeEvent.target.name)] = (changeEvent.target.value  === 'true')
        this.setState({answers})
    }

    handleValidate = (changeEvent) => {
        changeEvent.preventDefault();
        this.props.notifyQuestionsAnswered(this.state.questions, this.state.answers)
    }

    render() {
        return <form className="form-group" onSubmit={this.handleValidate}>
                {this.state.questions.map((question, index) =>
                    <div key={index}>
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
                                <input type="radio" 
                                        id={"true-radio-" + index}
                                        className="form-check-input"
                                        name={index} 
                                        value={true}
                                        required
                                        checked={this.state["answers"][index] === true}
                                        onChange={this.handleAnswerChanged}
                                    />
                                <label className="form-check-label" htmlFor={"true-radio-" + index}>True</label>
                            </div>

                            <div className="form-check">
                                <input type="radio" 
                                        className="form-check-input"
                                        id={"false-radio-" + index}
                                        name={index} 
                                        value={false}
                                        checked={this.state["answers"][index] === false}
                                        onChange={this.handleAnswerChanged}
                                        />
                                <label className="form-check-label" htmlFor={"false-radio-" + index}>False</label>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
                    
                )}

                <button type="submit" 
                        id="validate_button"
                        className="btn btn-primary">
                        Validate
                </button>
            </form>
        
    }
}