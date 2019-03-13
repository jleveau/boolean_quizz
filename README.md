
## Available Scripts

In the project directory, you can run:

### 'docker build --tag=quizz .'
build a docker image

### 'npm run-script bugs [nb_bugs ...]
Instantiate a configuration file describing bugs.  
This configuration file is read by the application to introduce "bugs"  
this configuration file is located in /src/bugs.json  

for example :   
    npm run-script bugs 10 0 0 1 
    
This command creates bugs for a quizz of 10 questions, with :  
0 bug of level 0   
0 bug of level 1   
1 bug of level 2.  

In this example, a popup will be triggered if you answer something in the question 8, when the question 5 and 4 are answered true  

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

