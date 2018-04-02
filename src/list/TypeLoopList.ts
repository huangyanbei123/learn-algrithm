import { TypeListNode } from "./TypeListNode";


export class TypeLoopList<V>{
   /** 名称集合 */
   public root: TypeListNode<V>;

   public size: number;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.root = null as any;
      this.size = 0;
   }

   /**
    * 
    * @param item 
    */
   public containsNode(item: TypeListNode<V>): boolean {
      var current = this.root;
      var n = 0;
      while (current != item) {
         current = current.nextNode;
         n++;
         if (n > this.size) {
            current = null as any;
         }
      }
      return current ? true : false;
   }

   /**
    * 获得最后一个实体。
    *
    * @return 
    */
   public lastNode(): TypeListNode<V> {
      var root = this.root;
      if (root) {
         return root.preNode;
      }
      return null as any;
   }

   /**
    * 存入一个节点
    * @param node 
    */
   public push(node: TypeListNode<V>) {
      if (!this.root) {
         this.root = node;
         this.root.nextNode = this.root;
         this.root.preNode = this.root;
      } else {
         var lastNode = this.lastNode();
         lastNode.nextNode = node;
         node.preNode = lastNode;
         node.nextNode = this.root;
      }
      this.size++;

   }

   /**
    * 插入一个节点
    * @param node 
    * @param preNode 
    */
   public insert(node: TypeListNode<V>, preNode: TypeListNode<V>) {
      var next = preNode.nextNode;
      preNode.nextNode = node;
      node.preNode = preNode;
      node.nextNode = next;
      next.preNode = node;
      this.size++;
   }

   /**
    * 删除一个节点
    * @param node 
    */
   public remove(node: TypeListNode<V>) {
      if (this.containsNode(node)) {
         if (node == this.root) {
            if (this.size == 1) {
               this.root = null as any;
            }
            else {
               var next = this.root.nextNode;
               var pre = this.root.preNode;
               this.root = next;
               pre.nextNode = next;
               next.preNode = pre;
            }
         }
      } else {
         var next = this.root.nextNode;
         var pre = this.root.preNode;
         pre.nextNode = next;
         next.preNode = pre;
      }
      node.dispose();
      this.size--;
   }

}


