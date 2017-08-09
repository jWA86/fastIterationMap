"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var FastIteMap_1 = require("../src/FastIteMap");
describe("Custom HashMap", function () {
    var k, k2, k3, v, v2, v3;
    var ob = (function () {
        function ob() {
        }
        return ob;
    }());
    var myMap = new FastIteMap_1.FastIteMap();
    beforeEach(function () {
        k = "myKey1";
        v = { "prop1": 1, "prop2": "aString" };
        k2 = "myKey2";
        v2 = { "prop1": 2, "prop2": "aString" };
        k3 = "myKey3";
        v3 = { "prop1": 3, "prop2": "aString" };
        myMap = new FastIteMap_1.FastIteMap();
    });
    describe('collections', function () {
        it("keys() should return an object Map", function () {
            //checking 
            chai_1.expect(myMap.keys() instanceof Map).to.equal(true);
        });
        it("this should return an array", function () {
            chai_1.expect(myMap instanceof Array).to.equal(true);
        });
    });
    describe("set(key, value)", function () {
        it('should be able to add an element to the values array', function () {
            //set 
            myMap.set(k, v);
            chai_1.expect(myMap[0]).to.equal(v);
        });
        it('should be able to add the key and the corresponding index in the keys Map', function () {
            myMap.set(k, v);
            var m = [];
            myMap.keys().forEach(function (v, k) {
                m.push(v);
                m.push(k);
            });
            //value in the keys is the index of element in the values array
            chai_1.expect(m[0]).to.equal(0);
            chai_1.expect(m[1]).to.equal(k);
        });
        it("size should return the number of element in the hashMap", function () {
            chai_1.expect(myMap.length).to.equal(0);
            myMap.set(k, v);
            chai_1.expect(myMap.length).to.equal(1);
        });
    });
    describe("push(key, value) same behavior as set(k,v)", function () {
        it('push should not add any element if a key is missing', function () {
            //testing if push is overwritten fro Array
            myMap.push(v);
            chai_1.expect(myMap[0]).to.equal(undefined);
        });
        it('should be able to add an element to the values array', function () {
            myMap.push(k2, v2);
            chai_1.expect(myMap[0]).to.equal(v2);
        });
        it('should be able to add the key and the corresponding index in the keys Map', function () {
            myMap.push(k, v);
            var m = [];
            myMap.keys().forEach(function (v, k) {
                m.push(v);
                m.push(k);
            });
            //value in the keys is the index of element in the values array
            chai_1.expect(m[0]).to.equal(0);
            chai_1.expect(m[1]).to.equal(k);
        });
        it("length should return the number of element in the hashMap", function () {
            chai_1.expect(myMap.length).to.equal(0);
            myMap.set(k, v);
            chai_1.expect(myMap.length).to.equal(1);
        });
    });
});
