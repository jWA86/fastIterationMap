interface IFastIteMap<K, V> {
    clear();
    delete(key: K): boolean;
    forEach(callBack:Function);
    get(key: K): V
    has(key: K): boolean;
    //insert based on key
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    //overwrite array's push to avoid unwanted behavior 
    push(key: K, value: V);
    set(key: K, value: V);
    length: number;
    //overwrite sort so it sort the values array and the keys/index collection
    sort():Array<V>;
    //other Array method should be overwritten or deleted
}