import { BtreeNode } from "./BtreeNode";

export class BinaryTree {
   /**根节点 */
   public root: BtreeNode;
   constructor(root?: BtreeNode) {
      this.root = root as any;
   }

   /**
    * 插入一个节点
    * @param data 
    */
   public insertNode(data: number): BtreeNode {
      var node = new BtreeNode(data);
      if (this.root == null) {
         this.root = node;
         node.parent = null as any;
      } else {
         var current = this.root;
         while (true) {
            var parent = current;
            if (data <= current.data) {
               current = current.left
               if (current == null) {
                  parent.left = node;
                  node.parent = parent;
                  break;
               }
            } else {
               current = current.right
               if (current == null) {
                  parent.right = node;
                  node.parent = parent;
                  break;
               }

            }
         }
      }
      return node;
   }

   /**插入节点 */
   public insert(parent: BtreeNode, node: BtreeNode) {
      if (node.data <= parent.data) {
         if (parent.left == null) {
            parent.left = node;
            node.parent = parent;
         } else {
            this.insert(parent.left, node);
         }

      } else {
         if (parent.right == null) {
            parent.right = node;
            node.parent = parent;
         } else {
            this.insert(parent.right, node);
         }
      }
   }

   /**插入数据 */
   public insertData(data: number) {
      var node = new BtreeNode(data);
      if (this.root == null) {
         this.root = node;
         node.parent = null as any;
      } else {
         this.insert(this.root, node);
      }
   }

   /**前序查找 */
   public preSearch(node: BtreeNode, data: number) {
      if (node != null) {
         if (node.data == data) {
            return node;
         }
         this.preSearch(node.left, data);
         this.preSearch(node.right, data);
      }
   }

   /**中序查找 */
   public midSearch(node: BtreeNode, data: number) {
      if (node != null) {
         this.preSearch(node.left, data);
         if (node.data == data) {
            return node;
         }
         this.preSearch(node.right, data);
      }
   }

   /**后序查找 */
   public postSearch(node: BtreeNode, data: number) {
      if (node != null) {
         this.preSearch(node.left, data);
         this.preSearch(node.right, data);
         if (node.data == data) {
            return node;
         }
      }
   }

   /**后序查找 */
   public show(node: BtreeNode) {
      if (node != null) {
         this.show(node.left);
         this.show(node.right);
         node.show()
      }
   }

   /**删除一个节点 */
   public removeNode(node: BtreeNode) {
      // 1. 如果二叉树上包含该节点，则删除。
      // 2. 如果要删除的节点是叶子节点，没有子节点，可以直接删除
      // 3. 如果只包含一个子节点，那么子节点替换父节点的位置
      // 4. 如果删除的节点有两个节点,有两种处理方法
      //   (1) 查找左子树的最大值
      //   (2) 查找右子树的最小值
      //   替换要删除的节点。
      if (!node.left && !node.right) {
         var parent = node.parent;
         if (parent) {
            parent.removeNode(node);
            node.dispose();
         } else {
            this.root = null as any;
         }
      }
      else if (node.left && !node.right) {
         var parent = node.parent;
         if (parent) {
            parent.repalceNode(node, node.left);
            parent.removeNode(node);
            node.dispose();
         } else {
            this.root = node.left;
            node.dispose();
         }

      } else if (!node.left && node.right) {

         var parent = node.parent;
         if (parent) {
            parent.repalceNode(node, node.right);
            parent.removeNode(node);
            node.dispose();
         } else {
            this.root = node.right;
            node.dispose();
         }

      } else {
         var repalceNode;
         var current = node.right;
         while (true) {  // 找到右子树的最小值
            if (current.left != null) {
               current = node.left;
            } else {
               repalceNode = current;
               break;
            }
         }
         repalceNode.parent.removeNode(repalceNode);
         var parent = node.parent;
         if (parent) {
            repalceNode.left = node.left;
            repalceNode.right = node.right;
            parent.repalceNode(node, repalceNode);
         } else {
            repalceNode.left = node.left;
            repalceNode.right = node.right;
            this.root = repalceNode;
         }
      }
   }

   /**删除一个节点 */
   public remove(data: number) {
      // 1. 如果二叉树上包含该节点，则删除。
      var node = this.midSearch(this.root, data) as any;
      if (node) {
         this.removeNode(node);
      }
   }

}