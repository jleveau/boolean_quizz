
export default class NaturalnessModule {

    constructor() {
        this.nb_bug_found = 0
        this.experiment_running = false
        this.experiment_finished = false
        this.time_for_experiment = 0
        this.observers = []
    }

    toggleExperiment() {
        this.experiment_running = !this.experiment_running
        if(this.experiment_running) {
            this.notifyExperimentStart()
        } else {
            this.notifyExperimentStop()
        }
    }

    notifyBugTrigger() {
        this.nb_bug_found++
    }

    finishExperiment() {
        this.finishExperiment = true
        this.notifyExperimentFinished()
    }

    notifyExperimentStart() {
        this.observers.forEach(observer => {
            if (observer.notifyExperimentStart) {
                observer.notifyExperimentStart()
            }
        })
    }

    notifyExperimentStop() {
        this.observers.forEach(observer => {
            if (observer.notifyExperimentStop) {
                observer.notifyExperimentStop()
            }
        })
    }

    notifyExperimentFinished() {
        this.observers.forEach(observer => {
            if (observer.notifyExperimentFinished) {
                observer.notifyExperimentFinished()
            }
        })
    }

    notifyNaturalnessToggled() {
        this.observers.forEach(observer => {
            if (observer.notifyNaturalnessToggled) {
                observer.notifyNaturalnessToggled()
            }
        })
    }

    addObserver(o) {
        this.observers.push(o)
    }

}