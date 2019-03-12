export default class Bug {

    constructor(sequence) {
        this.sequence = sequence
        this.triggered = false
        this.level = sequence.length
    }

    isTriggered(sequence) {
        if (this.triggered) {
            return false
        }
       sequence = sequence.slice(sequence.length - this.level, sequence.length)
       for (let i=0; i< sequence.length; ++i) {
           if (sequence[i] !== this.sequence[i]) {
               return false
           }
       }
       return true
    }
}