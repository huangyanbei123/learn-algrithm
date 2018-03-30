import { ListSort } from './../chapter2/ListSort';

function main() {
   var list = [2, 1, 5, 5, 4, 9, 3, 10];
   // test1/////////////////

   var result = ListSort.insertSort(list);
   console.log(result);

   //test2//////////////////
   var result = ListSort.binaryInsertSort(list);
   console.log(result);

}
main();