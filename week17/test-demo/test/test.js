var assert = require('assert');
import { format } from 'path';
import {add,mul} from '../add'

describe('Add', function () {
    it('1+1=2', function () {
        assert.equal(add(1, 1), 2);
    })
});

describe('Mul', function(){
    it('2*2=4', function () {
        assert.equal(mul(2, 2), 4);
    })
})