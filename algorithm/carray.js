document.title = '排序算法';

((w, d, undefined) => {
    class CArray{
        constructor(numElements){
            this.dataStore = [];
            this.pos = 0;
            this.numElements = numElements;
            for(let i = 0; i < numElements; i++){
                this.dataStore[i] = i;
            }
        }
        /**
         * 生成随机数据
         */
        setData = () => {
            let numElements = this.numElements;
            for(let i = 0; i < numElements; i++){
                this.dataStore[i] = Math.floor(Math.random() * (this.numElements + i));
            }
        }
        clear = () => {
            this.dataStore = this.dataStore.map(() => 0);
        }
        insert = element => {
            this.dataStore[this.pos++] = element;
        }
        toString = () => {
            let restr = '';
            this.dataStore.forEach((item, i) => {
                restr += item + '  ';
                if(i > 0 & i % 10 == 0){
                    restr += '\n';
                }
            });
            return restr;
        }
        swap = (arr, index1, index2) => {
            let temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
            console.log(this.toString());
        }
        /**
         * 冒泡排序
         * 循环比较相邻的数据，当左侧数据大于右侧时他们进行互换
         */
        bubbleSort = () => {
            let numElements = this.dataStore.length;
            for(let outer = numElements; outer > 1; outer--){
                for(let inner = 0; inner < outer; inner++){
                    if(this.dataStore[inner] > this.dataStore[inner+1]){
                        this.swap(this.dataStore, inner, inner+1);
                    }
                }
            }
        }
        /**
         * 选择排序
         * 从数组的开头开始，将第一个元素和其他元素进行比较
         * 检查完所有元素后，最小的元素会被放到数组的第一个位置，然后算法从第二个位置开始
         * 这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成额排序
         */
        selectSort = () => {
            let min, len = this.dataStore.length;
            for(let outer = 0; outer < len - 1; outer++){
                min = outer;
                for(let inner = outer + 1; inner < len; inner++){
                    if(this.dataStore[inner] < this.dataStore[min]){
                        min = inner;
                    }
                }
                console.log(outer, min);
                if(this.dataStore[outer] > this.dataStore[min]){
                    this.swap(this.dataStore, outer, min);
                }
            }
        }
        /**
         * 插入排序
         * 插入排序有两个循环
         * 外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及它后面的那个元素进行比较
         * 如果外循环中选中的元素比内循环中选中的元素小，那么数组元素会向右移动
         * 为内循环中的这个元素腾出位置
         */
        insertionSort(){
            let temp, inner, len = this.dataStore.length;
            for(let outer = 1; outer < len; outer++){
                temp = this.dataStore[outer];
                inner = outer;
                while(inner > 0 && (this.dataStore[inner - 1] > temp)){
                    this.dataStore[inner] = this.dataStore[inner - 1];
                    inner--;
                }
                this.dataStore[inner] = temp;
            }
        }
        /**
         * 希尔排序
         * 希尔排序本质上是一种插入排序，但是对数列进行了等间隔分组处理
         * 它会首先比较距离较远的元素，而非相邻的元素
         * 使离正确位置很远的元素更快地回到合适的位置
         * 
         * 希尔排序是按一定的间隔对数列进行分组，然后在每个分组中做插入排序
         * 随后逐次缩小间隔，在每个分组中做插入排序...直到间隔等于1，做一个插入排序后结束
         */
        shellSort = () => {
            let gaps = this.createGraps();
            console.log(gaps);
            let arr = this.dataStore, len = arr.length, temp;
            gaps.forEach(gap => {
                for(let i = gap; i < len; i++){
                    let j = i, temp = arr[i];
                    for(; j > 0; j -= gap){
                        if(temp > arr[j - gap] || arr[j - gap] == undefined){
                            break;
                        }
                        arr[j] = arr[j - gap];
                    }
                    if(arr[j] !== undefined){
                        arr[j] = temp;
                    }
                }
            });
        }
        /**
         * 生成希尔排序的间隔序列
         */
        createGraps = () => {
            let graps = [], grap = Math.floor(this.dataStore.length / 2);
            while(grap > 0){
                graps.push(grap);
                grap = Math.floor(grap / 2);
            }
            if(graps[graps.length - 1] != 1){
                graps.push(1);
            }
            return graps;
        }
        /**
         * 快速排序
         * 
         * 首先在列表中选择一个元素作为基准值
         * 数据排序围绕基准值进行，将列表中小于基准值的元素移到数组的底部
         * 将大于基准值的元素移到数组的顶部
         */
        quickSort = (arr) => {
            if(arr.length == 0){
                return [];
            }
            let left = [];
            let right = [];
            // 基准值
            let pivot = arr[0];
            arr.forEach(item => {
                if(item < pivot){
                    left.push(item);
                } else {
                    right.push(item);
                }
            });
            return this.quickSort(left).concat(pivot, this.quickSort(right));
        }
    }
    w.CArray = CArray;
})(window, document);

function test1(){
    let nums = new CArray(10);
    nums.setData();
    console.log(nums.toString());
    // nums.bubbleSort();
    // nums.selectSort();
    // nums.insertionSort();
    nums.shellSort();
    console.log(nums.toString());
}
test1();