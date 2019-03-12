const assert = require('assert');
const ResultManager = require('../src/results/result')
describe('Result', function() {
  describe('Store results', function() {
    it('store a fully complete result', async () => {
        ResultManager.register(result1)
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