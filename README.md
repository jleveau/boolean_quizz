
## Available Scripts

In the project directory, you can run:

### 'npm run-script bugs [nb_bugs ...]
Instantiate a configuration file describing bugs.
This configuration file is read by the application to introduce "bugs" 

for example : 
    npm run-script bugs 10 0 0 1
    
This command creates bugs for a quizz of 10 questions, with :
0 bug of level 0 
0 bug of level 1 
1 bug of level 2.

The level of the bug determine the number of conditions to trigger the bug.

The generated configuration file looks like : 

{
    "question": 8,
    "effect": "visual",
    "dependencies": [
      {
        "question": 5,
        "value": true
      },
      {
        "question": 4,
        "value": true
      }
    ]
  }

In this example, a popup will be triggered if you answer something in the question 8, when the question 5 and 4 are answered true

question : the index of the question that triggers the bug
effect : 
    visual : triggering the bug open an alert
    score : triggering the bug change the expected result of the question
dependencies : conditions for the bug to be triggered. 
    To fulfill a condition, the questions specified in the dependency must be answered with the value specified value

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

