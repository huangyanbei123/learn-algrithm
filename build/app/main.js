"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HashTable_1 = require("./../hashtable/HashTable");
function main() {
    //////////排序测试///////////////////////////
    // var list = [2, 1, 5, 5, 4, 9, 3, 10];
    // // test1///////////////// 插入排序
    // var result = ListSort.insertSort(list);
    // console.log('插入排序', result);
    // list = [2, 1, 5, 5, 4, 9, 3, 10];
    // //test2////////////////// 二分法查找插入排序
    // var result = ListSort.binaryInsertSort(list);
    // console.log('二分法查找插入排序', result);
    // list = [2, 1, 5, 5, 4, 9, 3, 10];
    // //test3//////////////////冒泡排序
    // var result = ListSort.popSort(list);
    // console.log('冒泡排序', result);
    // list = [2, 1, 5, 5, 4, 9, 3, 10];
    // //test4//////////////////快速排序
    // var result = ListSort.quickSort(list, 0, list.length - 1);
    // console.log('快速排序', result);
    // list = [2, 1, 5, 5, 4, 9, 3, 10, 1];
    // //test5//////////////////归并排序
    // var result = ListSort.dividAndConquerSort(list);
    // console.log('归并排序', result);
    //////////哈希表测试///////////////////////////
    var table = new HashTable_1.HashTable();
    table.set("dd", "2");
    table.set("2d", "22");
    table.set("dg", "2222");
    table.set("sgd", "22222");
    var tt = table.get("dd");
}
main();
//# sourceMappingURL=main.js.map