// https://www.cnblogs.com/skywang12345/p/3624291.html
//https://blog.csdn.net/v_JULY_v/article/details/6105630
/**平衡二叉树 */
// 性质1. 节点是红色或黑色。
// 性质2. 根节点是黑色。
// 性质3 每个叶节点（NIL节点，空节点）是黑色的。
// 性质4 每个红色节点的两个子节点都是黑色。(从每个叶子到根的所有路径上不能有两个连续的红色节点)
// 性质5. 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。
// 红色节点的子节点可以是黑色节点也可以是红色节点

// 关于它的特性，需要注意的是：
// 第一，特性(3)中的叶子节点，是只为空(NIL或null)的节点。
// 第二，特性(5)，确保没有一条路径会比其他路径长出俩倍。因而，红黑树是相对是接近平衡的二叉树


export enum BRTreeColor {
    Black = "black",
    Red = "red"
}
export class BRTreeNode {
    public color: BRTreeColor;
    // 数值
    public data: number;
    // 高度
    public height: number;
    // 左子树
    public left: BRTreeNode;
    // 右子树
    public right: BRTreeNode;
    // 父节点
    public parent: BRTreeNode;
    // 构造函数
    constructor() {
        this.data = null as any;
        this.height = null as any;
        this.left = null as any;
        this.right = null as any;
        this.color = null as any;
        this.parent = null as any;
    }
    // 释放函数
    public dispose() {
        this.data = null as any;
        this.height = null as any;
        this.left = null as any;
        this.right = null as any;
        this.parent = null as any;
    }
}

export class BRTree {
    /**根节点 */
    public root: BRTreeNode;

    constructor() {
        this.root = new BRTreeNode() as any;
        this.root.parent = null as any;
    }
    /**
     * 左旋
     * @param node
     */
    /* 
    * 对红黑树的节点(x)进行左旋转
    *
    * 左旋示意图(对节点x进行左旋)：
    *      px                              px
    *     /                               /
    *    x                               y                
    *   /  \      --(左旋)-->           / \                #
    *  lx   y                          x  ry     
    *     /   \                       /  \
    *    ly   ry                     lx  ly  
    *
    *
    */
    public leftRotation(node: BRTreeNode) {
        if (node == this.root) {
            var pNodeleft = node.right.left;
            this.root = node.right;
            node.right.parent = node.parent;
            node.right.left = node;
            node.parent = node.right;
            node.right = pNodeleft;
            pNodeleft.parent = node;

        } else {
            if (this.isRightChild(node)) {
                var pNodeleft = node.right.left;
                node.parent.right = node.right;
                node.right.parent = node.parent;
                node.right.left = node;
                node.parent = node.right;
                node.right = pNodeleft;
                pNodeleft.parent = node;
            } else {
                var pNodeleft = node.right.left;
                node.parent.left = node.right;
                node.right.parent = node.parent;
                node.right.left = node;
                node.parent = node.right;
                node.right = pNodeleft;
                pNodeleft.parent = node;
            }
        }
    }

    /**
     * 右旋
     * @param node
     */

    /* 
   * 对红黑树的节点(y)进行右旋转
   *
   * 右旋示意图(对节点y进行左旋)：
   *            py                               py
   *           /                                /
   *          y                                x                  
   *         /  \      --(右旋)-->            /  \                     #
   *        x   ry                           lx   y  
   *       / \                                   / \                   #
   *      lx  rx                                rx  ry
   * 
   */
    public rightRotation(node: BRTreeNode) {
        if (node == this.root) {
            var pNodeRight = node.left.right;
            this.root = node.right;
            node.left.parent = node.parent;
            node.left.right = node;
            node.parent = node.left;
            node.left = pNodeRight;
            pNodeRight.parent = node;
        } else {
            if (this.isRightChild(node)) {
                var pNodeRight = node.left.right;
                node.parent.right = node.right;
                node.left.parent = node.parent;
                node.left.right = node;
                node.parent = node.left;
                node.left = pNodeRight;
                pNodeRight.parent = node;
            } else {
                var pNodeRight = node.left.right;
                node.parent.left = node.right;
                node.left.parent = node.parent;
                node.left.right = node;
                node.parent = node.left;
                node.left = pNodeRight;
                pNodeRight.parent = node;
            }
        }
    }


    /**
     * 插入一个节点
     * @param data 
     */
    public insert(node: BRTreeNode, data: number) {
        if (node.data == null) {
            node.data = data;
            if (node == this.root) {
                node.color = BRTreeColor.Black;
            } else {
                node.color = BRTreeColor.Red;  // 插入节点必须是红色的，根结点除外
            }
        } else {
            if (data > node.data) {
                if (!node.right) {
                    node.right = new BRTreeNode();
                    node.right.parent = node;
                }
                this.insert(node.right, data);

            } else {
                if (!node.left) {
                    node.left = new BRTreeNode();
                    node.left.parent = node;
                }
                this.insert(node.left, data);
            }
        }
        if (node.color == BRTreeColor.Red) {
            this.ajustInserNode(node);
        }
        return node;
    }

    public ajustInserNode(node: BRTreeNode) {
        // 如果插入的是根结点，由于原树是空树，此情况只会违反性质2，因此直接把此结点涂为黑色；
        // 如果插入的结点的父结点是黑色，由于此不会违反性质2和性质4，红黑树没有被破坏，所以此时什么也不做。
        // ● 插入修复情况1：如果当前结点的父结点是红色且祖父结点的另一个子结点（叔叔结点）是红色
        // ● 插入修复情况2：当前节点的父节点是红色,叔叔节点是黑色，当前节点是其父节点的右子
        // ● 插入修复情况3：当前节点的父节点是红色,叔叔节点是黑色，当前节点是其父节点的左子
        //https://blog.csdn.net/v_JULY_v/article/details/6105630
        if (node.parent && node.parent.color == BRTreeColor.Red) {
            if (this.getUncleNode(node).color == BRTreeColor.Red) {
                node.parent.color = BRTreeColor.Black;
                this.getUncleNode(node).color = BRTreeColor.Black;
                node.parent.parent.color = BRTreeColor.Red;
            } else if (this.isRightChild(node)) {
                if (this.isRightChild(node.parent)) {
                    node.parent.color = BRTreeColor.Black;
                    node.parent.parent.color = BRTreeColor.Red;
                    this.leftRotation(node.parent.parent);
                } else {
                    this.leftRotation(node.parent);
                    node.parent.color = BRTreeColor.Black;
                    node.parent.parent.color = BRTreeColor.Red;
                    this.rightRotation(node.parent.parent);
                }
            } else if (!this.isRightChild(node)) {
                if (!this.isRightChild(node.parent)) {
                    node.parent.color = BRTreeColor.Black;
                    node.parent.parent.color = BRTreeColor.Red;
                    this.rightRotation(node.parent.parent);
                } else {
                    this.rightRotation(node.parent);
                    node.parent.color = BRTreeColor.Black;
                    node.parent.parent.color = BRTreeColor.Red;
                    this.leftRotation(node.parent.parent);
                }
            }

        } else if (node == this.root && node.color == BRTreeColor.Red) {
            node.color = BRTreeColor.Black;
        }
    }

    /**得到叔叔节点*/
    public getUncleNode(node: BRTreeNode) {
        if (node.parent == node.parent.parent.left) {
            return node.parent.parent.right;
        } else {
            return node.parent.parent.left;
        }
    }

    //**判断是否是右节点 */
    public isRightChild(node: BRTreeNode) {
        return node == node.parent.right ? true : false;
    }

    /**前序查找 */
    public preSearch(node: BRTreeNode, data: number) {
        if (node != null) {
            if (node.data == data) {
                return node;
            }
            this.preSearch(node.left, data);
            this.preSearch(node.right, data);
        }
    }

    /**中序查找 */
    public midSearch(node: BRTreeNode, data: number) {
        if (node != null) {
            this.preSearch(node.left, data);
            if (node.data == data) {
                return node;
            }
            this.preSearch(node.right, data);
        }
    }

    /**后序查找 */
    public postSearch(node: BRTreeNode, data: number) {
        if (node != null) {
            this.preSearch(node.left, data);
            this.preSearch(node.right, data);
            if (node.data == data) {
                return node;
            }
        }
    }

    /**删除一个节点 */
    public removeNode(node: BRTreeNode, data: number) {

        // 如果删除的是红色节点，那么原红黑树的性质依旧保持，此时不用做修正操作，
        // 如果删除的节点是黑色节点，原红黑树的性质可能会被改变，我们要对其做修正操作。
        // 如果删除节点黑色且不是树唯一节点，那么删除节点的那一个支的到各叶节点的黑色节点数会发生变化，此时性质5被破坏。
        // 如果被删节点是黑色，切它的唯一非空子节点是红色，同时被删节点的父节点也是红色，那么性质4被破坏。
        // 如果被删节点是根节点，而它的唯一非空子节点是红色，则删除后新根节点将变成红色，违背性质2。”

        // 如果是以下情况，恢复比较简单：
        // a)当前节点是红
        // 解法，直接把当前节点染成黑色，结束此时红黑树性质全部恢复。
        // b)当前节点是黑+黑且是根节点， 节点染成黑色 解法：什么都不做，结束。
        // 删除修复情况1：当前节点是黑，且兄弟节点为红色(此时父节点和兄弟节点的子节点分为黑)
        // 删除修复情况2：当前节点是黑，且兄弟是黑色且兄弟节点的两个子节点全为黑色
        // 删除修复情况3：当前节点颜色是黑，兄弟节点是黑色，兄弟的左子是红色，右子是黑色
        // 删除修复情况4：当前节点颜色是黑，它的兄弟节点是黑色，但是兄弟节点的右子是红色，兄弟节点左子的颜色任意
        var currentNode;
        if (node) {
            if (data == node.data) {  // 找到要删除的节点了
                if (node.left && node.right) {
                    // 用左支的最大值替代当前节点
                    var maxNode = this.maximumNode(node.left);
                    node.data = maxNode.data;
                    this.removeNode(node.left, maxNode.data) as any;
                    currentNode = node;
                } else {
                    if (node.left) {
                        if (node == this.root) {
                            // this.root.dispose();
                            this.root = node.left;
                            this.root.color = BRTreeColor.Black;
                        } else {
                            if (node.color == BRTreeColor.Black) {  // 如果被删除的是黑色
                                this.ajustRemoveNode(node);
                            }
                            if (this.isRightChild(node)) {
                                node.parent.right = node.left;
                            } else {
                                node.parent.left = node.left;
                            }
                            node.left.parent = node.parent;
                            currentNode = node.left;

                        }
                    } else if (node.right) {
                        if (node == this.root) {
                            //this.root.dispose();
                            this.root = node.right;
                            this.root.color = BRTreeColor.Black;
                        } else {
                            if (node.color == BRTreeColor.Black) { // 如果被删除的是黑色
                                this.ajustRemoveNode(node);
                            }
                            if (this.isRightChild(node)) {
                                node.parent.right = node.right;
                            } else {
                                node.parent.left = node.right;
                            }
                            node.right.parent = node.parent;
                            currentNode = node.right;

                        }

                    } else {  // 叶子节点
                        if (node == this.root) {
                            this.root.dispose();
                        } else {
                            if (node.color == BRTreeColor.Black) {
                                this.ajustRemoveNode(node);
                            }
                            if (this.isRightChild(node)) {
                                node.parent.right = null as any;
                            } else {
                                node.parent.left = null as any;
                            }
                            currentNode = null;
                        }

                    }
                }
            }
            else if (data > node.data) {
                this.removeNode(node.right, data) as any;
                currentNode = node;
                //删除右子树节点导致不平衡:相当于情况二或情况四
            } else if (data < node.data) {
                this.removeNode(node.left, data) as any;
                currentNode = node;
            }

            if (currentNode) {
                this.ajustInserNode(currentNode);
            }
        }
    }

    /** 调整被删除后的节点 */
    public ajustRemoveNode(node: BRTreeNode) {
        var brotherNode = this.getBrotherNode(node);
        if (brotherNode.color == BRTreeColor.Red) {  // 肯定有子，而且必须为黑
            brotherNode.color = BRTreeColor.Black;
            node.parent.color = BRTreeColor.Red;
            if (this.isRightChild(brotherNode)) {
                this.leftRotation(node.parent);
            } else {
                this.rightRotation(node.parent);
            }

        } else if (brotherNode.color == BRTreeColor.Black) {
            if (brotherNode.left && brotherNode.right) {
                if (brotherNode.left.color == BRTreeColor.Black && brotherNode.right.color == BRTreeColor.Black) {
                    brotherNode.color = BRTreeColor.Red;
                } else if (brotherNode.right.color == BRTreeColor.Black) {
                    brotherNode.color = BRTreeColor.Red;
                    brotherNode.left.color = BRTreeColor.Black;
                    this.rightRotation(brotherNode);

                } else { // 全为红色
                    brotherNode.color = node.parent.color;
                    node.parent.color = BRTreeColor.Black;
                    brotherNode.right.color = BRTreeColor.Black;
                    this.leftRotation(node.parent);
                }
            }

        }
    }

    public getBrotherNode(node: BRTreeNode): BRTreeNode {
        if (node == node.parent.left) {
            return node.parent.right;
        } else {
            return node.parent.left;
        }
    }

    /**最大值 */
    public maximumNode(node: BRTreeNode): BRTreeNode {
        if (node.right) {
            return this.maximumNode(node.right);
        } else {
            return node;
        }
    }

    /**最小值 */
    public minimumNode(node: BRTreeNode): BRTreeNode {
        if (node.left) {
            return this.maximumNode(node.left);
        } else {
            return node;
        }
    }

}