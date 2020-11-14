var assert = require('assert');
import { format, parse } from 'path';
import { parseHTML } from '../src/parser'

describe('parseHTML', function () {
    it('<a>', function () {
        let tree = parseHTML('<a>')
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it('<a href="yes">111</a>', function () {
        let tree = parseHTML('<a attr="yes">111</a>')
        assert.equal(tree.children.length, 1);
        assert.equal(tree.children[0].children.length, 1);
    })
    it('<a href />', function () {
        let tree = parseHTML('<a href />')
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it('<a href id></a>', function () {
        let tree = parseHTML('<a href id></a>')
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<a href='http://baidu.com'></a>", function () {
        let tree = parseHTML("<a href='http://baidu.com'></a>")
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it('<a href="http://baidu.com"></a>', function () {
        let tree = parseHTML('<a href="http://baidu.com"></a>')
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<a id=abc >", function () {
        let tree = parseHTML("<a id=abc >")
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<a id=abc/>", function () {
        let tree = parseHTML("<a id=abc/>")
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<>", function () {
        let tree = parseHTML("<>")
        assert.equal(tree.children.length, 1);
    })
    it("<a />", function () {
        let tree = parseHTML("<a />")
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<A /> un", function () {
        let tree = parseHTML("<A />")
        assert.equal(tree.children[0].tagName, 'A');
        assert.equal(tree.children[0].children.length, 0);
    })
    it("<a class='abc' >", function () {
        let tree = parseHTML("<a class='abc' >")
        assert.equal(tree.children[0].tagName, 'a');
        assert.equal(tree.children[0].children.length, 0);
    })
})