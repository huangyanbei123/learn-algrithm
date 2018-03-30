"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ListSort_1 = require("./../chapter2/ListSort");
function main() {
    var list = [2, 1, 5, 5, 4, 9, 3, 10];
    // test1/////////////////
    var result = ListSort_1.ListSort.insertSort(list);
    console.log(result);
    //test2//////////////////
    var result = ListSort_1.ListSort.binaryInsertSort(list);
    console.log(result);
}
main();
//# sourceMappingURL=main.js.map