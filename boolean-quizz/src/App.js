import React, {
  Component
} from 'react'
import DifficultySelectionPage from './DifficultySelectionPage/DifficultySelectionPage'
import QuestionsPage from './QuestionPage/QuestionPage'
import ResultPage from './ResultPage/ResultPage'
import './App.css'
import config from './config'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current_step: "difficulty_selection",
      nb_bugs: config.nb_bugs
    }
  }

  onDifficultySelected = (nb_questions) => {
    this.setState({
      nb_questions: parseInt(nb_questions),
      current_step: "questions"
    })
  }

  onQuestionsAnswered = (questions, answers) => {
    this.setState({
      current_step: "result",
      questions,
      answers
    })
  }

  render() {
    const step = this.state.current_step
    let page_content;
    if (step === "difficulty_selection") {
      page_content = <DifficultySelectionPage notifyDifficultySelected = {this.onDifficultySelected} />
    } else if (step === "questions") {
      page_content = <QuestionsPage nb_questions = { this.state.nb_questions }
                            notifyQuestionsAnswered = {this.onQuestionsAnswered } />
    } else if (step === "result") {
      page_content = <ResultPage questions = { this.state.questions }
                         answers = { this.state.answers }
                         nb_bugs = { this.state.nb_bugs }/>
    }
    return <div className="container main_page">
      {page_content}
    </div>
  }
}

export default App