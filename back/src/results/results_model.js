const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
    assistant_enabled: Boolean,
    time: Number,
    level1: Number,
    level2: Number,
    level3: Number,
    level4: Number,
    level5: Number,
    level1_found: Number,
    level2_found: Number,
    level3_found: Number,
    level4_found: Number,
    level5_found: Number,

})

module.exports = mongoose.model('Results', ResultSchema);