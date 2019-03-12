
export default class ExperimentModule {

    constructor() {
        this.nb_bug_found = 0
        this.experiment_finished = false
    }

    showAlertMessage() {
        alert("You have found a bug")
    }

    notifyBugTriggered(bug) {
        this.showAlertMessage()
        this.nb_bug_found++
    }

}