import {
    Component
} from 'react'
import NaturalnessModule from '../modules/naturalness/naturalness_module';

export default class QuizzComponent extends Component {

    constructor(props) {
        super(props)
        this.handle = this.handle.bind(this);
    }

    handle(e) {
        this.props.handle(e)
        QuizzComponent.naturalnessModule.notifyClick(e.target)
    }

}
QuizzComponent.naturalnessModule = new NaturalnessModule()