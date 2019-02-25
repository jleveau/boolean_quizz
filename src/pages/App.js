import React, {
  Component
} from 'react'
import DifficultySelectionPage from './DifficultySelectionPage/DifficultySelectionPage'
import QuestionsPage from './QuestionPage/QuestionPage'
import ResultPage from './ResultPage/ResultPage'
import './App.css'
import config from '../config'
import QuestionModule from '../modules/questions/questions_module'
import seedrandom from 'seedrandom'
import NaturalnessModule from '../modules/naturalness/naturalness_module'
import ExperimentPage from './ExperimentPage/experiment_page'

class App extends Component {

  constructor(props) {
    super(props)
    seedrandom(config.random_seed, { global: true });
    this.state = {
      current_step: "difficulty_selection",
      questionsOptions: config.questionsOptions,
      questionModule: new QuestionModule(),
      naturalnessModule: new NaturalnessModule(),
    }
  }

  onDifficultySelected = (nb_questions) => {
    this.state.questionModule.createQuestions(nb_questions)
    this.setState({
      current_step: "questions"
    })
  }

  onQuestionsAnswered = (answers) => {
    this.state.questionModule.applyKeepBugs(answers)
    this.setState({
      current_step: "result",
      answers
    })
  }

  notifyRestart = () => {
    this.setState({
      current_step: "difficulty_selection"
    })
  }

  render() {
    const step = this.state.current_step
    let page_content;
    if (step === "difficulty_selection") {
      page_content = <DifficultySelectionPage questionsOptions={this.state.questionsOptions}
                                              naturalnessModule={this.state.naturalnessModule}
                                              notifyDifficultySelected = {this.onDifficultySelected} />

    } else if (step === "questions") {
      page_content = <QuestionsPage question_module = { this.state.questionModule }
                            naturalnessModule={this.state.naturalnessModule}
                            notifyQuestionsAnswered = {this.onQuestionsAnswered } 
                            notifyCancel = {this.notifyRestart} />
                            
    } else if (step === "result") {
      page_content = <ResultPage question_module = { this.state.questionModule }
                         naturalnessModule={this.state.naturalnessModule}
                         answers = { this.state.answers }
                         notifyRestart = { this.notifyRestart }
                         />
    }
    return <div className="container main_page">
      {page_content}
      <ExperimentPage question_module = {this.state.questionModule}/>
    </div>
  }
}

export default App