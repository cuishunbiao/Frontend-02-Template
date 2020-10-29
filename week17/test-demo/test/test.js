var assert = require('assert');
import { format } from 'path';
import { add } from '../add'

describe('Add', function () {
    it('1+1=2', function () {
        assert.equal(add(1, 1), 2);
    })
    it('-1+-1=-2', function () {
        assert.equal(add(-1, -1), -2);
    })
    it('100+2000=2100', function () {
        assert.equal(add(100, 2000), 2100);
    })
});
