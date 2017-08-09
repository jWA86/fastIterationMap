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
            chai_1.expect(myMap.keys() instanceof Map).to.equal(true);
        });
        it("this should return an array", function () {
            chai_1.expect(myMap instanceof Array).to.equal(true);
        });
    });
    describe("set(key, value)", function () {
        it('should be able to add an element to the values array', function () {
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
            chai_1.expect(m[0]).to.equal(0);
            chai_1.expect(m[1]).to.equal(k);
        });
        it("set with a prexisting key should update the element instead of adding one", function () {
            myMap.set(k, v);
            chai_1.expect(myMap.length).to.equal(1);
            chai_1.expect(myMap.keys().size).to.equal(1);
            chai_1.expect(myMap.get(k)).to.equal(v);
            myMap.set(k, v2);
            chai_1.expect(myMap.length).to.equal(1);
            chai_1.expect(myMap.keys().size).to.equal(1);
            chai_1.expect(myMap.get(k)).to.equal(v2);
        });
    });
    describe("push(key, value) same behavior as set(k,v)", function () {
        it('push should not add any element if a key is missing', function () {
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
            chai_1.expect(m[0]).to.equal(0);
            chai_1.expect(m[1]).to.equal(k);
        });
        it("length should return the number of element in the hashMap", function () {
            chai_1.expect(myMap.length).to.equal(0);
            myMap.set(k, v);
            chai_1.expect(myMap.length).to.equal(1);
        });
        it("push with a prexisting key should update the element instead of adding one", function () {
            myMap.push(k, v);
            chai_1.expect(myMap.length).to.equal(1);
            chai_1.expect(myMap.keys().size).to.equal(1);
            chai_1.expect(myMap.get(k)).to.equal(v);
            myMap.push(k, v2);
            chai_1.expect(myMap.length).to.equal(1);
            chai_1.expect(myMap.keys().size).to.equal(1);
            chai_1.expect(myMap.get(k)).to.equal(v2);
        });
    });
    describe("get(key)", function () {
        it('should be able to return the element with the corresponding key', function () {
            myMap.set(k, v);
            chai_1.expect(myMap.get(k)).to.equal(v);
        });
        it("should return undefined if not found", function () {
            chai_1.expect(myMap.get("keyNotP")).to.equal(undefined);
        });
    });
    describe("delete(key)", function () {
        it("should return true if it deleted the element ", function () {
            myMap.set(k, v);
            var r = myMap.delete(k);
            chai_1.expect(r).to.equal(true);
        });
        it("should return false if it didn't delete the element ", function () {
            var r = myMap.delete("keyNotPresentInCollection");
            chai_1.expect(r).to.equal(false);
        });
        it("should delete the element from the keys Map", function () {
            myMap.set(k, v);
            myMap.delete(k);
            chai_1.expect(myMap.keys().size).to.equal(0);
        });
        it("should delete the element from the values array", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            chai_1.expect(myMap.length).to.equal(2);
            myMap.delete(k);
            chai_1.expect(myMap.length).to.equal(1);
        });
        it("should offset index of all the other elements in the keys Map", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.set(k3, v3);
            chai_1.expect(myMap.keys().get(k2)).to.equal(1);
            myMap.delete(k);
            chai_1.expect(myMap.keys().get(k2)).to.equal(0);
            chai_1.expect(myMap.keys().get(k3)).to.equal(1);
        });
    });
    describe("clear()", function () {
        it("should remove all keys and values", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.clear();
            chai_1.expect(myMap.keys().size).to.equal(0);
            chai_1.expect(myMap.length).to.equal(0);
        });
    });
    describe("has()", function () {
        it("should able to return true when element is found", function () {
            myMap.set(k, v);
            chai_1.expect(myMap.has(k)).to.equal(true);
        });
        it("should able to return false when element is not found", function () {
            chai_1.expect(myMap.has("rKey")).to.equal(false);
        });
    });
    describe("insertAfter() ", function () {
        it("should insert the element in the values array after the element of reference", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertAfter(k3, v3, k);
            chai_1.expect(myMap[1].prop1).to.equal(3);
        });
        it("should offset all other elements in the values array", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            chai_1.expect(myMap[1].prop1).to.equal(2);
            myMap.insertAfter(k3, v3, k);
            chai_1.expect(myMap[2].prop1).to.equal(2);
        });
        it("should insert the key in the keys Map and update all index of the elements positioned after ", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertAfter(k3, v3, k);
            chai_1.expect(myMap.keys().get(k3)).to.equal(1);
            chai_1.expect(myMap.keys().get(k2)).to.equal(2);
            chai_1.expect(myMap.keys().get(k)).to.equal(0);
        });
        it("should return true if it succeeds to insert element", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            var r = myMap.insertAfter(k3, v3, k);
            chai_1.expect(r).to.equal(true);
        });
        it("should return false if it fails to insert element", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            var r = myMap.insertAfter(k3, v3, "notPresentedKey");
            chai_1.expect(r).to.equal(false);
        });
        it("get() should return the element after it has been inserted after another one", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertAfter(k3, v3, k);
            chai_1.expect(myMap.get(k3)).to.equal(v3);
            chai_1.expect(myMap.get(k2)).to.equal(v2);
            chai_1.expect(myMap.get(k)).to.equal(v);
        });
        it("get() should return the element after it has been inserted after the last one", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertAfter(k3, v3, k2);
            chai_1.expect(myMap.get(k3)).to.equal(v3);
            chai_1.expect(myMap.get(k2)).to.equal(v2);
            chai_1.expect(myMap.get(k)).to.equal(v);
        });
    });
    describe("insertBefore() ", function () {
        it("should insert the element in the values array before the element of reference", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertBefore(k3, v3, k2);
            chai_1.expect(myMap[1].prop1).to.equal(3);
        });
        it("should offset all other elements in the values array", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            chai_1.expect(myMap[1].prop1).to.equal(2);
            myMap.insertBefore(k3, v3, k2);
            chai_1.expect(myMap[2].prop1).to.equal(2);
        });
        it("should insert the key in the keys Map and update all index of the elements positioned before", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertBefore(k3, v3, k2);
            chai_1.expect(myMap.keys().get(k3)).to.equal(1);
            chai_1.expect(myMap.keys().get(k2)).to.equal(2);
            chai_1.expect(myMap.keys().get(k)).to.equal(0);
        });
        it("should return true if it succeeds to insert element", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            var r = myMap.insertBefore(k3, v3, k2);
            chai_1.expect(r).to.equal(true);
        });
        it("should return false if it fails to insert element", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            var r = myMap.insertBefore(k3, v3, "notPresentedKey");
            chai_1.expect(r).to.equal(false);
        });
        it("get() should return the element after it has been inserted before another one", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertBefore(k3, v3, k2);
            chai_1.expect(myMap.get(k3)).to.equal(v3);
            chai_1.expect(myMap.get(k2)).to.equal(v2);
            chai_1.expect(myMap.get(k)).to.equal(v);
        });
        it("get() should return the element after it has been inserted before another the first element", function () {
            myMap.set(k, v);
            myMap.set(k2, v2);
            myMap.insertBefore(k3, v3, k);
            chai_1.expect(myMap.get(k3)).to.equal(v3);
            chai_1.expect(myMap.get(k2)).to.equal(v2);
            chai_1.expect(myMap.get(k)).to.equal(v);
        });
    });
});
