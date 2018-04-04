export class BtreeNode {

   /*** 数据*/
   public data: number;
   /*** 左子树*/
   public left: BtreeNode;
   /**右子树 */
   public right: BtreeNode;
   /**父节点 */
   public parent: BtreeNode;

   constructor(data?: number) {
      this.data = data as any;
      this.left = null as any;
      this.right = null as any;
      this.parent = null as any;
   }

   /**
    * 删除一个节点
    * @param node 
    */
   public removeNode(node: BtreeNode) {
      if (node == this.left) {
         this.left = null as any;
      } else {
         this.right = null as any;
      }
   }

   /**
    * 删除一个节点
    * @param node 
    */
   public repalceNode(childNode: BtreeNode, node: BtreeNode) {
      if (childNode == this.left) {
         this.left = node as any;
         node.parent = this;
      } else {
         this.right = node as any;
         node.parent = this;
      }
   }

   /**打印节点 */

   public show() {
      if (this.parent) {
         console.log('node: ', this.data);
      }
      else {
         console.log('root: ', this.data);
      }

   }

   public dispose() {
      this.data = null as any;
      this.left = null as any;
      this.right = null as any;
      this.parent = null as any;
   }

}