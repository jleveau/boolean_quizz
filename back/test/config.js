const dev = {
    mongo: 'mongodb://localhost:27017/QuizzXP'
}

const prod = {
    mongo: 'mongodb://localhost:27017/QuizzXP'
}

const test = {
    mongo: 'mongodb://localhost:27017/QuizzXPTest'
}

if (process.env.NODE_ENV === 'prod') {
    module.exports = prod
} else if (process.env.NODE_ENV === 'test') {
    module.exports = test
} else {
    module.exports = dev
}