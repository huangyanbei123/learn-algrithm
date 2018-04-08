import { BRTreeNode } from "./RBTree";

// Ｂ树满足某种条件，与红黑树或其他搜索树不同，一棵M（M>2）的B树，是一棵M路的平衡搜索树，它允许有多条分支子树，它可以是一条空树，或者满足以下性质：
// 1、根节点至少有两个孩子
// 2、每个非根节点有[ M/2，M ]个孩子
// 3、每个非根节点有[ (M/2) -1，M-1 ]个关键字，并且以升序排序
// 4、key[i]和key[i+1]之间的孩子节点的值介于两者之间
// 5、所有的叶子节点都在同一层
//http://blog.51cto.com/muhuizz/1873257
//https://blog.csdn.net/guoziqing506/article/details/64122287
var M = 4; //
// 叶子节点最少是一个，最多是3个
// keydata 最多是 2个。

export class BTreeNode {
   // 数值
   public keyData: Array<number>;
   public children: Array<BTreeNode>;
   public parent: BTreeNode;
   public size: number;
   // 构造函数
   constructor() {
      this.keyData = new Array<number>();
      this.children = new Array<BTreeNode>();
      this.parent = null as any;
      this.size = 0;
   }
   // 释放函数
   public dispose() {
      this.parent = null as any;
   }
}

/** B树 */
export class BTree {
   /**根节点 */
   public root: BTreeNode;
   constructor() {
      this.root = new BTreeNode();
   }

   /**
    * 插入一个节点
    * @param data 
    */
   public insert(node: BTreeNode, data: number) {
      // 1、 插入若树空，则在叶子节点直接插入，否则非叶子节点，若该节点关键字数小于2T-1则插在该节点左边或者右边； 
      // 2、 若该节点关键字数为2T-1,则插入后分裂为2个T-1个关键字的子节点，且中间关键字上移至父节点（当然相应的指针也要发生改变） 
      // 3、 若2中使得父节点或根节点满了，则根节点（父节点）也要分裂重复2使得各节点关键字满足（T到2T-1） 
      // (为了简化算法，采用从根节点往下查找时，遇见关键字满的节点，就进行分裂，这样就保证了再次插入后，若节点分裂则父节点一定不为满)
      if (node.size == 0) {
         node.keyData[0] = data;
         node.size++;
      } else {
         for (var i = 0; i < node.size; i++) {
            if (data < node.keyData[i]) {
               if (node.children[i]) { // 不是叶子节点
                  this.insert(node.children[i], data);
                  break;
               } else {
                  // 是叶子节点  只在叶子节点上进行操作
                  node.keyData.splice(i, 0, data);
                  node.size++;
                  this.splitByInsert(node);
                  break;
               }
            } else if (i == node.size - 1 && data > node.keyData[node.size - 1]) {
               if (node.children[i + 1]) {  // 不是叶子节点
                  this.insert(node.children[i + 1], data);
                  break;
               } else {  // 是叶子节点  只在叶子节点上进行操作
                  node.keyData.splice(i, 0, data);
                  node.size++;
                  this.splitByInsert(node);
                  break;
               }
            }
         }
      }
      return node;
   }

   /**
    * 分割
    * @param node 
    */
   public splitByInsert(node: BTreeNode) {
      if (node.size == M - 1) {
         var parent: BTreeNode;
         var midKeyIndex = Math.round(M / 2 - 1);
         if (!node.parent) {
            parent = new BTreeNode();
            node.parent = parent;
            this.root = parent;
         } else {
            parent = node.parent;
         }
         var brotherNode = new BTreeNode(); // 分裂创建兄弟节点,key 和 child 分开
         for (var i = midKeyIndex + 1; i < node.size + 1; i++) {
            if (i < node.size) {
               brotherNode.keyData.push(node.keyData[i]);
               brotherNode.size++;
               node.keyData.splice(i, 1);
               node.size--;
            }
            brotherNode.children.push(node.children[i]);
            if (node.children[i]) {
               node.children[i].parent = brotherNode;
            }
            node.children.splice(i, 1);
         }

         var index = this.getIndexInParent(node);
         parent.children.splice(index, 0, brotherNode);
         parent.keyData.splice(index, 0, node.keyData[midKeyIndex]);
         parent.size++;
         node.keyData.splice(midKeyIndex, 1);
         node.size--;
         this.splitByInsert(parent as any);
      }
   }

   /**得到子再父中的位置 */
   public getIndexInParent(node: BTreeNode): number {
      var parent = node.parent;
      if (parent.size == 0) {
         return 0;
      } else {
         for (var i = 0; i < parent.children.length; i++) {
            if (node == parent.children[i]) {
               return i;
            }
         }
      }
      return 0;
   }

   /**查找 */
   public search(node: BTreeNode, data: number): BTreeNode {
      for (var i = 0; i < node.size; i++) {
         if (node.keyData[i] == data) {
            return node as any;
         } else if (data < node.keyData[i]) {
            return this.search(node.children[i], data) as any;
         } else if (i == node.size - 1) {
            return this.search(node.children[i + 1], data) as any;
         }
      }
      return null as any;
   }

   /**删除一个节点 */
   public remove(node: BTreeNode, data: number) {
      for (var i = 0; i < node.size; i++) {
         if (data < node.keyData[i]) {
            if (node.children[i]) { // 不是叶子节点
               this.remove(node.children[i], data);
               break;
            }
         } else if (data == node.keyData[i]) {
            this.removeNodeKey(node, i);
         }
         else if (i == node.size - 1 && data > node.keyData[node.size - 1]) {
            if (node.children[i + 1]) {  // 不是叶子节点
               this.remove(node.children[i + 1], data);
               break;
            }
         }
      }
   }

   /**删除节点时，调整节点 */
   public removeNodeKey(node: BTreeNode, keyIndex: number) {
      //  B树的删除操作比插入稍微复杂一些，因为关键词 可以从任意节点中删除 
      // （包括内节点），删除会导致节点含关键词数目过少（小于t-1），所以可能需要进行合并。 
      // B树中从根节点至下删除关键词主要包括以下几种情况（ 最小度数为t ）。
      // 1） 若关键词k在节点x中且x为叶节点，则从x中删除k；
      // 2） 若关键词k不在内节点x中，并确定必包含k的子树叶子节点的根cx[i]，若cx[i]只有t-1个关键词，则做以下操作： 
      // a） 若cx[i]的一个相邻兄弟至少有t个关键词，则将x中某关键词降至cx[i]中，将cx[i]的相邻兄弟节点的某关键词提升至x，并修改指针； 
      // b） 若cx[i]及其所有相邻兄弟都只有t-1个关键词，则将ci[x]与一个兄弟合并，即将x的一个关键词移至新合并节点成为其中间关键词。 
      // 一个包含以上情况的B树删除关键词过程如下所示（最小度数t=2）：
      // 3） 若关键词k在节点x中且x为内节点，做以下操作： 
      // a） 节点x中位于k之前或之后的子节点y至少有t个关键词，则找出k在以y为根的子树中的前驱或后继k，递归删除k并在x中用k`代替k； 
      // b） 若节点x中位于k之前或之后的子节点y和z都只有t-1个关键词，则将k和z中所有关键词合并进y（使y有2t-1个关键词），再删除z节点，删除k关键词。 
      if (!node.children[keyIndex]) {  // 为叶子节点
         // 叶子节点
         if (node.size > M / 2 - 1) {   //case 1
            // 如果兄弟节点多于一个节点，则
            node.keyData.splice(keyIndex, 1);
            node.size--;
         } else {  //case 2
            if (node.parent) {
               var brotherNode = this.getValifidBrother(node);
               if (brotherNode) {
                  //则将parent中某关键词降至cx[i]中，将cx[i]的相邻兄弟节点的某关键词提升至parent，并修改指针；
                  node.keyData.splice(keyIndex, 1);
                  node.size--;

                  if (this.isFrontBrother(node, brotherNode)) {
                     var brotherIndex = this.getIndexInParent(brotherNode);
                     node.keyData.splice(0, 0, node.parent.keyData[brotherIndex]);
                     node.parent.keyData[brotherIndex] = brotherNode.keyData[brotherNode.size - 1]; // 替换值
                     brotherNode.keyData.splice(node.size - 1);
                     brotherNode.size--;
                  } else {
                     var nodeIndex = this.getIndexInParent(node);
                     node.keyData.splice(node.size - 1, 0, node.parent.keyData[nodeIndex]);
                     node.parent.keyData[nodeIndex] = brotherNode.keyData[0]; // 替换值
                     brotherNode.keyData.splice(0, 0);
                  }
               } else {
                  //若cx[i]及其所有相邻兄弟都只有t-1个关键词，则将ci[x]与一个兄弟合并，即将x的一个关键词移至新合并节点成为其中间关键词。
                  node.keyData.splice(keyIndex, 1);
                  node.size--;
                  var nodeIndex = this.getIndexInParent(node);
                  if (nodeIndex == 0) {  // 与后brother 合并
                     var backBrother = node.parent.children[nodeIndex + 1];
                     node.keyData.push(node.parent.keyData[nodeIndex]);
                     node.size++;
                     for (var i = 0; i < backBrother.size - 1; i++) {
                        node.keyData.push(backBrother.keyData[i]);
                        node.size++;
                     }
                     // 父亲节点删除一个
                     node.parent.keyData.splice(nodeIndex, 1);  // 内叶子节点删除********************************
                     node.parent.children.splice(nodeIndex + 1, 1);
                     node.parent.size--;
                     this.AjustNodeKeyNum(node.parent);
                     // 删除
                  } else {  // 与前brother 合并
                     var backBrother = node.parent.children[nodeIndex - 1];
                     node.keyData.push(node.parent.keyData[nodeIndex - 1]);
                     node.size++;
                     for (var i = backBrother.size - 1; i > 0; i--) {
                        node.keyData.push(backBrother.keyData[i]);
                        node.size++;
                     }
                     // 父亲节点删除一个
                     node.parent.keyData.splice(nodeIndex - 1, 1);  // 内叶子节点删除********************************
                     node.parent.children.splice(nodeIndex - 1, 1);
                     node.parent.size--;
                     this.AjustNodeKeyNum(node.parent);
                  }
               }
            } else {  // 没有parent，根
               node.keyData.splice(keyIndex, 1);
               node.size--;
            }
         }

      } else {
         // 不是叶子节点

         if (node.children[keyIndex].size > M / 2 - 1) {  // keydata 前子项
            // a） 节点x中位于k之前或之后的子节点y至少有t个关键词，则找出k在以y为根的子树中的前驱或后继k，递归删除k并在x中用k`代替k； 
            var size = node.children[keyIndex + 1].size;
            var maxNode = this.getMaxmumNode(node.children[keyIndex]);
            node.keyData[keyIndex] = maxNode.keyData[maxNode.size - 1];
            this.remove(maxNode, maxNode.keyData[maxNode.size - 1]);

         } else if (node.children[keyIndex + 1].size > M / 2 - 1) { // keydata 后子项
            // a） 节点x中位于k之前或之后的子节点y至少有t个关键词，则找出k在以y为根的子树中的前驱或后继k，递归删除k并在x中用k`代替k； 

            var size = node.children[keyIndex + 1].size;
            var minNode = this.getMinmumNode(node.children[keyIndex + 1]);
            node.keyData[keyIndex] = minNode.keyData[0];
            this.remove(minNode, minNode.keyData[0]);

         } else {
            // b） 若节点x中位于k之前或之后的子节点y和z都只有t-1个关键词，则将k和z中所有关键词合并进y（使y有2t-1个关键词），再删除z节点，删除k关键词。 
            var size = node.children[keyIndex + 1].size;
            var minNode = this.getMinmumNode(node.children[keyIndex + 1]);
            node.children[keyIndex].keyData.push(minNode.keyData[0]);
            for (var i = 0; i < size; i++) {
               node.children[keyIndex].keyData.push(node.children[keyIndex + 1].keyData[i]);
               node.children[keyIndex].children.push(node.children[keyIndex + 1].children[i]);
            }
            node.children[keyIndex].children.push(node.children[keyIndex + 1].children[i]);
            this.remove(minNode, minNode.keyData[0]);
            node.children.splice(keyIndex + 1, 1);
            node.keyData.splice(keyIndex, 1);        // 内叶子节点删除********************************
            node.size--;
            this.AjustNodeKeyNum(node);
         }
      }
   }

   /**
    * 调整内叶子节点key值数量小于 M/2-1 的问题
    * @param node 
    */
   public AjustNodeKeyNum(node: BTreeNode) {
      if (node.size < M / 2 - 1) {
         var parent = node.parent;
         var nodeIndex = this.getIndexInParent(node);
         if (parent) {
            var brotherNode = this.getValifidBrother(node);
            if (brotherNode) {
               if (this.isFrontBrother(node, brotherNode)) {
                  var maxNode = this.getMaxmumNode(brotherNode);
                  node.keyData.splice(0, 0, node.parent.keyData[nodeIndex - 1]) // key值下放
                  node.parent.keyData[nodeIndex - 1] = maxNode.keyData[maxNode.size - 1];
                  node.children.splice(0, 0, brotherNode.children[brotherNode.size]);
                  brotherNode.children[brotherNode.size].parent = node;
                  node.size++;
                  brotherNode.children.splice(brotherNode.size, 1);
                  this.remove(maxNode, maxNode.keyData[maxNode.size - 1]);
               } else {
                  var minNode = this.getMinmumNode(brotherNode);
                  node.keyData.push(node.parent.keyData[nodeIndex - 1]) // key值下放
                  node.parent.keyData[nodeIndex] = minNode.keyData[0];
                  node.children.push(brotherNode.children[0]);
                  brotherNode.children[0].parent = node;
                  node.size++;
                  brotherNode.children.splice(0, 1);
                  this.remove(minNode, minNode.keyData[0]);
               }
            } else {
               var nodeIndex = this.getIndexInParent(node);
               if (nodeIndex == 0) {  // 与后brother 合并
                  var backBrother = node.parent.children[nodeIndex + 1];
                  node.keyData.push(node.parent.keyData[nodeIndex]);
                  node.size++;
                  for (var i = 0; i < backBrother.size - 1; i++) {
                     node.keyData.push(backBrother.keyData[i]);
                     node.children.push(backBrother.children[i]);
                     node.size++;
                  }
                  node.children.push(backBrother.children[i]);
                  // 父亲节点删除一个
                  node.parent.keyData.splice(nodeIndex, 1);  // 内叶子节点删除********************************
                  node.parent.children.splice(nodeIndex + 1, 1);
                  node.parent.size--;
                  this.AjustNodeKeyNum(node.parent);
                  // 删除
               } else {  // 与前brother 合并
                  var backBrother = node.parent.children[nodeIndex - 1];
                  node.keyData.push(node.parent.keyData[nodeIndex - 1]);
                  node.size++;
                  for (var i = backBrother.size - 1; i > 0; i--) {
                     node.keyData.unshift(backBrother.keyData[i]);
                     node.children.unshift(backBrother.children[i]);
                     node.size++;
                  }
                  node.children.unshift(backBrother.children[i]);
                  // 父亲节点删除一个
                  node.parent.keyData.splice(nodeIndex - 1, 1);  // 内叶子节点删除********************************
                  node.parent.children.splice(nodeIndex - 1, 1);
                  node.parent.size--;
                  this.AjustNodeKeyNum(node.parent);
               }

            }
         }
      }
   }

   /**
    * 
    * @param node 
    */
   public getMinmumNode(node: BTreeNode): BTreeNode {
      if (node.children[0]) {
         return this.getMinmumNode(node.children[0]);
      } else {
         return node;
      }
   }


   /**
    * 
   * @param node 
   */
   public getMaxmumNode(node: BTreeNode): BTreeNode {
      if (node.children[node.size]) {
         return this.getMinmumNode(node.children[node.size]);
      } else {
         return node;
      }
   }

   /**
    * 兄弟节点是否在自己的前方
    * @param node 
    * @param brother 
    */
   public isFrontBrother(node: BTreeNode, brother: BTreeNode): boolean {
      if (brother.keyData[0] > node.keyData[0]) {
         return false;
      }
      else {
         return true;
      }
   }

   /**
    * 得到关键字数大于M/2-1 的兄弟节点
    * @param node 
    */
   public getValifidBrother(node: BTreeNode): BTreeNode {
      var parent = node.parent;
      var index = this.getIndexInParent(node);
      if (index == 0) {
         if (parent.children[index + 1].size > M / 2 - 1) {
            return parent.children[index + 1];
         }

      } else if (index == parent.size) {
         if (parent.children[index - 1].size > M / 2 - 1) {
            return parent.children[index - 1];
         }

      } else {
         if (parent.children[index - 1].size > M / 2 - 1) {
            return parent.children[index - 1];
         }
         if (parent.children[index + 1].size > M / 2 - 1) {
            return parent.children[index + 1];
         }
      }
      return null as any;

   }

}