import BooleanQuestion from './question'

const unary_operator = ["!", ""]
const binary_operators = ["AND", "OR"]
const operand = ["TRUE", "FALSE"]

export default class QuestionModule {

    constructor() {
        this.keeped_answers = {}
        this.bug_observers = []
    }


    createQuestions(n) {
        const questions = []
        for (let i = 0; i < n; ++i) {
            questions.push(new BooleanQuestion(
                unary_operator[Math.floor(Math.random() * unary_operator.length)],
                operand[Math.floor(Math.random() * operand.length)],
                binary_operators[Math.floor(Math.random() * unary_operator.length)],
                unary_operator[Math.floor(Math.random() * operand.length)],
                operand[Math.floor(Math.random() * binary_operators.length)]
            ))
        }
        this.questions = questions
    }

    computeResult(answers) {
        if (!this.questions) {
            throw new Error("Questions are not defined")
        }
        // Compute the result
        const results = this.questions.map((question, index) => {
            let result = question.resolve(answers[index])
            return result
        })
        return results.filter(result => result).length
    }
}