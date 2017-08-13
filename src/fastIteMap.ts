export { FastIteMap, IFastIteMap }
interface IFastIteMap<K, V> {
    clear();
    delete(key: K): boolean;
    get(key: K): V
    has(key: K): boolean;
    //insert based on key
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    //provide for reading keys only, should not be modified outside the class
    keys: Map<K, number>
    values: V[];
    length: number;
    size: number;
    push(key: K, value: V);
    set(key: K, value: V);

}

class FastIteMap<K, V> implements IFastIteMap<K, V> {
    //_keys store the index of the element which is stored in the this array
    // keys are not in the same order as values, therefore it shouldn't be iterate
    protected _keys: Map<K, number>;
    protected _values: V[];
    constructor() {
        this._keys = new Map<K, number>();
        this._values = [];
    }
    clear() {
        this._keys.clear();
        this._values = [];
    }
    delete(key: K) {
        let i = this._keys.get(key);
        let r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        let r2 = this._values.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        }
        else {
            return false;
        }
    }
    get(key: K): V {
        return this._values[this._keys.get(key)];
    }
    has(key: K): boolean {
        return this._keys.has(key);
    }
    protected insertValue(key: K, value: V, index: number): V[] {
        return this._values.splice(index, 0, value);
    }
    protected offsetIndexInKeys(after: number, offsetVal: number): void {
        var mapIter = this._keys.entries();
        let l = this._keys.size;
        for (let i = 0; i < l; ++i) {
            let e = mapIter.next().value;
            if (e[1] > after) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    }
    insertAfter(key: K, value: V, keyRef: K): boolean {
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
    insertBefore(key: K, value: V, keyRef: K): boolean {
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
    get length(): number {
        return this._values.length;
    }
    get keys(): Map<K, number> {
        return this._keys;
    }
    push(key: K, value: V): number {
        let e = this._keys.get(key)
        //if the key doesn't exist add the element
        if (e === undefined) {
            let l = this._values.push(value);
            this._keys.set(key, l - 1);
        } else {
            //if the key is already there, update the value
            this._values[e] = value;
        }
        return this._values.length;
    }
    set(key: K, value: V): number {
        return this.push(key, value);
    }
    sort(compare?){
        this.values.sort(compare);
    }
    get size(): number {
        return this._values.length;
    }
    get values(): V[] {
        return this._values;
    }
}
