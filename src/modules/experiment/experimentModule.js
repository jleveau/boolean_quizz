
export default class ExperimentModule {

    constructor() {
        this.nb_bug_found = 0
        this.experiment_finished = false
        this.observers = []
    }

    showAlertMessage() {
        alert("You have found a bug")
    }

    notifyBugTrigger() {
        this.nb_bug_found++
    }

    addObserver(o) {
        this.observers.push(o)
    }

}