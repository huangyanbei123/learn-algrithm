
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
      } else if (indexe - indexs == 1) {
         index = indexe;
      }
      else {
         var halfIndex = Math.ceil((indexe + indexs) / 2);
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
    * 冒泡排序算法执行  升序排列
    */
   public static popSort(list: Array<number>): Array<number> {
      var length = list.length;
      for (var i = 0; i < length - 1; i++) {       // 冒泡次数循环
         var max = list[0];
         for (var j = 1; j < length - i; j++) {    //比较循环
            if (list[j] < max) {                   // 遇到小的，交换位置
               var current = list[j];
               list[j] = max;
               list[j - 1] = current;
            } else {                               // 遇到大的，不交换位置，替换最大值
               max = list[j];
            }
         }
      }
      return list;
   }

   /**
    * 快速排序算法执行   // 冒泡的一种优化算法 ， 升序排序
    */
   public static quickSort(list: Array<number>, startIndex: number, EndIndex: number): Array<number> {
      var mid = list[startIndex];
      var left = startIndex;
      var right = EndIndex;
      var p = left;
      while (left < right) {
         //1. p 如果在left的右边则，则left向右移动
         //2. p 如果在right的左边，则right向左边移动
         //3. 交换位置的时候不移动left和right的指针，
         //4. p 指针不是在left位置，就是在right位置，当left和right相等的时候推出排序。
         if (p < right) {
            if (list[right] < list[p]) {
               // 交换位置
               var temp = list[right];
               list[right] = list[p];
               list[p] = temp;
               p = right;
            } else {
               // right 向左移动
               right--;
            }

         } else {
            if (list[left] > list[p]) {
               // 交换位置
               var temp = list[left];
               list[left] = list[p];
               list[p] = temp;
               p = left;
            } else {
               // left 向右移动
               left++;

            }

         }
      }
      // 1. p = startIndex 则不再进行递归调用
      if (p > startIndex) {
         ListSort.quickSort(list, startIndex, p - 1);
      }
      if (p < EndIndex) {
         ListSort.quickSort(list, p + 1, EndIndex);
      }
      return list;
   }

   /**
    * 归并算法
    */
   public static combine(list: Array<number>, p1: number, p2: number, p3: number, p4: number): Array<number> {
      var p = p1;
      var result = [];
      for (var i = p3; i <= p4; i++) {
         if (list[i] <= list[p]) {
            result.push(list[i]);
         } else {
            result.push(list[p])
            p++;
            if (p <= p3) {
               i--; // 循环重新来
            }
            if (p == p3) {// 第一组存入完毕，把光标放到最大
               p = p4
            }
         }
      }
      if (p < p2) {
         // 第一个序列剩余的填入完毕
         for (var j = p; j <= p2; j++) {
            result.push(list[j])
         }
      }
      /** 修改原数组的排序 */
      for (var k = 0; k < result.length; k++) {
         list[p1 + k] = result[k];
      }
      return list;
   }

   /**
    * 归并排序算法执行
    */
   public static dividAndConquerSort(list: Array<number>): Array<number> {
      // 分治过程
      for (var i = 0; i < list.length; i += 2) {
         if (list[i] > list[i + 1]) {
            var temp = list[i];
            list[i] = list[i + 1];
            list[i + 1] = temp;
         }
      }
      // 归并过程
      var n = 1;
      while (Math.pow(2, n) < list.length) {
         var dl = Math.pow(2, n);
         for (var i = 0; i < list.length; i += dl * 2) {
            if (i + dl - 1 >= list.length - 1) {
               break;
            } else if (i + dl * 2 - 1 > list.length - 1) {
               ListSort.combine(list, i, i + dl - 1, i + dl, list.length - 1);
            } else {
               ListSort.combine(list, i, i + dl - 1, i + dl, i + dl * 2 - 1);
            }
         }
         n++;
      }

      return list;
   }
}