import { TypeListNode } from "./TypeListNode";


/**
 * 名称和内容的关联保存表的表。
 * 
 */
export class TypeList<V>{
   /** 名称集合 */
   public head: TypeListNode<V>;

   public tail: TypeListNode<V>;

   public size: number;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this.head = null as any;
      this.tail = null as any;
      this.size = 0;
   }

   /**
    * 
    * @param item 
    */
   public containsNode(item: TypeListNode<V>): boolean {
      var current = this.head;
      while (current != item) {
         if (current.nextNode == null) {
            current = null as any;
            break;
         }
         current = current.nextNode;
      }
      return current ? true : false;
   }

   /**
    * 存入一个节点
    * @param node 
    */
   public push(node: TypeListNode<V>) {
      if (!this.head) {
         this.head = node;
         this.tail = node;
         this.head.nextNode = this.tail;
         this.tail.preNode = this.head;
      }
      this.tail.nextNode = node;
      node.preNode = this.tail;
      this.tail = node;
      this.size++;

   }

   /**
    * 插入一个节点
    * @param node 
    * @param preNode 
    */
   public insert(node: TypeListNode<V>, preNode: TypeListNode<V>) {
      var b = this.containsNode(preNode);
      if (b && preNode != this.tail) {
         var next = preNode.nextNode;
         preNode.nextNode = node;
         node.preNode = preNode;
         node.nextNode = next;
         next.preNode = node;
      } else {
         this.push(node);
      }
      this.size++;
   }

   /**
    * 删除一个节点
    * @param node 
    */
   public remove(node: TypeListNode<V>) {
      if (this.containsNode(node)) {
         if (node == this.head) {
            if (this.size == 1) {
               this.head = null as any;
               this.tail = null as any;
            }
            else {
               var secondHead = this.head.nextNode;
               this.head = secondHead;
               this.head.preNode = null as any;
            }
         } else if (node == this.tail) {
            this.tail = this.tail.preNode;
            this.tail.nextNode = null as any;
         } else {
            var next = node.nextNode;
            var pre = node.preNode;
            pre.nextNode = next;
            next.preNode = pre;
         }
         node.dispose();
         this.size--;
      }
   }
}
