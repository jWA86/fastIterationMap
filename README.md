# fastIterationMap
a typescript implementation of a ES6 Map with Array like performance for iteration and O(1) for lookup

this is a work in progress.<br />

toDo : <br />
    Test in browser<br />
    sort() : should sort values as well as keys<br />
    other array's inherited methods <br />
    jsPerf comparaison with es6Map and array : - element lookup and iteration<br />

done :<br />
    clear();<br />
    delete(key: K): boolean;<br />
    get(key: K): V<br />
    has(key: K): boolean;<br />
    //insert based on key<br />
    insertAfter(key: K, value: V, keyRef: K): boolean;<br />
    insertBefore(key: K, value: V, keyRef: K): boolean;<br />
    //provide for reading keys only, should not be modified outside the class<br />
    keys(): Map<K, number><br />
    length: number;<br />
    //overwrite array's push to avoid unwanted behavior <br />
    push(key: K, value: V);<br />
    set(key: K, value: V);<br />
    //overwrite sort so it sort the values array and the keys/index collection<br />
    