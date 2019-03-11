import React, {
  Component
} from 'react'
import DifficultySelectionPage from './DifficultySelectionPage/DifficultySelectionPage'
import QuestionsPage from './QuestionPage/QuestionPage'
import ResultPage from './ResultPage/ResultPage'
import IntroPage from './IntroPage/IntroPage'
import './App.css'
import config from '../config'
import QuestionModule from '../modules/questions/questions_module'
import seedrandom from 'seedrandom'
import NaturalnessModule from '../modules/naturalness/naturalness_module'
import ExperimentPage from './ExperimentPage/experiment_page'
import ExperimentModule from '../modules/experiment/experimentModule'
import BugModule from '../modules/bug/bug_module';

class App extends Component {

  constructor(props) {
    super(props)
    seedrandom(config.random_seed, { global: true });
    this.state = {
      current_step: "intro",
      questionModule: new QuestionModule(),
      naturalnessModule: new NaturalnessModule(),
      experimentModule: new ExperimentModule(),
      bugModule: new BugModule()
    }
    this.notifyRestart = this.notifyRestart.bind(this)
    this.notifyExperimentFinished = this.notifyExperimentFinished.bind(this)
    this.onDifficultySelected = this.onDifficultySelected.bind(this)
    this.state.experimentModule.addObserver(this)
    this.state.experimentModule.addObserver(this.state.naturalnessModule)
  }

  notifyRestart() {
    this.setState({
      current_step: "difficulty_selection"
     })
  }

  notifyIntroFinished = () => {
    this.setState({
      current_step: "difficulty_selection"
      })
  }

  notifyExperimentFinished () {
    console.log("xp finished")
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

    if (step === "intro") {
      page_content = <IntroPage notifyIntroFinished = {this.notifyIntroFinished}
                                experimentModule = {this.state.experimentModule}s/>
    }
    const xp_page = <ExperimentPage question_module = {this.state.questionModule}
                                    experiment_module = {this.state.experimentModule}
                                    naturalnessModule = {this.state.naturalnessModule}
                                    notifyExperimentFinished = {this.notifyExperimentFinished}/>
                                    
    if (step === "difficulty_selection") {
      page_content =
      <div className="row">
        <div className="col">
          <DifficultySelectionPage questionsOptions={this.state.questionsOptions}
                                          naturalnessModule={this.state.naturalnessModule}
                                          bugModule = {this.state.bugModule}
                                          notifyDifficultySelected = {this.onDifficultySelected} 
                                          experimentModule = {this.state.experimentModule}
                                          />
        </div>
        <div className="col-2">
            {xp_page}
        </div>
      </div>

    } else if (step === "questions") {
      page_content = <div className="row">
        <div className="col">
          <QuestionsPage question_module = { this.state.questionModule }
                                naturalnessModule={this.state.naturalnessModule}
                                notifyQuestionsAnswered = {this.onQuestionsAnswered } 
                                notifyCancel = {this.notifyRestart} 
                                bugModule = {this.state.bugModule}
                                experimentModule = {this.state.experimentModule}
                                />
        </div>
        <div className="col-2">
            {xp_page}
        </div>
      </div>
    } else if (step === "result") {
      page_content =  <div className="row">
                          <div className="col">
                            <ResultPage question_module = { this.state.questionModule }
                                          naturalnessModule={this.state.naturalnessModule}
                                          answers = { this.state.answers }
                                          notifyRestart = { this.notifyRestart }
                                          bugModule = {this.state.bugModule}
                                          experimentModule = {this.state.experimentModule}
                                          />
                          </div>
                          <div className="col-2">
                            {xp_page}
                          </div>
                        </div>

    }
    return <div className="container main_page">
      {page_content}
    </div>
  }
}

export default App