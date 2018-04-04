
/**
 * 哈希的两种存储方法,开链法，线性列表法
 */
export enum HashStoreType {
   Linear = 'linear',
   Array = 'array'
}

/**
 * 哈希表的设计
 */
export class HashTable<K, V> {
   /** 数值存储*/
   public dataStore: Array<Array<any>>;
   /**键值存储*/
   public valueStore: Array<V>;
   public keyStore: Array<K>;
   /**存储方法，防止碰撞的*/
   public type: HashStoreType;

   /**
    * 构造函数
    * @param type 
    * @param length 
    */
   constructor(type = HashStoreType.Linear, length = 200) {
      this.type = type;
      this.dataStore = new Array<Array<any>>(length);
      // if (type == HashStoreType.Linear) {
      this.keyStore = new Array<K>(length);
      this.valueStore = new Array<V>(length);
      //  }
   }

   /**
    * 存储
    * @param key 
    * @param value 
    */
   public set(key: K, value: V) {
      if (this.type == HashStoreType.Array) {
         /**开链法存储 */
         var pos = this.betterHash(key);
         var index = 0;
         if (this.dataStore[pos][index] == undefined) {
            this.dataStore[pos][index] = key;
            this.dataStore[pos][++index] = value;
            ++index;
         }
         else {
            while (this.dataStore[pos][index] != undefined) {
               ++index;
            }
            this.dataStore[pos][index] = key;
            this.dataStore[pos][++index] = value;
            ++index;
         }
      }
      if (this.type == HashStoreType.Linear) {
         var pos = this.betterHash(key);
         while (this.keyStore[pos] != undefined) {
            pos++;
         }
         this.valueStore[pos] = value;
         this.keyStore[pos] = key;
      }
   }

   /**
    * 获取
    * @param key 
    */
   public get(key: K) {
      if (this.type == HashStoreType.Array) {
         var index = 0;
         var pos = this.betterHash(key);
         if (this.dataStore[pos][index] = key) {
            return this.dataStore[pos][index + 1];
         }
         else {
            while (this.dataStore[pos][index] != key || this.dataStore[pos][index] != null) {
               index += 2;
            }
            return this.dataStore[pos][index + 1];
         }
      }
      if (this.type == HashStoreType.Linear) {

         var pos = this.betterHash(key);
         while (this.keyStore[pos] != key && this.keyStore[pos] != undefined) {
            pos++;
         }
         return this.valueStore[pos];
      }
   }

   /**
    * 简单哈希函数
    * @param key 
    */
   public simpleHash(key: K): number {
      if (typeof (key) == "string") {
         var total = 0;
         for (var i = 0; i < key.length; ++i) {
            total += key.charCodeAt(i);
         }
         return total % this.dataStore.length;
      }
      return 0;
   }

   /**
    * 复杂哈希函数
    * @param key 
    */
   public betterHash(key: K): number {
      if (typeof (key) == "string") {
         const H = 37;
         var total = 0;
         for (var i = 0; i < key.length; ++i) {
            total += H * total + key.charCodeAt(i);
         }
         total = total % this.dataStore.length;
         if (total < 0) {
            total += this.dataStore.length - 1;
         }
         return total;
      }
      return 0;
   }

}