document.title = '图';

((w, d, undefined) => {
    /**** 定义 ****/
    /**
     * 图中的一系列顶点构成路径，路径中所有的顶点都由边连接。
     * 路径的长度用路径中第一个 顶点到最后一个顶点之间边的数量表示。
     * 由指向自身的顶点组成的路径称为环，环的长度 为 0。 
     * 圈是至少有一条边的路径，且路径的第一个顶点和最后一个顶点相同。
     * 无论是有向图还是 无向图，只要是没有重复边或重复顶点的圈，就是一个简单圈。
     * 除了第一个和最后一个顶 点以外，路径的其他顶点有重复的圈称为平凡圈。 
     * 如果两个顶点之间有路径，那么这两个顶点就是强连通的，反之亦然。
     * 如果有向图的所有 的顶点都是强连通的，那么这个有向图也是强连通的。
     * 
     * 图的实际信息都保存在边上面，因为他们描述了图的结构
     */
    // 用来保存顶点和边的
    class Vertex{
        constructor(label, wasVisited){
            // 标识顶点
            this.label = label;
            // 表明这个顶点是否被访问过
            this.wasVisited = wasVisited;
        }
    }
    class Graph{
        constructor(v){
            // 顶点个数
            this.vertices = v;
            // 顶点名称列表
            this.vertextList = [];
            this.edges = 0;
            // 顶点
            this.adj = [];
            // 是否访问过
            this.marked = [];
            // 路径表
            this.edgeTo = [];
            for(let i = 0, len = this.vertices; i < len; i++){
                this.adj[i] = [];
                this.adj[i].push('');
                this.marked[i] = false;
            }
        }
        /**
         * 添加点
         * @param {*} v 当前顶点
         * @param {*} w 与其相连的顶点
         */
        addEdge = (v, w) => {
            // 表示2个顶点互通
            this.adj[v].push(w);
            this.adj[w].push(v);
            this.edges++;
        }
        /**
         * 显示图
         * @param {Function} callback 回调函数
         */
        showGraph = callback => {
            let visited = [];
            let len = this.vertices;
            for(let i = 0; i < len; i++){
                if(!callback){
                    console.log(i + ' -> ');
                }
                visited.push(this.vertextList[i]);
                for(let j = 0; j < len; j++){
                    if(this.adj[i][j] != undefined){
                        if(visited.indexOf(this.vertextList[j]) < 0){
                            if(callback){
                                // callback(this.adj[i][j]);
                                callback(this.vertextList[j]);
                            } else {
                                // console.log(this.adj[i][j] + '    ');
                                console.log(this.vertextList[j] + '    ');
                            }
                        }
                    }
                }
                visited.pop();
            }
        }
        /**
         * 深度优先搜索
         * @param {*} v 当前顶点
         */
        dfs = v => {
            this.marked[v] = true;
            if(this.adj[v] != undefined){
                console.log(`Visited vertex:   ${v}`);
                this.adj[v].forEach(i => {
                    if(!this.marked[i]){
                        this.dfs(i);
                    }
                });
            }
        }
        /**
         * 广度优先搜索
         * 
         * 1、查找与当前顶点相邻的未访问顶点，将其添加到已访问顶点列表以及队列中
         * 2、从图中取出下一个顶点v，添加到已访问的顶点列表
         * 3、将所有与v相邻的未访问顶点添加到队列
         * 
         * @param {*} s 当前顶点
         */
        bfs = s => {
            let queue = [];
            this.marked[s] = true;
            queue.push(s); // 添加至队尾
            while(queue.length > 0){
                let v = queue.shift(); // 取出第一个
                if(this.adj[v] != undefined){
                    console.log(`Visited vertex:   ${v}`);
                    this.adj[v].forEach(i => {
                        if(!this.marked[i]){
                            this.edgeTo[i] = v;
                            this.marked[i] = true;
                            queue.push(i);
                        }
                    });
                }
            }
        }
        /**
         * 寻找最短路径
         * @param {*} v 当前顶点
         */
        pathTo = v => {
            let source = 0; // 其实本质上就是初始顶点的值，所有的顶点都能回到初顶点，形成一个闭环
            if(!this._hasPathTo(v)){
                return undefined;
            }
            let path = [];
            for(let i = v; i != source; i = this.edgeTo[i]){
                path.push(i);
            }
            path.push(source);
            return path;
        }
        /**
         * 判断是否为路径
         * @param {*} v 当前顶点
         */
        _hasPathTo = v => {
            return this.marked[v];
        }
        /**
         * 拓扑排序
         * 
         * 拓扑排序算法不会立即输出已访问的顶点，而是访问当前顶点邻接表中的所有相邻顶点
         * 直到这个列表穷尽时，才将当前顶点压入栈中
         * 
         * @param {Function} callback 回调函数
         */
        topSort = (callback) => {
            let stack = [],
                len = this.vertices,
                visited = [];
            // 先预设一遍值
            for(let i = 0; i < len; i++){
                visited[i] = false;
            }
            for(let i = 0; i < len; i++){
                if(visited[i] == false){
                    this._topSortHelper(i, visited, stack);
                }
            }
            // 输出
            for(let i = 0; i < stack.length; i++){
                if(stack[i] != undefined && stack[i] != false){
                    if(callback){
                        callback(this.vertextList[stack[i]]);
                    } else {
                        console.log(this.vertextList[stack[i]]);
                    }
                }
            }
        }
        /**
         * 拓扑排序辅助方法
         * @param {*} v 当前顶点
         * @param {Array} visited 顶点是否访问过列表
         * @param {Array} stack 路径
         */
        _topSortHelper = (v, visited, stack) => {
            visited[v] = true;
            if(this.adj[v] != undefined){
                this.adj[v].forEach(i => {
                    if(!visited[i]){
                        this._topSortHelper(visited[i], visited, stack);
                    }
                });
            }
            stack.push(v);
        }
    }
    w.Graph = Graph;
})(window, document);

function test1(){
    let g = new Graph(6);
    g.addEdge(1, 2);
    g.addEdge(2, 5);
    g.addEdge(1, 3);
    g.addEdge(1, 4);
    g.addEdge(0, 1);
    // g.bfs(0);
    // let vertex = 4;
    // let path = g.pathTo(vertex).reverse();
    // console.log(`顶点${vertex}的最短路径为：${path.join('->')}`);
    g.vertextList = ["CS1", "CS2", "Data Structures", "Assembly Language", "Operating Systems", "Algorithms"];
    // g.showGraph(); 
    g.topSort();
}
test1();