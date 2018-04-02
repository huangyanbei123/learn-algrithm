import { StringList } from "./StringList";

/**
 * 类型数组。
 * 
 */
export class TypeStack<T>{
   /** 集合 */
   public _datastore: Array<T>;
   public top: number;

   /**
    * 构建当前对象的实例。
    */
   public constructor() {
      // 设置属性
      this._datastore = new Array<T>();
      this.top = 0;
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
    * 把对象追加到集合的最后位置。
    *
    * @param value 对象
    * @return 索引值
    */
   public push(value: T) {
      this._datastore.push(value);
      this.top++;
   }


   /**
    * 将最后一个对象弹出集合。
    *
    * @return 对象
    */
   public pop(): T {
      var value = null;
      if (this._datastore.length > 0) {
         value = this._datastore.pop();
      }
      return value as any;
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
   public clear(): TypeStack<T> {
      this._datastore.length = 0;
      return this;
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

