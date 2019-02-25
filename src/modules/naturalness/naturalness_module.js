import {
    Event,
    Sequence,
    NaturalnessModel
} from 'naturalness';
import config from '../../config'
import React from 'react'
const DEPTH = config.depth
const COLORS = config.colors

export default class NaturalnessModule {

    constructor() {
        this.components = []
        this.model = new NaturalnessModel()
        this.expedition = []
    }

    notify(element) {
        const eventname = getEventNameFromElement(element)
        if (!eventname) {
            throw new Error("Cannot find an id for element " + element.toString())
        }
        const event = new Event(eventname)

        if (this.expedition.length >= DEPTH) {
            this.expedition.shift();
        }
        this.expedition.push(event)

        const sequence = new Sequence(this.expedition)
        this.model.learn(sequence)
    }

    getEntropy(element) {
        const eventname = getEventNameFromElement(element)
        if (!eventname) {
            throw new Error("Cannot find an id for element " + element.props)
        }
        const event = new Event(eventname)
        const expedition = this.expedition.slice()
        expedition.push(event)
        const sequence = new Sequence(expedition)
        return this.model.crossEntropy(sequence)
    }

    applyMask(element) {
        const entropy = this.getEntropy(element)
        const color = COLORS[Math.floor(entropy * (COLORS.length-1))]
        return React.cloneElement(element, {style: {
            outline: `6px solid #${color}`
        }})
    }

}

function getEventNameFromElement(element) {
    return element.id || element.props.id
}