/**
 * 表节点。
 */
export class TypeListNode<V>{

   public data: V;

   public nextNode: TypeListNode<V>;

   public preNode: TypeListNode<V>;

   constructor(data?: V) {
      this.data = data as any;
      this.nextNode = null as any;
      this.preNode = null as any;
   }
   /**
    * 释放所有内容。
    *
    * @param flag 标志
    */
   public dispose() {
      this.data = null as any;
      this.nextNode = null as any;
      this.preNode = null as any;
   }
};