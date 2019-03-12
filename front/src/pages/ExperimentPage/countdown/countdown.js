import React, {
    Component
} from 'react'
import moment from 'moment'

export default class Countdown extends Component {

    constructor(props) {
        super(props)

        this.tick = this.tick.bind(this)
        this.start = this.start.bind(this)

        this.state = {
            total_time: props.total_time,
            remaining_time: props.total_time,
            callback_finished: props.callback_finished,
            started: true,
            interval: setInterval(this.tick, 1000),
            observers: [],

        }
    }

    tick() {
        if (this.state.remaining_time > 0) {
            this.setState({
                remaining_time: this.state.remaining_time - 1
            })
        }
        if (this.state.remaining_time - 1 < 0) {
            this.state.callback_finished()
            clearInterval(this.state.interval)
        }
    }

    start() {
        this.setState({
            interval: setInterval(this.tick, 1000),
            started: true
        })
    }

    // time in seconds
    displayTime(time) {
        return moment.utc(time*1000).format('mm:ss');
    }

    render() {
        return <div> Remaining time : {this.displayTime(this.state.remaining_time)}</div>
    }

}
