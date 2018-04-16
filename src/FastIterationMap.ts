
export { FastIterationMap, IFastIterationMap };

interface IFastIterationMap<K, V> {
    keys: Map<K, number>;
    readonly length: number;
    readonly size: number;
    values: V[];
    clear();
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    swap(key1: K, key2: K): boolean;
    // Provide for reading keys only, should not be modified outside the class
    push(key: K, value: V);
    set(key: K, value: V);
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
    public clear(): void {
        this._keys.clear();
        this._values = [];
    }
    public delete(key: K): boolean {
        const i = this._keys.get(key);
        const r = this._keys.delete(key);
        this.offsetIndexInKeys(i, -1);
        const r2 = this._values.splice(i, 1);
        if (r2.length > 0 && r) {
            return true;
        } else {
            return false;
        }
    }
    public get(key: K): V {
        return this._values[this._keys.get(key)];
    }
    /**
     * Return the index of an element in the value array
     * @param key
     */
    public getIndex(key: K): number {
        return this._keys.get(key);
    }
    public has(key: K): boolean {
        return this._keys.has(key);
    }
    /**
     * Insert an item after another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert after
     */
    public insertAfter(key: K, value: V, keyRef: K): boolean {
        if (this._keys.get(key) !== undefined) { return false; }
        const i = this._keys.get(keyRef);
        if (i === undefined) { return false; }
        this.insertValue(i + 1, value);
        this.offsetIndexInKeys(i, 1);
        this._keys.set(key, i + 1);
        return true;
    }
    /**
     * Insert 2 items around the another item
     * @param keyRef the key of the item insert around
     * @param firstK the key of the item to insert before
     * @param firstV the value of the item to insert before
     * @param secondK the key of the item to insert after
     * @param secondV the value of the item to insert after
     */
    public insertAround(keyRef: K, firstK: K, firstV: V, secondK: K, secondV: V): boolean {
        if (this._keys.get(firstK) !== undefined || this._keys.get(secondK) !== undefined) { return false; }
        const index = this._keys.get(keyRef);
        if (index === undefined) { return false; }
        // insert the 2 items after the item of reference
        // offset index by 2 in the keys map of all element after the index of reference
        // in the keys map set index of the 2 new items
        // finally swap the item of reference with the first of the 2 items inserted
        this.insertValue(index + 1, firstV, secondV);
        this.offsetIndexInKeys(index, 2);
        this._keys.set(firstK, index + 1);
        this._keys.set(secondK, index + 2);
        return this.swap(keyRef, firstK);
    }

    /**
     * Insert an item before another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert before
     */
    public insertBefore(key: K, value: V, keyRef: K): boolean {
        if (this._keys.get(key) !== undefined) { return false; }
        const i = this._keys.get(keyRef);
        if (i === undefined) { return false; }
        this.insertValue(i, value);
        this.offsetIndexInKeys(i - 1, 1);
        this._keys.set(key, i);
        return true;
    }
    get keys(): Map<K, number> {
        return this._keys;
    }
    get length(): number {
        return this._values.length;
    }
    get size(): number {
        return this._values.length;
    }
    get values(): V[] {
        return this._values;
    }
    public push(key: K, value: V): number {
        const e = this._keys.get(key);
        // if the key doesn't exist add the element
        if (e === undefined) {
            const l = this._values.push(value);
            this._keys.set(key, l - 1);
        } else {
            // if the key is already there, update the value
            this._values[e] = value;
        }
        return this._values.length;
    }
    public set(key: K, value: V): number {
        return this.push(key, value);
    }
    /**
     * Swap position of 2 items in the values array and set the correct index in the keys Map
     * @param key1
     * @param key2
     */
    public swap(key1: K, key2: K): boolean {
        const index1 = this._keys.get(key1);
        const index2 = this._keys.get(key2);
        if (index1 === undefined || index2 === undefined) {return false; }
        const tmp = this._values[index1];
        this._values[index1] = this._values[index2];
        this._values[index2] = tmp;
        this._keys.set(key1, index2);
        this._keys.set(key2, index1);
        return true;
    }
    protected insertValue(index: number, ...values: V[]): V[] {
        return this._values.splice(index, 0, ...values);
    }

    /**
     * Offset indices in the keys Map from a position ([from] and [to] not included)
     * @param from offset after this key
     * @param offsetVal the amount to offset indices
     * @param to if specidied offset until this key, otherwise offset to end of the collection
     */
    protected offsetIndexInKeys(from: number, offsetVal: number, to?: number): void {
        const mapIter = this._keys.entries();
        const l = this._keys.size;
        to = to || Number.MAX_VALUE;
        for (let i = 0; i < l; ++i) {
            const e = mapIter.next().value;
            if (e[1] > from && e[1] < to) {
                this._keys.set(e[0], e[1] += offsetVal);
            }
        }
    }
}
