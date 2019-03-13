const assert = require('assert');
const ResultManager = require('../src/results/result')
const mongoose = require('mongoose')
const config = require('../test/config')


describe('Unit Testing', function() {
  before(async () => {
      await mongoose.connect(config.mongo, { useNewUrlParser: true })
      await mongoose.model('Results').deleteMany({})
      
  })
  after(async() => {
    await mongoose.connection.close()
  })
  describe('Result', function() {
    it('register result', async () => {
        await ResultManager.register(result1)
        const data = await ResultManager.getAll()
        assert(data.length === 1)
    });
  });
});

const result1 = {
    assistant_enabled: true,
    time: 60,
    level1: 1,
    level2: 2,
    level3: 1,
    level4: 1,
    level5: 2,
    level1_found: 1,
    level2_found: 2,
    level3_found: 0,
    level4_found: 0,
    level5_found: 1,
}