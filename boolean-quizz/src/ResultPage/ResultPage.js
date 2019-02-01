
import React, {Component} from 'react'


export default class ResultPage extends Component {

    constructor(props) {
        super(props);
        const {global_result, results} = this.computeResult(props.questions, props.answers, props.nb_bugs)

        this.state = {
            answers: props.answers,
            questions: props.questions,
            global_result: global_result,
            results: results,
        }
    }

    computeResult(questions, answers, nb_bugs) {
        const results = []
        // Compute the result
        for(let i = 0; i< questions.length; ++i) {
            const question = questions[i];
            const answer = answers[i]

            let left = question.left_operand === "TRUE"
            let right = question.right_operand === "TRUE"
            if (question.left_unary === "!") {
                left = !left
            }
            if (question.right_unary === "!") {
                right = !right
            }
            let result;
            if (question.operator === "OR") {
                const value = left || right
                result = (value === answer )
            } else if (question.operator === "AND") {
                const value = left && right
                result = (value === answer)
            }
            results.push(result)
        }

        // Introduce errors in the results
        let indexes = results.map((result, index) => index)
        indexes = shuffle(indexes).slice(0, nb_bugs)
        indexes.forEach((index) => {results[index] = !results[index]})  
        const global_result = results.every(result => result)
        return {
            global_result: global_result,
            results
        }
    }

    render() {
        return <div className={this.state.global_result ? "alert alert-success" : "alert alert-danger" } role="alert">
            <h4 id="result" className="alert-heading">{this.state.global_result ? "Correct !" : "Wrong !"}</h4>
        </div>
    }

}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}