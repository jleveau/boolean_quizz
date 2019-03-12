import bugs_description from '../../bugs.json'
import Bug from './bug'
export default class BugModule {
    
    constructor() {
        this.bugs = []
        //longest level of a bug
        this.sequence_size = 0
        this.sequence = []
        for (let level in bugs_description) {
            level = parseInt(level) 
            if (level > this.sequence_size) {
                this.sequence_size = level
            }
            for (const sequence of bugs_description[level]) {
                const bug = new Bug(sequence)
                this.bugs.push(bug)                
            }
        }
        this.observers = []
    }

    addObserver(obs) {
        this.observers.push(obs)
    }

    notifyEvent(input) {
        this.sequence.push(input)
        if (this.sequence.length > this.sequence_size) {
            this.sequence.shift()
        }
        this.bugs.forEach(bug => {
            if (bug.isTriggered(this.sequence)) {
                bug.triggered = true;
                this.observers.forEach(obs => obs.notifyBugTriggered(bug))
            }
        })
    }

}
