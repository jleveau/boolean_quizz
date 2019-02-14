import BooleanQuestion from './question'
import bugs_descriptions from '../../bugs.json'
import { Bug } from './bugs';

const unary_operator = ["!", ""]
const binary_operators = ["AND", "OR"]
const operand = ["TRUE", "FALSE"]

export default class QuestionModule {

    constructor() {
        this.keeped_answers = {}
        this.bugs = bugs_descriptions.map((bug_description) => 
            new Bug(bug_description.question, 
                bug_description.effect, 
                bug_description.dependencies))
    }

    createQuestions(n) {
        const questions = []
        for (let i=0; i<n; ++i) {
            const bugs_for_question = this.bugs.filter(bug => bug.question === i)
            questions.push(new BooleanQuestion(
                unary_operator[Math.floor(Math.random() * unary_operator.length)],
                operand[Math.floor(Math.random() * operand.length)],
                binary_operators[Math.floor(Math.random() * unary_operator.length)],
                unary_operator[Math.floor(Math.random() * operand.length)],
                operand[Math.floor(Math.random() * binary_operators.length)],
                bugs_for_question
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
            if (this.isScoreBugTriggered(question, answers)) {
                result = !result
            }
            return result
        })
        return results.filter(result => result).length
    }

    applyKeepBugs(answers) {
        this.questions.forEach((question, index) => {
            if (this.isKeepBugTriggered(question, answers)) {
                this.keeped_answers[index] = answers[index]
            }
        })
    }

    isKeepBugTriggered(question, answers) {
        return question.bugs.some(bug =>bug.effect === 'keep') && this.isBugTriggered(question, answers)
    }

    isVisualBugTriggered(question, answers) {
        return question.bugs.some(bug =>bug.effect === 'visual') && this.isBugTriggered(question, answers)
    }

    isScoreBugTriggered(question, answers) {
        return question.bugs.some(bug => bug.effect === 'score') && this.isBugTriggered(question, answers)
    }

    isBugTriggered(question, answers) {

        return question.bugs.some(bug => {
                if (bug.dependencies.length === 0) {
                    return true
                } else {
                    return bug.dependencies.every(dependency => {
                        return answers[dependency.question] === dependency.value
                    })
                }
                 
        })
    }
}

