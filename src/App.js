import React, {
  Component
} from 'react'
import DifficultySelectionPage from './DifficultySelectionPage/DifficultySelectionPage'
import QuestionsPage from './QuestionPage/QuestionPage'
import ResultPage from './ResultPage/ResultPage'
import './App.css'
import config from './config'
import QuestionModule from './modules/questions/questions_module'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      current_step: "difficulty_selection",
      questionsOptions: config.questionsOptions,
      questionModule: new QuestionModule()
    }
  }

  onDifficultySelected = (nb_questions) => {
    this.state.questionModule.createQuestions(nb_questions)
    this.setState({
      current_step: "questions"
    })
  }

  onQuestionsAnswered = (answers) => {
    this.setState({
      current_step: "result",
      answers
    })
  }

  render() {
    const step = this.state.current_step
    let page_content;
    if (step === "difficulty_selection") {
      page_content = <DifficultySelectionPage questionsOptions={this.state.questionsOptions} 
                                              notifyDifficultySelected = {this.onDifficultySelected} />

    } else if (step === "questions") {
      page_content = <QuestionsPage question_module = { this.state.questionModule }
                            notifyQuestionsAnswered = {this.onQuestionsAnswered } />
                            
    } else if (step === "result") {
      page_content = <ResultPage question_module = { this.state.questionModule }
                         answers = { this.state.answers }
                         />
    }
    return <div className="container main_page">
      {page_content}
    </div>
  }
}

export default App