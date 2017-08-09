import "mocha";
import { expect } from "chai";
import { FastIteMap } from "../src/FastIteMap";

describe("Custom HashMap", () => {

    let k, k2, k3, v, v2, v3;
    class ob {
        prop1: number;
        prop2: string;
    }
    let myMap = new FastIteMap<string, ob>();

    beforeEach(() => {

        k = "myKey1";
        v = { "prop1": 1, "prop2": "aString" };
        k2 = "myKey2";
        v2 = { "prop1": 2, "prop2": "aString" };
        k3 = "myKey3";
        v3 = { "prop1": 3, "prop2": "aString" };
        myMap = new FastIteMap<string, ob>();
    });
    describe('collections', () => {

        it("keys() should return an object Map", () => {
            //checking 
            expect(myMap.keys() instanceof Map).to.equal(true);
        });
        it("this should return an array", () => {
            expect(myMap instanceof Array).to.equal(true);
        });
    });

    describe("set(key, value)", () => {

        it('should be able to add an element to the values array', () => {
            //set 
            myMap.set(k, v);
            expect(myMap[0]).to.equal(v);
        });
        it('should be able to add the key and the corresponding index in the keys Map', () => {
            myMap.set(k, v);
            let m = [];
            myMap.keys().forEach((v, k) => {
                m.push(v);
                m.push(k);
            });
            //value in the keys is the index of element in the values array
            expect(m[0]).to.equal(0);
            expect(m[1]).to.equal(k);
        });
        it("size should return the number of element in the hashMap", () => {
            expect(myMap.length).to.equal(0);
            myMap.set(k, v);
            expect(myMap.length).to.equal(1);
        });
    });
    describe("push(key, value) same behavior as set(k,v)", () => {

        it('push should not add any element if a key is missing', () => {
            //testing if push is overwritten fro Array
            myMap.push(v);
            expect(myMap[0]).to.equal(undefined);
        });
        it('should be able to add an element to the values array', () => {
            myMap.push(k2, v2);
            expect(myMap[0]).to.equal(v2);
        });
        it('should be able to add the key and the corresponding index in the keys Map', () => {
            myMap.push(k, v);
            let m = [];
            myMap.keys().forEach((v, k) => {
                m.push(v);
                m.push(k);
            });
            //value in the keys is the index of element in the values array
            expect(m[0]).to.equal(0);
            expect(m[1]).to.equal(k);
        });
        it("length should return the number of element in the hashMap", () => {
            expect(myMap.length).to.equal(0);
            myMap.set(k, v);
            expect(myMap.length).to.equal(1);
        });
    });
}); 