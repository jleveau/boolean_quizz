import React, { Component } from 'react'
import DifficultySelectionPage from './DifficultySelectionPage/DifficultySelectionPage'
import QuestionsPage from './QuestionPage/QuestionPage'
import ResultPage from './ResultPage/ResultPage'
import './App.css'

const question_per_difficulty = {
  Easy: 2,
  Medium: 5,
  Hard: 10
}

class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      current_step: "difficulty_selection"
    }
  }

  onDifficultySelected = (difficulty) => {
    this.setState({
      difficulty: difficulty,
      current_step: "questions"
    })
  } 

  onQuestionsAnswered = (answered_questions) => {
    this.setState({
      current_step: "result",
      answered_questions: answered_questions
    })
  }

  render() {
    const step = this.state.current_step
    if (step === "difficulty_selection") {
      return <DifficultySelectionPage notifyDifficultySelected={this.onDifficultySelected}/>
    }
    else if (step === "questions") {
      return  <QuestionsPage nb_questions={question_per_difficulty[this.state.difficulty]}/>
    } else if (step === "result") {
      return <ResultPage/>
    }
  }
}

export default App