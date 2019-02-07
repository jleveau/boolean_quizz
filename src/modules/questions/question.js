export default class BooleanQuestion {

    constructor(left_unary, left_operand, operator, right_unary, right_operand, bugs = []) {
        this.left_unary = left_unary
        this.left_operand = left_operand
        this.operator = operator
        this.right_unary = right_unary
        this.right_operand = right_operand
        this.bugs = bugs
    }

    resolve(answer_given) {
        let left = this.left_operand === "TRUE"
        let right = this.right_operand === "TRUE"
        if (this.left_unary === "!") {
            left = !left
        }
        if (this.right_unary === "!") {
            right = !right
        }
        if (this.operator === "OR") {
            const value = left || right
            return (value === answer_given )
        } else if (this.operator === "AND") {
            const value = left && right
            return (value === answer_given)
        } else throw new Error("Failed to resolve question " + this)        
    }
    
}