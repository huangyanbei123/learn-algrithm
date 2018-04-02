export class Set<T> {
   private _datastore: Array<T>;

   public constructor() {
      this._datastore = [];
   }

   /**
    * 增加一条数据
    * @param data 
    */
   public add(data: T) {
      if (this._datastore.indexOf(data) == -1) {
         this._datastore.push(data);
      }
   }

   /**
    * 获取一条数据
    * @param index 
    */
   public get(index: number) {
      return this._datastore[index];
   }

   /**
    * 删除一条数据
    * @param data 
    */
   public remove(data: T) {
      var index = this._datastore.indexOf(data);
      if (index > 0) {
         this._datastore.splice(index, -1);
      }
   }

   /**
    * 获取集合的长度
    */
   public get length() {
      return this._datastore.length;
   }

   /**
    * 包含某条数据
    * @param data 
    */
   public contains(data: T): boolean {
      var index = this._datastore.indexOf(data);
      return index >= 0 ? true : false;
   }

   /**
    * 合并两个集合
    * @param set
    */
   public union(set: Set<T>) {
      var result = new Set<T>();
      var length = this.length;
      for (var i = 0; i < length; i++) {
         result.add(this.get(i));
      }
      for (var i = 0; i < set.length; i++) {
         if (!result.contains(set.get(i))) {
            result.add(set.get(i));
         }
      }
      return result;
   }

   /**
    * 交叉部分
    * @param set 
    */
   public intersect(set: Set<T>) {
      var result = new Set<T>();
      for (var i = 0; i < set.length; i++) {
         if (this.contains(set.get(i))) {
            result.add(set.get(i));
         }
      }
      return result;
   }

   /**
    * 相异部分
    * @param set 
    */
   public difference(set: Set<T>) {
      var result = new Set<T>();
      for (var i = 0; i < this.length; i++) {
         if (!set.contains(this.get(i))) {
            result.add(this.get(i));
         }
      }
      return result;

   }

   /**
    * 释放处理。
   */
   public dispose() {
      this._datastore = null as any;
   }
}