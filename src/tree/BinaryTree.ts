import { BtreeNode } from "./BtreeNode";

export class BinaryTree {
    /**根节点 */
    public root: BtreeNode;
    constructor() {
        this.root = new BtreeNode();
    }

    /**
     * 插入一个节点
     * @param data 
     */
    public insert(node: BtreeNode, data: number): BtreeNode {

        if (node.data == null) {
            node.data = data;
            return node;
        } else {
            if (data >= node.data) {
                if (!node.right) {
                    node.right = new BtreeNode();
                }
                node.right = this.insert(node.right, data);

            } else {
                if (!node.left) {
                    node.left = new BtreeNode();
                }
                node.left = this.insert(node.left, data);
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

    /**后序查找 */
    public show(node: BtreeNode) {
        if (node != null) {
            if (node == this.root) {
                console.log("root:", node.data);
            }
            if (node.left && node.right) {
                console.log("parent:", node.data, "left:", node.left.data, "right:", node.right.data);
                this.show(node.left);
                this.show(node.right);
            } else if (node.left) {
                console.log("parent:", node.data, "left:", node.left.data, "right:", "null");
                this.show(node.left);
            } else if (node.right) {
                console.log("parent:", node.data, "left:", "null", "right:", node.right.data);
                this.show(node.right);
            } else {
                console.log("parent:", node.data, "left:", "null", "right:", "null");
            }
        }
    }

    /**删除一个节点 */
    public remove(node: BtreeNode, data: number) {
        // 1. 如果二叉树上包含该节点，则删除。
        // 2. 如果要删除的节点是叶子节点，没有子节点，可以直接删除
        // 3. 如果只包含一个子节点，那么子节点替换父节点的位置
        // 4. 如果删除的节点有两个节点,有两种处理方法
        //   (1) 查找左子树的最大值
        //   (2) 查找右子树的最小值
        //   替换要删除的节点。
        if (node) {
            if (node.data == data) {
                if (node.left && node.right) {
                    var maxNode = this.maximumNode(node.left);
                    node.data = maxNode.data;
                    node.left = this.remove(node.left, maxNode.data) as any;
                    return node;

                } else if (node.left) {
                    return node.left;

                } else if (node.right) {
                    return node.right;

                } else {
                    return null;

                }
            } else if (data > node.data) {
                node.right = this.remove(node.right, data) as any;
            } else if (data < node.data) {
                node.left = this.remove(node.left, data) as any;
            }
        }
        return node;
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