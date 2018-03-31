"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListSort_1 = require("./../chapter2/ListSort");
function main() {
    var list = [2, 1, 5, 5, 4, 9, 3, 10];
    // test1///////////////// 插入排序
    var result = ListSort_1.ListSort.insertSort(list);
    console.log('插入排序', result);
    list = [2, 1, 5, 5, 4, 9, 3, 10];
    //test2////////////////// 二分法查找插入排序
    var result = ListSort_1.ListSort.binaryInsertSort(list);
    console.log('二分法查找插入排序', result);
    list = [2, 1, 5, 5, 4, 9, 3, 10];
    //test3//////////////////冒泡排序
    var result = ListSort_1.ListSort.popSort(list);
    console.log('冒泡排序', result);
    list = [2, 1, 5, 5, 4, 9, 3, 10];
    //test4//////////////////快速排序
    var result = ListSort_1.ListSort.quickSort(list, 0, list.length - 1);
    console.log('快速排序', result);
    list = [2, 1, 5, 5, 4, 9, 3, 10, 1];
    //test5//////////////////归并排序
    var result = ListSort_1.ListSort.dividAndConquerSort(list);
    console.log('归并排序', result);
}
main();
//# sourceMappingURL=main.js.map