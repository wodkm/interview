/**
 * Es6 基本数据类型 Number String Boolean Null Undefined Symbol
 *     引用类型 Object
 *     typeOf 可打印类型 Number String Boolean Null Undefined Symbol Object Function,但是打印Null会显示"object"
 */
function basicTypeTest() {
    console.log(typeof Number());//"number"
    console.log(typeof String());//"string"
    console.log(typeof Boolean());//"boolean"
    console.log(typeof null);//"object"
    console.log(typeof undefined);//"undefined"
    console.log(typeof Symbol());//"symbol"
    console.log(typeof Object());//"object"
    console.log(typeof Function());//"function"
}
