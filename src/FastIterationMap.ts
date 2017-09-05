
export { FastIterationMap, IFastIterationMap }

interface IFastIterationMap<K, V> {
    clear();
    delete(key: K): boolean;
    get(key: K): V
    has(key: K): boolean;
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    //provide for reading keys only, should not be modified outside the class
    keys: Map<K, number>
    readonly length: number;
    push(key: K, value: V);
    set(key: K, value: V);
    readonly size: number;
    values: V[];
}

class FastIterationMap<K, V> implements IFastIterationMap<K, V> {
    // _keys store the index of the element which is stored in the _values array
    // keys are not in the same order as values, therefore it shouldn't be use outside the class
    protected _keys: Map<K, number>;
    protected _values: V[];
    constructor() {
        this._keys = new Map<K, number>();
        this._values = [];
    }
    clear(): void {
        this._keys.clear();
        this._values = [];
    }
    delete(key: K): boolean {
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
    // from exclusive 
    // to exclusive
    protected offsetIndexInKeys(from: number, offsetVal: number, to?: number): void {
        var mapIter = this._keys.entries();
        let l = this._keys.size;
        to = to || Number.MAX_VALUE;
        for (let i = 0; i < l; ++i) {
            let e = mapIter.next().value;
            if (e[1] > from && e[1] < to) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    }
    insertAfter(key: K, value: V, keyRef: K): boolean {
        if (this._keys.get(key) !== undefined) { return false; }
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
        if (this._keys.get(key) !== undefined) { return false; }
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
    get keys(): Map<K, number> {
        return this._keys;
    }
    get length(): number {
        return this._values.length;
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
    get size(): number {
        return this._values.length;
    }
    get values(): V[] {
        return this._values;
    }
}
