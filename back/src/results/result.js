const ResultModel = require('./results_model')
class ResultManager {

    register(data) {
        const result = new ResultModel(data);
        return async () => {
            try {
                result.save()
            } catch(e) {
                console.error(e)
            }
        }
    }

}

module.exports = new ResultManager()