const dev = {
    mongo: 'mongodb://localhost:27017/QuizzXP'
}

const prod = {
    mongo: 'mongodb://localhost:27017/QuizzXP'
}

if (process.env.NODE_ENV === prod) {
    module.exports = prod
} else {
    module.exports = dev
}