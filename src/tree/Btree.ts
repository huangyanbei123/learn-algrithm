import { BRTreeNode } from "./RBTree";

// Ｂ树满足某种条件，与红黑树或其他搜索树不同，一棵M（M>2）的B树，是一棵M路的平衡搜索树，它允许有多条分支子树，它可以是一条空树，或者满足以下性质：
// 1、根节点至少有两个孩子
// 2、每个非根节点有[ M/2，M ]个孩子
// 3、每个非根节点有[ (M/2) -1，M-1 ]个关键字，并且以升序排序
// 4、key[i]和key[i+1]之间的孩子节点的值介于两者之间
// 5、所有的叶子节点都在同一层
//http://blog.51cto.com/muhuizz/1873257
//https://blog.csdn.net/guoziqing506/article/details/64122287
var M = 3; //
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
        this.keyData = new Array<number>(M);
        this.children = new Array<BTreeNode>(M + 1);
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
                    if (node.children[i]) { // 如果有子则放入子中
                        this.insert(node.children[i], data);
                        break;
                    } else {
                        node.keyData.splice(i, 0, data);
                        node.size++;
                        this.splitByInsert(node);
                        break;
                    }
                } else if (i == node.size - 1 && data > node.keyData[node.size - 1]) {
                    if (node.children[i]) {  // 如果有子则放入子中
                        this.insert(node.children[i], data);
                        break;
                    } else {
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
        if (node.size == M) {
            var parent: BTreeNode;
            var midKeyIndex = Math.round((M - 1) / 2);
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
                    delete node.keyData[i];
                    node.size--;
                }
                brotherNode.children.push(node.children[i]);
                if (node.children[i]) {
                    node.children[i].parent = brotherNode;
                }
                delete node.children[i];
            }
            var index = this.getIndexInParent(node);
            parent.children.splice(index, 0, brotherNode);
            parent.keyData.splice(index, 0, node.keyData[midKeyIndex]);
            parent.size++;
            delete node.keyData[midKeyIndex];
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


        return node;
    }

}