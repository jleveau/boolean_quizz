class BugGenerationModule {

    nodes =[
        'question_options-1',
        'question_options-3',
        'question_options-5',
        'true-radio-1-0',
        'false-radio-1-0',
        'validate_button',
        'cancel_button',
        'true-radio-3-0',
        'true-radio-3-1',
        'true-radio-3-2',
        'false-radio-3-0',
        'false-radio-3-1',
        'false-radio-3-2',
        'validate_button',
        'cancel_button',
        'true-radio-5-0',
        'true-radio-5-1',
        'true-radio-5-2',
        'true-radio-5-3',
        'true-radio-5-4',
        'false-radio-5-0',
        'false-radio-5-1',
        'false-radio-5-2',
        'false-radio-5-3',
        'false-radio-5-4',
        'validate_button',
        'cancel_button',
        'restart']
    

    generateBugs() {
        
    }
}

const bugs = new BugGenerationModule().generateBugs(process.argv.slice(2))
