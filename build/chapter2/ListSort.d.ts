/**
 * 快速排序的执行
 */
export declare class ListSort {
    /**
     * 返回序列中的索引位置  辅助二分查找插入排序
     * @param list 传入列表，升序排列
     * @param indexs 搜索起始索引
     * @param indexe 搜索中止索引
     */
    static binarySearch(list: Array<number>, indexs: number, indexe: number, findNumber: number): number;
    /**
     * 插入排序算法执行
     */
    static insertSort(list: Array<number>): Array<number>;
    /**
     * 二分查找插入排序算法执行
     */
    static binaryInsertSort(list: Array<number>): Array<number>;
    /**
     * 冒泡排序算法执行
     */
    static popSort(list: Array<number>): void;
    /**
     * 快速排序算法执行
     */
    static quickSort(list: Array<number>): void;
    /**
     * 归并排序算法执行
     */
    static dividAndConquerSort(list: Array<number>): void;
    /**
     * 桶排序
     */
    static bucketSort(list: Array<number>): void;
}
