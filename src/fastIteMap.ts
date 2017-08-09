interface IFastIteMap<K, V> {
    clear();
    delete(key: K): boolean;
    forEach(callBack:Function);
    get(key: K): V
    has(key: K): boolean;
    //insert based on key
    insertAfter(key: K, value: V, keyRef: K): boolean;
    insertBefore(key: K, value: V, keyRef: K): boolean;
    //provide for reading keys only, should not be modified outside the class
    keys():Map<K, number>
    length: number;
    //overwrite array's push to avoid unwanted behavior 
    push(key: K, value: V);
    set(key: K, value: V);
    //overwrite sort so it sort the values array and the keys/index collection
    sort():Array<V>;
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
    length:number;
} 
//Adding Arrray to XArray prototype chain.
 XArray["prototype"] = new Array();

 class FastIteMap<K, V> extends Array implements IFastIteMap<K, V>{
    //_keys store index of elements which are stored in the parent array
    //keys are not in the same order as values
    protected _keys:Map<K, number>;
    // protected _values: V[];
    constructor() {
        super();
        this._keys = new Map<K, number>();     
    }
    //cannot overwrite parent's method
    //have to use proprety instead
    clear = function(){

    }
    delete(key: K): boolean{

    }
    forEach(callBack:Function){

    }
    get(key: K): V{

    }
    has(key: K): boolean{

    }
    
    insertAfter(key: K, value: V, keyRef: K): boolean{

    }
    insertBefore(key: K, value: V, keyRef: K): boolean{

    }
    keys = function():Map<K, number>{
        return this._keys;
    }
    push = function(key: K, value:V):number{
        if(value === undefined){return;}
        arguments[0] = value;
        arguments.length = 1;
        let l = Array.prototype.push.apply(this,arguments);
        this._keys.set(key, l - 1);
        return this.length;
    }
    set = function(key: K, value: V):number {
         this.push(key, value);
         return this.length;
    }    
    
    sort():Array<V>{

    }
}


export { FastIteMap, IFastIteMap }