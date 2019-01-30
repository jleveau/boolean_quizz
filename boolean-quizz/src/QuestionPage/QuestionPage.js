
import React, {Component} from 'react'

const unary_operator = ["!", ""]
const binary_operators = ["AND", "OR"]
const operand = ["TRUE", "FALSE"]

export default class QuestionPage extends Component {

    createQuestion() {
        return {
            left_unary: unary_operator[Math.floor(Math.random() * unary_operator.length)],
            left_operand: operand[Math.floor(Math.random() * operand.length)],
            right_unary: unary_operator[Math.floor(Math.random() * unary_operator.length)],
            right_operand: operand[Math.floor(Math.random() * operand.length)],
            operator: binary_operators[Math.floor(Math.random() * binary_operators.length)],
        }
    }

    render() {
        const questions = []
        for (let i = 0; i < this.props.nb_questions; ++i) {
            questions.push(this.createQuestion())
        }
        return <div>
            <h1>Questions</h1>
            <form>
                {questions.map((question, index) => 
                    <div>
                        <label>{index+1}.
                            {question.left_unary}{question.left_operand} {question.operator} {question.right_unary}{question.right_operand}
                            <label><input type="radio" name={"question" + index} value="True"/>True </label>
                            <label><input type="radio" name={"question" + index} value="False"/>False</label>
                        </label> 
                    </div>
                )}            
                </form>
            <button type="submit">Validate</button>
        </div>
    }
}