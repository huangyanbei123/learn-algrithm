export class BtreeNode {

    // 数值
    public data: number;
    // 高度
    public height: number;
    // 左子树
    public left: BtreeNode;
    // 右子树
    public right: BtreeNode;
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