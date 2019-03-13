const ResultModel = require('./results_model')
class ResultManager {

    register(data) {
        const result = new ResultModel(data);
        return new Promise((resolve, reject) => {
            result.save((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    getAll() {
        return new Promise((resolve, reject) => {
            ResultModel.find({}, (err, data) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(data)
                }
            })
        })
    }

}

module.exports = new ResultManager()