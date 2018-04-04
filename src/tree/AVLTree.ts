import { BtreeNode } from "./BtreeNode";

// AVL树本质上还是一棵二叉搜索树，它的特点是：
// 1.本身首先是一棵二叉搜索树。
// 2.带有平衡条件：**每个结点**的左右子树的高度之差的绝对值（平衡因子）最多为1。
// 3. 也就是说，AVL树，本质上是带了平衡功能的二叉查找树（二叉排序树，二叉搜索树）
// 4. 查找、插入和删除在平均和最坏情况下都是O（log n）
// 5. 高度为 h 的 AVL 树，节点数 N 最多2^h − 1； 最少N(h)=N(h− 1) +N(h− 2) + 1。
// 6. 最小不平衡子树

export class AVLTreeNode {
   // 数值
   public data: number;
   // 高度
   public height: number;
   // 左子树
   public left: AVLTreeNode;
   // 右子树
   public right: AVLTreeNode;
   // 构造函数
   constructor() {
      this.data = null as any;
      this.height = null as any;
      this.left = null as any;
      this.right = null as any;
   }
   // 释放函数
   public dispose() {
      this.data = null as any;
      this.height = null as any;
      this.left = null as any;
      this.right = null as any;
   }
}

/**平衡二叉树 */
export class AVLTree {
   /**根节点 */
   public root: AVLTreeNode;

   constructor(root?: AVLTreeNode) {
      this.root = root as any;
   }


   /**
    * 左旋
    * @param node
    */
   public leftRotation(node: AVLTreeNode) {
      var pNode = node.right;
      node.right = pNode.left;
      pNode.left = node;
      node.height = Math.max(this.nodeHeight(node.left), this.nodeHeight(node.right)) + 1;
      pNode.height = Math.max(this.nodeHeight(pNode.left), this.nodeHeight(pNode.right)) + 1;
      return pNode;

   }

   /**
    * 右旋
    * @param node
    */
   public rightRotation(node: AVLTreeNode) {
      var pNode = node.left;
      node.left = pNode.right;
      pNode.right = node;
      node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
      pNode.height = Math.max(this.height(pNode.left), this.height(pNode.right)) + 1;
      return pNode;
   }

   /**
    * 先左旋，后右旋
    * @param node
    */
   public leftRightRotation(node: AVLTreeNode) {
      node.right = this.rightRotation(node.right);
      return this.leftRotation(node);
   }

   /**
    * 先右旋，后左旋
    * @param node
    */
   public rightLeftRotation(node: AVLTreeNode) {
      node.left = this.leftRotation(node.left);
      return this.rightRotation(node);
   }

   /**
    * 返回节点高度
    * @param node 
    */
   public height(node?: AVLTreeNode): number {
      if (node != null) {
         return node.height;
      } else {
         return this.height(this.root);
      }
   }

   /**
    * 插入一个节点
    * @param data 
    */
   public insert(node: AVLTreeNode, data: number) {
      //https://www.cnblogs.com/QG-whz/p/5167238.html
      if (node.data == null) { //找到插入位置
         node.data = data;
      } else if (data > node.data) {
         if (!node.right) {
            node.right = new AVLTreeNode();
         }
         node.right = this.insert(node.right, data);
         if (this.height(node.right) - this.height(node.left) == 2) {
            if (data > node.right.data) {
               node = 
            } else if () {
            }

         }
      } else if (data < node.data) {
         if (!node.left) {
            node.left = new AVLTreeNode();
         }
         node.left = this.insert(node.left, data);
      }
      return node;
   }



   /**前序查找 */
   public preSearch(node: AVLTreeNode, data: number) {
      if (node != null) {
         if (node.data == data) {
            return node;
         }
         this.preSearch(node.left, data);
         this.preSearch(node.right, data);
      }
   }

   /**中序查找 */
   public midSearch(node: AVLTreeNode, data: number) {
      if (node != null) {
         this.preSearch(node.left, data);
         if (node.data == data) {
            return node;
         }
         this.preSearch(node.right, data);
      }
   }

   /**后序查找 */
   public postSearch(node: AVLTreeNode, data: number) {
      if (node != null) {
         this.preSearch(node.left, data);
         this.preSearch(node.right, data);
         if (node.data == data) {
            return node;
         }
      }
   }

   /**删除一个节点 */
   public removeNode(node: AVLTreeNode) {

   }



}