# fastIterationMap
a typescript implementation of a ES6 Map with Array like performance for iteration and O(1) for lookup

this is a work in progress.

toDo : 
    Test in browser
    sort() : should sort values as well as keys
    other array's inherited methods 
    jsPerf comparaison with es6Map and array : - element lookup and iteration

done :
    clear();
    delete(key: K): boolean;
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
    