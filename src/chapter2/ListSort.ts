
/**
 * 快速排序的执行
 */
export class ListSort {
   /**
    * 返回序列中的索引位置  辅助二分查找插入排序
    * @param list 传入列表，升序排列
    * @param indexs 搜索起始索引
    * @param indexe 搜索中止索引  
    */
   public static binarySearch(list: Array<number>, indexs: number, indexe: number, findNumber: number): number {
      //二分查找也称折半查找（Binary Search），它是一种效率较高的查找方法。但是，折半查找要求线性表必须采用顺序存储结构，而且表中元素按关键字有序排列。
      //findNumber 要查找的值
      var index = 0;
      if (findNumber <= list[indexs]) {
         index = indexs;
      } else if (findNumber >= list[indexe]) {
         index = indexe + 1;
      } else {
         var halfIndex = Math.floor(indexe + indexs) / 2;
         if (findNumber <= list[halfIndex]) {
            index = ListSort.binarySearch(list, indexs, halfIndex, findNumber);  // 递归折半查找
         } else {
            index = ListSort.binarySearch(list, halfIndex, indexe, findNumber);  // 递归折半查找
         }
      }
      return index;
   }
   /**
    * 插入排序算法执行
    */
   public static insertSort(list: Array<number>): Array<number> {
      // splice(index,number) 删除number个后续数
      // spllce(index,0,x,y) 插入x，y
      // splice(index,number,x,y) 删除number个后续数 插入x，y
      // 不需要重新开辟内存，一个链表可以解决问题，交换位置既可以
      // 第一个数不需要遍历
      // 算法的思想是不断向已经排好序的序列中，不断插入新的值
      var count = list.length;
      for (var i = 1; i < count; i++) {
         var insert = list[i]; // 要插入的值；
         var j = 0;
         while (j < i) {
            // 1. 如果在遍历范围内结束, 插入到序列内
            // 2. 如果遍历结束，没有插入，则插入到序列末尾
            if (insert < list[j]) {
               break;
            }
            j++;
         }
         list.splice(i, 1);
         list.splice(j, 0, insert);
      }
      return list;
   }

   /**
    * 二分查找插入排序算法执行
    */
   public static binaryInsertSort(list: Array<number>): Array<number> {
      // splice(index,number) 删除number个后续数
      // spllce(index,0,x,y) 插入x，y
      // splice(index,number,x,y) 删除number个后续数 插入x，y
      // 不需要重新开辟内存，一个链表可以解决问题，交换位置既可以
      // 第一个数不需要遍历
      // 算法的思想是不断向已经排好序的序列中，不断插入新的值
      var count = list.length;
      for (var i = 1; i < count; i++) {
         var insert = list[i]; // 要插入的值；
         var index = ListSort.binarySearch(list, 0, i - 1, insert);
         list.splice(i, 1);
         list.splice(index, 0, insert);
      }
      return list;
   }
   /**
    * 冒泡排序算法执行
    */
   public static popSort(list: Array<number>) {


   }
   /**
    * 快速排序算法执行
    */
   public static quickSort(list: Array<number>) {


   }
   /**
    * 归并排序算法执行
    */
   public static dividAndConquerSort(list: Array<number>) {


   }
   /**
    * 桶排序
    */
   public static bucketSort(list: Array<number>) {


   }
}