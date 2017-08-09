interface IFastIteMap<K, V> {
    clear();
    delete(key: K): boolean;
    forEach(callBack: Function);
    get(key: K): V
    has(key: K): boolean;
    //insert based on key
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    //provide for reading keys only, should not be modified outside the class
    keys(): Map<K, number>
    length: number;
    //overwrite array's push to avoid unwanted behavior 
    push(key: K, value: V);
    set(key: K, value: V);
    //overwrite sort so it sort the values array and the keys/index collection
    sort(): Array<V>;
    //other Array method should be overwritten or deleted
}

//trick to extends Array in typescript based on http://jqfaq.com/how-to-extend-native-javascipt-object-in-typescript/
class XArray<V> {
    constructor() {
        Array.apply(this, arguments);
        return new Array();
    }
    pop(): any { return "" };
    push(val): number { return 0; };
    length: number;
}
//Adding Arrray to XArray prototype chain.
XArray["prototype"] = new Array();

class FastIteMap<K, V> extends Array implements IFastIteMap<K, V>{
    //_keys store the index of the element which is stored in the _values array
    //keys are not in the same order as values, therefore it shouldn't be iterate
    protected _keys: Map<K, number>;
    // protected _values: V[];
    constructor() {
        super();
        this._keys = new Map<K, number>();
    }
    test = function () {
        console.log("t");
    }
    clear = function () {
        this._keys.clear();
        while (this.length > 0) {
            this.pop();
        }
    }

    delete = function (key: K) {

        let i = this._keys.get(key);
        let r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        let r2 = this.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    }
    forEach = function (callBack: Function) {
        // let l = this.length;
        // for (let i = 0; i < l; ++i) {
        //     callBack(this[i]);
        // }
    }
    get = function (key: K): V {
        return this[this._keys.get(key)];
    }
    has = function (key: K): boolean {
        return this._keys.has(key);
    }
    protected insertValue = function (key: K, value: V, index: number) {
        return this.splice(index, 0, value);
    }
    protected offsetIndexInKeys = function (after: number, offsetVal: number) {

        var mapIter = this._keys.entries();
        let l = this._keys.size;
        for (let i = 0; i < l; ++i) {
            let e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    }
    insertAfter = function (key: K, value: V, keyRef: K): boolean {
        let i = this._keys.get(keyRef);
        this.insertValue(key, value, i + 1);
        if (i === undefined) {
            return false;
        } else {
            this.offsetIndexInKeys(i, 1);
            this._keys.set(key, i + 1);
            return true;
        }
    }
    insertBefore = function (key: K, value: V, keyRef: K): boolean {
        let i = this._keys.get(keyRef);
        this.insertValue(key, value, i);
        if (i === undefined) {
            return false;
        } else {
            this.offsetIndexInKeys(i - 1, 1);
            this._keys.set(key, i);
            return true;
        }
    }
    keys = function () {
        return this._keys;
    }
    push = function (key: K, value: V): number {
        if (value === undefined) { return; }
        arguments[0] = value;
        arguments.length = 1;
        let e = this._keys.get(key)
        //if the key doesn't exist add the element
        if(e===undefined){
            let l = Array.prototype.push.apply(this, arguments);
            this._keys.set(key, l - 1);
        }else{
            //if the key is already there, update the value
            this[e] = value;
        }
        return this.length;
    }
    set = function (key: K, value: V): number {
        this.push(key, value);
        return this.length;
    }
    sort(): Array<V> {

    }
}


export { FastIteMap, IFastIteMap }