/**
 * 表节点。
 */
export class MapNode<N, V>{
   public name: N;
   public value: V;

   constructor() {
      this.name = null as any;
      this.value = null as any;
   }
   /**
    * 释放所有内容。
    *
    * @param flag 标志
    */
   public dispose() {
      this.name = null as any;
      this.value = null as any;
   }
};

/**
 * 名称和内容的关联保存表的表。
 * 
 */
export class TypeMap<N, V>{
   /** 名称集合 */
   protected _datastore: Array<MapNode<N, V>>;

   /**
    * 构造处理。
    */
   public constructor() {
      // 设置属性
      this._datastore = new Array<MapNode<N, V>>();
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return this._datastore.length == 0;
   }

   /**
    * 获得总数。
    *
    * @return 总数
    */
   public get count(): number {
      return this._datastore.length;
   }

   /**
    * 判断是否含有指定的名称。
    *
    * @param name 名称
    * @return 是否含有
    */
   public contains(name: N): boolean {
      if (name != null) {
         var index = this.indexOf(name);
         if (index != -1) {
            return true;
         }
      }
      return false;
   }

   /**
    * 判断是否含有指定的内容。
    *
    * @param value 内容
    * @return 是否含有
    */
   public containsValue(value: V): boolean {
      var index = this.indexOfValue(value);
      if (index != -1) {
         return true;
      }
      return false;
   }

   /**
    * 查找指定名称在表中的索引位置，不存在则返回-1。
    *
    * @param name 名称
    * @return 索引位置
    */
   public indexOf(name: N): number {
      var result = -1;
      if (name != null) {
         var entries = this._datastore;
         var count = entries.length;
         for (var i = 0; i < count; i++) {
            var entry = entries[i];
            if (entry.name === name) {
               result = i;
               break;
            }
         }
      }
      return result;
   }

   /**
    * 查找指定对象在表中的第一次出现的索引位置，不存在则返回-1。
    *
    * @param value 内容
    * @return 索引位置
    */
   public indexOfValue(value: V): number {
      var result = -1;
      var entries = this._datastore;
      var count = entries.length;
      for (var i = 0; i < count; i++) {
         var entry = entries[i];
         if (entry.value === value) {
            result = i;
            break;
         }
      }
      return result;
   }

   /**
    * 查找第一个内容。
    *
    * @return 内容
    */
   public get first(): V {
      var result: V = null as any;
      var entries = this._datastore;
      if (entries.length > 0) {
         var entry = entries[0];
         result = entry.value;
      }
      return result;
   }

   /**
    * 查找最后一个内容。
    *
    * @return 内容
    */
   public get last(): V {
      var result: V = null as any;
      var entries = this._datastore;
      var count = entries.length;
      if (count > 0) {
         var entry = entries[count - 1];
         result = entry.value;
      }
      return result;
   }

   /**
    * 根据名称查找内容。
    * 如果内容不存在，返回默认内容。
    *
    * @param name 名称
    * @param defaultValue 默认内容
    * @return 内容
    */
   public get(name: N, defaultValue: V = null as any): V {
      var entries = this._datastore;
      var count = entries.length;
      for (var i = 0; i < count; i++) {
         var entry = entries[i];
         if (entry.name === name) {
            return entry.value;
         }
      }
      return defaultValue;
   }

   /**
    * 根据名称设置内容。
    *
    * @param name 名称
    * @param value 默认内容
    * @return 内容
    */
   public set(name: N, value: V) {
      var entries = this._datastore;
      var count = entries.length;
      for (var i = 0; i < count; i++) {
         var entry = entries[i];
         if (entry.name === name) {
            entry.value = value;
            return;
         }
      }
      var entry = new MapNode<N, V>();
      entry.name = name;
      entry.value = value;
      entries.push(entry);
   }


   /**
    * 将当前表内容全部置为另一个表的全部内容。
    *
    * @param map 表
    */
   public assign(map: TypeMap<N, V>): void {
      this.clear();
      this.append(map);
   }

   /**
    * 在当前表中追加另一个表的全部内容。
    *
    * @param map 表
    */
   public append(map: TypeMap<N, V>): void {
      if (map) {
         var entries = map._datastore;
         var count = entries.length;
         for (var i = 0; i < count; i++) {
            var entry = entries[i];
            var name = entry.name;
            var value = entry.value;
            this.set(name, value);
         }
      }
   }

   /**
    * 删除指定名称的内容。
    *
    * @param name 名称
    * @return 删除的内容
    */
   public removeName(name: N) {
      var entries = this._datastore;
      var count = entries.length;
      for (var i = count - 1; i >= 0; i--) {
         var entry = entries[i];
         if (entry.name === name) {
            entries = entries.splice(i, 1);
         }
      }
      this._datastore = entries;
   }

   /**
    * 删除指定的内容。
    *
    * @param value 内容
    */
   public removeValue(value: V) {
      var entries = this._datastore;
      var count = entries.length;
      for (var i = count - 1; i >= 0; i--) {
         var entry = entries[i];
         if (entry.value === value) {
            entries = entries.splice(i, 1);
         }
      }
      this._datastore = entries;
   }

   /**
    * 调用函数处理。
    *
    * @param owner 拥有者
    * @param callback 函数
    * @param parameters 参数集合
    */
   public invoke(owner: any, callback: Function, parameters?: any) {
      var entries = this._datastore;
      for (var name in entries) {
         var entry = entries[name];
         callback.call(owner, entry, parameters);
      }
   }

   /**
    * 清除所有内容。
    */
   public clear() {
      var entries = this._datastore;
      for (var name in entries) {
         var entry = entries[name];
         entry.dispose();
         delete entries[name];
      }
   }

   /**
    * 释放所有内容。
    *
    * @param flag 标志
    */
   public dispose(flag: boolean = false) {
      var entries = this._datastore;
      for (var name in entries) {
         var entry = entries[name];
         entry.dispose();
         delete entries[name];
      }
      this._datastore = null as any;
   }
}
