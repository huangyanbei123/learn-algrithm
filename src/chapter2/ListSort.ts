
/**
 * 快速排序的执行
 */
export class ListSort {
   /**
    * 插入排序算法执行
    */
   public static insertSort(list: Array<number>): Array<number> {
      // 1. 不需要重新开辟内存，一个链表可以解决问题，交换位置既可以
      // splice(index,number) 删除number个后续数
      // spllce(index,0,x,y) 插入x，y
      // splice(index,number,x,y) 删除number个后续数 插入x，y
      // 第一个数不需要遍历
      // 算法的思想是不断向已经排好序的序列中，不断插入新的值
      var count = list.length - 1;
      for (var i = 1; i < count; i++) {
         var insert = list[i]; // 要插入的值；
         var j = 0;
         while (j < i) {
            if (insert < list[j]) {
               break;
            }
            j++;
         }
         list.splice(j, 0, insert)
         list.splice(i, 1);
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