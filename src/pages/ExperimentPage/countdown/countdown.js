import React, {
    Component
} from 'react'

export default class Countdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            total_time: props.total_time,
            remaining_time: props.total_time,
            callback_finished: props.callback_finished,
            callback_toggle: props.callback_toggle,
            started: false,
            interval: null,
            observers: [],

        }
        this.tick = this.tick.bind(this)
        this.start = this.start.bind(this)
        this.pause = this.pause.bind(this)
    }

    tick() {
        if (this.state.remaining_time > 0) {
            this.setState({
                remaining_time: this.state.remaining_time - 1
            })
        }
        if (this.state.remaining_time - 1 < 0) {
            this.state.callback_finished()
            this.pause()
        }
    }

    start() {
        this.setState({
            interval: setInterval(this.tick, 1000),
            started: true
        })
        this.state.callback_toggle()
    }

    pause() {
        clearInterval(this.state.interval)
        this.setState({
            started: false
        })
        this.state.callback_toggle()
    }

    render() {
        return <div>
            Remaining time : {this.state.remaining_time} / {this.state.total_time}
            <div>
            <button type="button" className="btn btn-info" hidden={this.state.started || this.state.remaining_time <= 0} onClick={this.start}>Start</button>
            <button type="button" className="btn btn-info" hidden={!this.state.started} onClick={this.pause}>Pause</button>
            </div>
        </div>
    }

}
