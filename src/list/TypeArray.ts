import { StringList } from "./StringList";

/**
 * 类型数组。
 * 
 */
export class TypeArray<T>{
   /** 集合 */
   public _datastore: Array<T>;

   /**
    * 构建当前对象的实例。
    */
   public constructor() {
      // 设置属性
      this._datastore = new Array<T>();
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
    * 设置总数。
    *
    * @param count 总数
    */
   public set count(count: number) {
      this._datastore.length = count;
   }

   /**
    * 获得第一个对象。
    *
    * @return 第一个对象
    */
   public get first(): T {
      var _datastore = this._datastore;
      return (_datastore.length > 0) ? _datastore[0] : null as any;
   }

   /**
    * 获得最后一个对象。
    *
    * @return 最后一个对象
    */
   public get last(): T {
      var _datastore = this._datastore;
      return (_datastore.length > 0) ? _datastore[_datastore.length - 1] : null as any;
   }

   /**
    * 判断是否为空。
    *
    * @return 是否为空
    */
   public isEmpty(): boolean {
      return (this._datastore.length == 0);
   }

   /**
    * 判断是否含有指定的对象。
    *
    * @param value 对象
    * @return 是否含有
    */
   public contains(value: T): boolean {
      return this._datastore.indexOf(value) != -1;
   }

   /**
    * 查找指定对象在集合中的索引位置，不存在则返回-1。
    *
    * @param value 对象
    * @return 索引位置
    */
   public indexOf(value: T): number {
      return this._datastore.indexOf(value);
   }

   /**
    * 搜索属性内容相等的对象。
    *
    * @param name 名称
    * @param value 内容
    * @return 对象
    */
   public search(name: string, value: any): T {
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = 0; i < count; i++) {
         var item = _datastore[i] as any;
         if (item[name] == value) {
            return item;
         }
      }
      return null as any;
   }

   /**
    * 查找指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public find(index: number): T {
      return this._datastore[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public get(index: number): T {
      return this._datastore[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getNvl(index: number): T {
      return this._datastore[index];
   }

   /**
    * 取得指定索引对应的对象。
    *
    * @param index 索引位置
    * @return 对象
    */
   public getAt(index: number): T {
      return this._datastore[index];
   }

   /**
    * 把对象存储在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public set(index: number, value: T) {
      this._datastore[index] = value;
   }

   /**
    * 把对象存储在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public setAt(index: number, value: T) {
      this._datastore[index] = value;
   }

   /**
    * 接收集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assign(values: TypeArray<T>) {
      var _datastore = this._datastore;
      var count = _datastore.length = values.count;
      for (var i = 0; i < count; i++) {
         _datastore[i] = values.get(i);
      }
   }

   /**
    * 接收集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public assignArray(values: Array<T>) {
      var _datastore = this._datastore;
      var count = _datastore.length = values.length;
      for (var i = 0; i < count; i++) {
         _datastore[i] = values[i];
      }
   }

   /**
    * 接收一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public assignUnique(values: TypeArray<T>) {
      this.clear();
      this.appendUnique(values);
   }

   /**
    * 接收一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public assignUniqueArray(values: Array<T>) {
      this.clear();
      this.appendArrayUnique(values);
   }

   /**
    * 追加集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public append(values: TypeArray<T>) {
      var count = values.count;
      for (var i = 0; i < count; i++) {
         var value = values.get(i)
         this.push(value);
      }
   }

   /**
    * 追加集合全部内容。
    *
    * @param values 集合
    * @return 数组
    */
   public appendArray(values: Array<T>) {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         this.push(value);
      }
   }

   /**
    * 追加一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public appendUnique(values: TypeArray<T>): TypeArray<T> {
      var count = values.count;
      for (var i = 0; i < count; i++) {
         var value = values.get(i);
         this.pushUnique(value);
      }
      return this;
   }

   /**
    * 追加一个唯一数组。
    *
    * @param values 数组
    * @return 数组
    */
   public appendArrayUnique(values: Array<T>): TypeArray<T> {
      var count = values.length;
      for (var i = 0; i < count; i++) {
         var value = values[i];
         this.pushUnique(value);
      }
      return this;
   }

   /**
    * 把对象插入在指定的索引处。
    *
    * @param index 索引位置
    * @param value 对象
    */
   public insert(index: number, value: T) {
      var _datastore = this._datastore;
      var count = _datastore.length;
      if ((index >= 0) && (index <= count)) {
         _datastore.length = count + 1;
         for (var i = count; i > index; i--) {
            _datastore[i] = _datastore[i - 1];
         }
         _datastore[index] = value;
      }
   }

   /**
    * 弹出首对象。
    *
    * @return 对象
    */
   public shift(): T {
      return this.erase(0);
   }

   /**
    * 压入首对象。
    *
    * @param value 对象
    */
   public unshift(value: T) {
      return this.insert(0, value);
   }

   /**
    * 把对象追加到集合的最后位置。
    *
    * @param value 对象
    * @return 索引值
    */
   public push(value: T) {
      this._datastore.push(value);
   }

   /**
    * 把唯一对象追加到集合的最后位置。
    *
    * @param value 对象
    * @return 索引值
    */
   public pushUnique(value: T) {
      var index = this.indexOf(value);
      if (index == -1) {
         this.push(value);
      }
   }

   /**
    * 将最后一个对象弹出集合。
    *
    * @return 对象
    */
   public pop(): T {
      var value = null;
      var _datastore = this._datastore;
      if (_datastore.length > 0) {
         value = _datastore[_datastore.length - 1];
         _datastore.length--;
      }
      return value as any;
   }

   /**
    * 写入数据。
    *
    * @return 类型数组
    */
   public write(p1?: T, p2?: T, p3?: T, p4?: T, p5?: T, p6?: T, p7?: T, p8?: T): TypeArray<T> {
      var _datastore = this._datastore;
      var count = arguments.length;
      for (var i = 0; i < count; i++) {
         _datastore[_datastore.length++] = arguments[i];
      }
      return this;
   }

   /**
    * 在集合中交换两个索引对应的对象。
    *
    * @param left 第一个对象的索引值
    * @param right 第二个对象的索引值
    */
   public swap(left: number, right: number) {
      var _datastore = this._datastore;
      var count = _datastore.length;
      if ((left >= 0) && (left < count) && (right >= 0) && (right < count) && (left != right)) {
         var value = _datastore[left];
         _datastore[left] = _datastore[right];
         _datastore[right] = value;
      }
   }

   /**
    * 对集合内容进行排序。
    *
    * @param callback 排序函数
    */
   public sort(callback: any) {
      this._datastore.sort(callback);
   }

   /**
    * 调用函数处理。
    *
    * @param callback 函数
    * @param owner 拥有者
    */
   public forEach(callback: any, owner?: any) {
      this._datastore.forEach(callback, owner);
   }

   /**
    * 调用函数处理。
    *
    * @param methodName 函数名称
    * @param parameter1 参数1
    * @param parameter2 参数2
    * @param parameter3 参数3
    * @param parameter4 参数4
    * @param parameter5 参数5
    */
   public invoke(methodName: string, parameter: any) {
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = 0; i < count; i++) {
         var item = _datastore[i] as any;
         var method = item[methodName];
         method.call(item, parameter);
      }
   }

   /**
    * 移除指定索引的存储对象。
    * 
    * @param index 索引位置
    * @return 被删除的对象
    */
   public erase(index: number): T {
      var value = null;
      var _datastore = this._datastore;
      var count = _datastore.length;
      if ((index >= 0) && (index < count)) {
         value = _datastore[index];
         var loop = count - 1;
         for (var i = index; i < loop; i++) {
            _datastore[i] = _datastore[i + 1];
         }
         _datastore.length = loop;
      }
      return value as any;
   }

   /**
    * 移除所有指定对象。
    *
    * @param value 指定对象
    */
   public remove(value: T) {
      var _datastore = this._datastore;
      var count = _datastore.length;
      if (count > 0) {
         var index = 0;
         // 移除对象
         for (var i = index; i < count; i++) {
            if (_datastore[i] != value) {
               _datastore[index++] = _datastore[i];
            }
         }
         // 清除尾部
         for (var i = index; i < count; i++) {
            _datastore[i] = null as any;
         }
         // 设置大小
         _datastore.length = index;
      }
   }

   /**
    * 将数组内项目为空的位置全部删除。
    */
   public compress() {
      var index = 0;
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = 0; i < count; i++) {
         var value = _datastore[i];
         if (value != null) {
            _datastore[index++] = value;
         }
      }
      _datastore.length = index;
   }

   /**
    * 获得排除内容的数组。
    *
    * @param value 内容
    * @return 数组
    */
   public toExtract(value: T): TypeArray<T> {
      var result = new TypeArray<T>();
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = 0; i < count; i++) {
         var find = _datastore[i];
         if (find != value) {
            result.push(find);
         }
      }
      return result;
   }

   /**
    * 获得数组。
    *
    * @param target 目标
    * @return 数组
    */
   public toArray(target?: Array<T>): Array<T> {
      var result = target || new Array<T>();
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = 0; i < count; i++) {
         var value = _datastore[i];
         result.push(value);
      }
      return result;
   }

   /**
    * 清除所有内容。
    */
   public clear(): TypeArray<T> {
      this._datastore.length = 0;
      return this;
   }

   /**
    * 克隆内容。
    */
   public clone(): TypeArray<T> {
      var result = new TypeArray<T>();
      result.append(this);
      return result;
   }

   /**
    * 释放处理。
    */
   public free() {
      this._datastore.length = 0;
   }

   /**
    * 清除数组的所有内容。
    */
   public release() {
      var _datastore = this._datastore;
      var count = _datastore.length;
      for (var i = count - 1; i >= 0; i--) {
         delete _datastore[i];
      }
      this._datastore.length = 0;
   }

   /**
    * 释放处理。
    */
   public dispose() {
      this._datastore.length = 0;
      this._datastore = null as any;
   }

   /**
    * 获得运行时信息。
    *
    * @return 运行字符串
    */
   public dump(): string {
      var _datastore = this._datastore;
      var count = _datastore.length;
      var result = new StringList();
      for (var i = 0; i < count; i++) {
         result.append(' [', _datastore[i], ']');
      }
      return result.flush();
   }
}

