export { FastIterationMap, IFastIterationMap };
interface IFastIterationMap<K, V> {
    keys: Map<K, number>;
    readonly length: number;
    readonly size: number;
    values: V[];
    clear(): any;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    swap(key1: K, key2: K): boolean;
    push(key: K, value: V): any;
    set(key: K, value: V): any;
}
declare class FastIterationMap<K, V> implements IFastIterationMap<K, V> {
    protected _keys: Map<K, number>;
    protected _values: V[];
    constructor();
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    /**
     * Insert an item after another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert after
     */
    insertAfter(key: K, value: V, keyRef: K): boolean;
    /**
     * Insert 2 items around the another item
     * @param keyRef the key of the item insert around
     * @param firstK the key of the item to insert before
     * @param firstV the value of the item to insert before
     * @param secondK the key of the item to insert after
     * @param secondV the value of the item to insert after
     */
    insertAround(keyRef: K, firstK: K, firstV: V, secondK: K, secondV: V): boolean;
    /**
     * Insert an item before another item
     * @param key the key of the item to insert
     * @param value the value of the item
     * @param keyRef the key of the item to insert before
     */
    insertBefore(key: K, value: V, keyRef: K): boolean;
    readonly keys: Map<K, number>;
    readonly length: number;
    readonly size: number;
    readonly values: V[];
    push(key: K, value: V): number;
    set(key: K, value: V): number;
    /**
     * Swap position of 2 items in the values array and set the correct index in the keys Map
     * @param key1
     * @param key2
     */
    swap(key1: K, key2: K): boolean;
    protected insertValue(index: number, ...values: V[]): V[];
    /**
     * Offset indices in the keys Map from a position ([from] and [to] not included)
     * @param from offset after this key
     * @param offsetVal the amount to offset indices
     * @param to if specidied offset until this key, otherwise offset to end of the collection
     */
    protected offsetIndexInKeys(from: number, offsetVal: number, to?: number): void;
}
