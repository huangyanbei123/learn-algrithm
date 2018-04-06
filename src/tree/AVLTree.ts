import { BtreeNode } from "./BtreeNode";
//https://www.cnblogs.com/QG-whz/p/5167238.html
// AVL树本质上还是一棵二叉搜索树，它的特点是：
// 1.本身首先是一棵二叉搜索树。
// 2.带有平衡条件：**每个结点**的左右子树的高度之差的绝对值（平衡因子）最多为1。
// 3. 也就是说，AVL树，本质上是带了平衡功能的二叉查找树（二叉排序树，二叉搜索树）
// 4. 查找、插入和删除在平均和最坏情况下都是O（log n）
// 5. 高度为 h 的 AVL 树，节点数 N 最多2^h − 1； 最少N(h)=N(h− 1) +N(h− 2) + 1。
// 6. 最小不平衡子树

/**平衡二叉树 */
export class AVLTree {
    /**根节点 */
    public root: BtreeNode;

    constructor() {
        this.root = new BtreeNode() as any;
    }
    /**
     * 左旋
     * @param node
     */
    public leftRotation(node: BtreeNode) {
        var nodeRight = node.right;
        var newNode = new BtreeNode();

        newNode.data = node.data;
        newNode.left = node.left;
        newNode.right = nodeRight.left

        node.data = nodeRight.data;
        node.right = nodeRight.right;
        node.left = newNode;  // 变成左支，左旋

        newNode.height = Math.max(this.height(newNode.left), this.height(newNode.right)) + 1;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        return node;
    }

    /**
     * 右旋
     * @param node
     */
    public rightRotation(node: BtreeNode) {
        var nodeLeft = node.left;
        var newNode = new BtreeNode();

        newNode.data = node.data;
        newNode.right = node.right;
        newNode.left = nodeLeft.right

        node.data = nodeLeft.data;
        node.left = nodeLeft.left;
        node.right = newNode;  // 变成右支， 右旋

        newNode.height = Math.max(this.height(newNode.left), this.height(newNode.right)) + 1;
        node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
        return node;
    }

    /**
     * 先左旋，后右旋
     * @param node
     */
    public leftRightRotation(node: BtreeNode) {
        node.right = this.rightRotation(node.right);
        return this.leftRotation(node);
    }

    /**
     * 先右旋，后左旋
     * @param node
     */
    public rightLeftRotation(node: BtreeNode) {
        node.left = this.leftRotation(node.left);
        return this.rightRotation(node);
    }

    /**
     * 返回节点高度
     * @param node 
     */
    public height(node?: BtreeNode): number {
        if (node != null) {
            return node.height;
        }
        return 0;
    }

    /**
     * 插入一个节点
     * @param data 
     */
    public insert(node: BtreeNode, data: number) {
        if (node.data == null) { // 找到插入位置
            node.data = data;
        } else if (data > node.data) { // 向右支查找
            if (!node.right) { // 找到插入位置
                node.right = new BtreeNode();
            }
            node.right = this.insert(node.right, data);
            if (this.height(node.right) - this.height(node.left) == 2) {
                // 向右插入，分两种情况，
                // 1 .父是右支，再右插入  
                // 2 .父是左支，再右插入
                if (data > node.right.data) {
                    // 右支右插入
                    return this.leftRotation(node);
                } else if (data < node.right.data) {
                    // 右支左插入
                    return this.rightLeftRotation(node);
                }
            }
        } else if (data < node.data) {
            if (!node.left) {
                node.left = new BtreeNode();
            }
            node.left = this.insert(node.left, data);
            // 向左插入，分两种情况，
            // 1 .父是左支，再左插入  
            // 2 .父是右支，再左插入
            if (data < node.left.data) {
                return this.rightRotation(node);
            } else if (data > node.left.data) {
                return this.leftRightRotation(node);
            }
        }
        return node;
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

    /**删除一个节点 */
    public removeNode(node: BtreeNode, data: number) {
        // 删除节点也可能导致AVL树的失衡，实际上删除节点和插入节点是一种互逆的操作：
        // 删除右子树的节点导致AVL树失衡时，相当于在左子树插入节点导致AVL树失衡，即情况情况二或情况四。
        // 删除左子树的节点导致AVL树失衡时，相当于在右子树插入节点导致AVL树失衡，即情况情况一或情况三。
        // 另外，AVL树也是一棵二叉排序树，因此在删除节点时也要维护二叉排序树的性质。
        // 删除节点时，如果节点同时拥有左子树和右子树，则在高度教低的子树上选择最大（或最小）元素进行替换，这样能保证替换后不会再出现失衡的现象。
        if (node) {
            if (data == node.data) {  // 找到要删除的节点了
                if (node.left && node.right) {
                    if (this.height(node.left) > this.height(node.right)) {
                        // 用左支的最大值替代当前节点
                        var maxNode = this.maximumNode(node.left);
                        node.data = maxNode.data;
                        node.left = this.removeNode(node.left, maxNode.data) as any;
                        return node;
                    } else {
                        var minNode = this.minimumNode(node.right);
                        node.data = minNode.data;
                        node.right = this.removeNode(node.right, minNode.data) as any;
                        return node;
                    }
                } else {
                    if (node.left) {
                        return node.left;

                    } else if (node.right) {
                        return node.right;

                    } else {
                        return null;
                    }
                }
            }
            else if (data > node.data) {
                node.right = this.removeNode(node.right, data) as any;
                //删除右子树节点导致不平衡:相当于情况二或情况四
                if (this.height(node.left) - this.height(node.right) == 2) {
                    //相当于在左子树上插入右节点造成的失衡（情况四）
                    if (this.height(node.left.right) > this.height(node.left.left)) {
                        return this.leftRightRotation(node);
                    }
                    else//相当于在左子树上插入左节点造成的失衡（情况二）
                    {
                        return this.rightRotation(node);
                    }
                } else {
                    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
                }

            } else if (data < node.data) {

                node.left = this.removeNode(node.left, data) as any;
                //删除右子树节点导致不平衡:相当于情况二或情况四
                if (this.height(node.right) - this.height(node.left) == 2) {
                    //相当于在左子树上插入右节点造成的失衡（情况四）
                    if (this.height(node.right.left) > this.height(node.right.right)) {
                        return this.rightLeftRotation(node);
                    }
                    else//相当于在左子树上插入左节点造成的失衡（情况二）
                    {
                        return this.leftRotation(node);
                    }
                } else {
                    node.height = Math.max(this.height(node.left), this.height(node.right)) + 1;
                }
            }
            return node;
        }
    }

    /**最大值 */
    public maximumNode(node: BtreeNode): BtreeNode {
        if (node.right) {
            return this.maximumNode(node.right);
        } else {
            return node;
        }
    }

    /**最小值 */
    public minimumNode(node: BtreeNode): BtreeNode {
        if (node.left) {
            return this.maximumNode(node.left);
        } else {
            return node;
        }
    }

}