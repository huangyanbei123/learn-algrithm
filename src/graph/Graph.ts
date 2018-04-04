
/**
 * 图的顶点
 */
export class GraphVertex {
   /**标记 */
   public label: boolean;
   /**关联的边 */
   public edges: Array<GraphEdge>
   /**数据 */
   public data: any;
   /**所在的图 */
   public graph: Graph;

   constructor(data?: any) {
      this.data = data;
      this.label = false;
      this.edges = new Array<GraphEdge>();
      this.graph = null as any;
   }

   /**
    * 
    * @param edge 
    */
   public addEdge(edge: GraphEdge) {
      this.edges.push(edge);
   }

   public removeEdge(edge: GraphEdge) {
      var index = this.edges.indexOf(edge);
      if (index != -1) {
         this.edges.splice(index, 1);
      }
      if (this.edges.length == 0) {
         this.graph.removeVertex(this);
      }

   }
}

/** * 图的边 */
export class GraphEdge {
   /**一端*/
   public from: GraphVertex;
   /**另一端*/
   public to: GraphVertex;

   public lable: boolean;

   public graph: Graph;

   constructor(from?: GraphVertex, to?: GraphVertex) {
      this.from = from as any;
      this.to = to as any;
      this.graph = null as any;
      this.lable = false;
   }

   /** 获取得到另外的顶点 */
   public otherVertex(vertex: GraphVertex) {
      if (vertex == this.from) {
         return this.to;
      } else if (vertex == this.to) {
         return this.from;
      } else {
         return null;
      }
   }
}

/*** 图*/
export class Graph {
   /*** 顶点序列*/
   public vertexes: Array<GraphVertex>;
   /*** 边序列*/
   public edges: Array<GraphEdge>;

   constructor() {
      this.vertexes = new Array<GraphVertex>();
      this.edges = new Array<GraphEdge>();
   }

   /**
    * 增加一条边,
    * @param point1 
    * @param point2 
    */
   public createEdge(point1: GraphVertex, point2: GraphVertex) {
      if (this.vertexes.indexOf(point1) == -1) {
         this.vertexes.push(point1);
      }

      if (this.vertexes.indexOf(point2) == -1) {
         this.vertexes.push(point2);
      }

      var result = this.edges.filter((edge) => {
         if ((edge.from == point1 && edge.to == point2) || (edge.to == point1 && edge.from == point2)) {
            return true;
         }
      })
      if (result.length == 0) {
         var edge = new GraphEdge(point1, point2);
         this.edges.push(edge);
         edge.graph = this;
      }
   }

   /**
    * 创建点
    */
   public createVertex(data?: any) {
      var point = new GraphVertex(data);
      point.graph = this;
      this.vertexes.push(point);
      return point;
   }

   /**
    * 增加一条边,
    * @param point1 
    * @param point2 
    */
   public removeEdge(edge: GraphEdge) {
      var index = this.edges.indexOf(edge);
      if (index != -1) {
         this.edges.splice(index, 1);
      }
      edge.from.removeEdge(edge);
      edge.to.removeEdge(edge);
   }

   /**
    * 移除一个点
    * @param vertex 
    */
   public removeVertex(vertex: GraphVertex) {
      var index = this.vertexes.indexOf(vertex);
      if (index != -1) {
         this.vertexes.splice(index, 1);
      }
   }

   /**
    * 深度优先搜索
    * @param startPoint 
    */
   public deepSearch(startPoint: GraphVertex) {
      startPoint.label = true;
      var edges = startPoint.edges;
      var filterEdges = edges.filter((edge) => { return !edge.lable });
      var self = this;
      filterEdges.forEach((edge) => {
         var point = edge.otherVertex(startPoint);
         if (point && !point.label) {
            self.deepSearch(point);
         }
      })
   }

   /**
    * 广度优先搜索
    * @param startPoint 
    */
   public widthSearch(startPoint: GraphVertex) {
      startPoint.label = true;
      var edges = startPoint.edges;
      var filterEdges = edges.filter((edge) => { return !edge.lable });
      var self = this;
      var points = new Array<GraphVertex>();
      filterEdges.forEach((edge) => {
         edge.lable = false;
         var point = edge.otherVertex(startPoint);
         if (point && !point.label) {
            points.push(point);
         }
      })
      points.forEach((point) => {
         self.widthSearch(point);
      })
   }

   /**
    * 初始化标签
    */
   public initLables() {
      this.vertexes.forEach((vertex) => {
         vertex.label = false;
      })

   }

}