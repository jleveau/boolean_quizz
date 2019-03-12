const puppeteer = require('puppeteer');
const fs = require('fs')
const SEQUENCE_LENGTH = 100
const EVENTS = [
    'question_options-1',
    'question_options-3',
    'question_options-5',

    'true-radio-1-0',
    'false-radio-1-0',
    'validate_button',
    'cancel_button',

    'true-radio-3-0',
    'true-radio-3-1',
    'true-radio-3-2',
    'false-radio-3-0',
    'false-radio-3-1',
    'false-radio-3-2',

    'true-radio-5-0',
    'true-radio-5-1',
    'true-radio-5-2',
    'true-radio-5-3',
    'true-radio-5-4',
    'false-radio-5-0',
    'false-radio-5-1',
    'false-radio-5-2',
    'false-radio-5-3',
    'false-radio-5-4',
    'restart']

class SequenceGenerator {
    
    async getAvailableEvents() {
        return await this.page.evaluate((selectors) => {
            const existing_selectors = []
            for (const selector of selectors) {
                if (document.getElementById(selector)) {
                    existing_selectors.push(selector)
                }
            }
            return existing_selectors
        }, EVENTS)
    }

    // Giving previous event, to avoid picking the same event
    async next(previous) {
        let event;
        do {
            const available_events = await this.getAvailableEvents()
            const index = Math.floor(Math.random() * available_events.length)
            event = available_events[index]
        } while(event === previous)
       
        await this.page.click(`#${event}`)
        return event
    }

    async generateSequence() {
        const sequence = []
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();

        await this.page.goto('http://localhost:3000/');
        await this.page.click('#next');
        await this.page.click('#start');
        let event
        for (let i=0; i<SEQUENCE_LENGTH; ++i) {
            event = await this.next(event)
            sequence.push(event)
        }
        await this.browser.close();
        return sequence
    }
}

const levels = []
for (let i= 2; i< process.argv.length; ++i) {
    levels[i-2] = process.argv[i]
}
new SequenceGenerator().generateSequence()
    .then((sequence) => {
        const sequences_per_level = {}
        for (let i = 0; i < levels.length; ++i) {
            let sequence_for_level = []
            while (levels[i] > 0) {
                // Cut a sequence of length i
                const min_index = Math.floor(Math.random() * sequence.length - (i+1))
                sequence_for_level.push(sequence.slice(min_index, min_index + i+1))
                --levels[i]
            }
            sequences_per_level[i+1] = sequence_for_level
        }
        fs.writeFileSync("./src/bugs.json", JSON.stringify(sequences_per_level, null, 2))
    })
    .catch((err) => {
    console.log(err)
})
