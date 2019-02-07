const fs = require('fs')
const config = require("../src/config")
const bugs_file = config.bugfile

class BugGenerationModule {

    // Generate bugs, a bug on a question can require a specific value from other questions
    // A bugged question cannot depend of an other bugged question
    generateBugs(params) {
        const quizz_size = parseInt(params.shift())
        const complexity_array = params

        // Check if there is enough line in the quizz to create the bugs
        let nb_lines_required = 0
        complexity_array.forEach((bugs, complexity) => {
            nb_lines_required += (bugs * (complexity+1))
        })

        if (nb_lines_required >= quizz_size) {
            console.error("the quizz does not contain enough questions")
            process.exit()
        }

        //To be buggable, a line must not be already bugged, or be used to define a complex bug
        let buggable_lines = Array.from({length: quizz_size}, (x,i) => i);
        shuffle(buggable_lines)

        let bugs = []
        let cut;
        complexity_array.forEach((nb_bugs, complexity) => {
            cut = cutArray(buggable_lines, nb_bugs)
            const bugged_lines = cut[0]
            buggable_lines = cut[1]

            const bugs_for_complexity = []
            bugged_lines.forEach(bugged_line => {
                cut = cutArray(buggable_lines, complexity)
                buggable_lines = cut[1]

                bugs_for_complexity.push({
                    question: bugged_line,
                    effect: Math.random() >= 0.5 ? "visual" : "score",
                    dependencies: cut[0].map(question => ({
                        question,
                        value: Math.random() >= 0.5
                    })) 
                })
            });
            bugs = bugs.concat(bugs_for_complexity)
        })
        return bugs
    }

}

// Return n random lines, and remove them from the array
function cutArray(array, n) {
     return [array.slice(0, n), array.slice(n, array.length)]
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

const bugs = new BugGenerationModule().generateBugs(process.argv.slice(2))
fs.writeFileSync(bugs_file, JSON.stringify(bugs, null, 2))