function isArray(arr){
    if(Object.prototype.toString.call(arr) !== '[object Array]'){ throw new Error('类型错误，需要为数组类型') }
    return true;
}

/**
 * 按奇偶数排序数组
 * 给定一个非负整数数组 A，返回一个由 A 的所有偶数元素组成的数组，后面跟 A 的所有奇数元素。
 * 难度：简单
 * @param {number[]} A
 * @return {number[]}
*/
let sortArrayByParity = function(A) {
    console.log('给定一个非负整数数组 A，返回一个由 A 的所有偶数元素组成的数组，后面跟 A 的所有奇数元素。');
    isArray(A);
    let len = A.length;
    if(len <= 0 || len > 5000){ throw new Error('数组 最小长度0， 最大长度5000') }
    let odd = [];
    let even = [];
    A.forEach(item => {
        if(typeof item !== 'number'){ throw new Error('数组 数值类型不正确，需要是数字类型'); }
        if(item < 0 || item > 5000){ throw new Error('数组 数值不正确，请设置5000以内的数'); }
        if(item % 2 == 0){
            even.push(item);
        } else {
            odd.push(item);
        }
    });
    return even.concat(odd);
};
console.log(`sortArrayByParity运算结果：${sortArrayByParity([3,1,2,4])}`);

/**
 * 转置矩阵
 * 给定一个矩阵 A， 返回 A 的转置矩阵。
 * 难度：简单
 * @param {number[][]} A
 * @return {number[][]}
 */
let transpose = function(A) {
    console.log('给定一个矩阵 A， 返回 A 的转置矩阵。');
    isArray(A);
    isArray(A[0]);
    let ants = [];
    A.forEach((item, index) => {
        isArray(item);
        item.forEach((arr, i) => {
            ants[i] = ants[i] ? ants[i] : []
            ants[i][index] = arr;
        });

    });
    return ants;
};
console.log(`transpose运行结果：${transpose([[1,2,3],[4,5,6]])}`);

/**
 * 数组拆分
 * 给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。
 * 难度：简单
 * @param {number[]} nums
 * @return {number}
 */
let arrayPairSum = function(nums) {
    console.log('给定长度为 2n 的数组, 你的任务是将这些数分成 n 对, 例如 (a1, b1), (a2, b2), ..., (an, bn) ，使得从1 到 n 的 min(ai, bi) 总和最大。');
    isArray(nums);
    let len = nums.length
    if(len > 20000){ throw new Error('最大长度20000'); }
    if(len === 0){ throw new Error('最小长度1'); }
    if(len % 2 !== 0){ throw new Error('长度必须为偶数') }
    if(len === 1){ return nums[0]; }
    if(len == 2){ return Math.min.apply(null, nums)}
    nums = nums.sort((a, b) => a - b);
    let arr = [];
    for(let i = 0; i < len; i+=2){
        arr.push([nums[i], nums[i+1]]);
    }
    let result = 0;
    arr.forEach(item => {
        result += Math.min.apply(null, item)
    });
    return result;
};
console.log(`arrayPairSum运行结果: ${arrayPairSum([7,3,1,0,0,6])}`);

/**
 * 杨辉三角
 * 给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。
 * 难度：简单
 * @param {number} numRows
 * @return {number[][]}
 */
let generate = function(numRows) {
    console.log('给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。');
    let arr = [];
    for(let i = 0; i < numRows; i++){
        let temp = [];
        for(let j = 0; j < i; j++){
            if(j == 0){
                temp.push(1);
            } else {
                temp.push((arr[i-1][j-1] ? arr[i-1][j-1] : 0) + arr[i-1][j]);
            }
        }
        temp.push(1);
        arr.push(temp);
    }
    return arr;
};
console.log(`generate运行结果: ${generate(5)}`);

/**
 * 重塑矩阵
 * 在MATLAB中，有一个非常有用的函数 reshape，它可以将一个矩阵重塑为另一个大小不同的新矩阵，但保留其原始数据。
 * 给出一个由二维数组表示的矩阵，以及两个正整数r和c，分别表示想要的重构的矩阵的行数和列数。
 * 重构后的矩阵需要将原始矩阵的所有元素以相同的行遍历顺序填充。
 * 如果具有给定参数的reshape操作是可行且合理的，则输出新的重塑矩阵；否则，输出原始矩阵。
 * 难度：简单
 * @param {number[][]} nums
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
let matrixReshape = function(nums, r, c) {
    console.log('重塑矩阵');
    isArray(nums);
    if(r <= 0 || c <= 0){ throw new Error('请使用正确的参数') }
    // 验证给定参数的reshape操作是可行且合理的
    let arr = nums.reduce((a, b) => {
        return a.concat(b);
    }, []);
    if(arr.length < (r * c)){ return nums }
    let array = [];
    for(let i = 0; i < r; i++){
        array.push(arr.slice(i*c, i*c+c));
    }
    return array;
};
console.log(`matrixReshape运行结果：${matrixReshape([[375,18,-195,568,-767,-14,37,434,80,286,-805,654,88,-922,-189,500,782,651,-623],[301,463,357,487,555,821,-978,-630,649,-56,-618,407,405,-870,-629,-582,678,366,-453],[815,-927,-547,-990,-357,947,202,240,-476,130,710,-748,-192,154,-768,21,210,861,266],[-85,-126,400,-425,730,40,242,321,-774,-182,94,-230,-697,281,-526,80,-413,529,131],[-856,882,-168,287,513,-817,346,418,703,-985,-882,-70,-407,876,-779,495,-712,-979,-586],[-659,915,-37,618,795,-754,187,427,-654,-258,918,525,175,-265,-520,-993,446,926,846],[105,628,-494,211,747,670,-717,71,-860,476,-474,-168,566,8,106,-407,0,-524,-150],[-431,-652,495,553,-902,237,521,916,-542,-167,-242,676,667,674,-196,471,441,-453,743],[330,278,-899,237,-795,145,-41,591,-924,-526,-651,785,995,-358,-893,-664,-902,769,458]]
    , 171, 1)}`);

/**
 * 托普利茨矩阵
 * 如果一个矩阵的每一方向由左上到右下的对角线上具有相同元素，那么这个矩阵是托普利茨矩阵。
 * 给定一个 M x N 的矩阵，当且仅当它是托普利茨矩阵时返回 True。
 * 难度：简单
 * @param {number[][]} matrix
 * @return {boolean}
 */
let isToeplitzMatrix = function(matrix) {
    isArray(matrix);
    let flg = true;
    let len = matrix.length - 1;
    while(len > 0){
        for(let i = 0, Len = matrix[len].length; i < Len; i++){
            // console.log(matrix[len-1][i-1], matrix[len][i]);
            if((matrix[len-1][i-1] || matrix[len-1][i-1] === 0) && matrix[len][i] !== matrix[len-1][i-1]){
                flg = false
            }
        }
        len--;
    }
    return flg
};
console.log(`isToeplitzMatrix运行结果：${isToeplitzMatrix([
    [0,33,98],
    [34,22,33]
])}`);

/**
 * 三数之和
 * 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
 * 难度：中等
 * @param {number[]} nums
 * @return {number[][]}
 */
let threeSum = function(nums) {
    console.log('三数之和    给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。');
    isArray(nums);
    let result = [];
    if(nums.length < 3){ return result }
    nums = nums.sort((a, b) => a -b);
    
    let Len = nums.length;
    for(let i = 0, len = Len - 1; i < len; i++){
        let negate = -nums[i],
            start = i + 1,
            end = Len - 1;
        
        while(start < end){
            if((nums[start] + nums[end]) == negate){
                let temp = [nums[i], nums[start], nums[end]];
                result.push(temp);
                
                start++;
                end--;
                
                while(start < end && nums[end] == nums[end+1]){
                    end--;
                }
                while(start < end && nums[start] == nums[start+1]){
                    start++;
                }
            } else if((nums[start] + nums[end]) < negate){
                start++;
            } else {
                end--;
            }
        }
    }
    return result
};

let threeSumNums = threeSum([-1, 0, 1, 2, -1, -4]);
console.log(`threeSum运算结果：${threeSumNums}`);


function SumClosest(num, target){
    console.log('给定一个n个整数的数组S，在S中找到三个整数，使和最接近给定的数字 target');
    isArray(num);
    if(target === null || target === undefined){ throw new Error('target is not null') }
    if(num.length === 0){ return 0; }
    if(num.length === 1){ return num[0] }
    if(num.length === 2){ return num[0] + num[1] }

    /**
     * min  在Java中用的是   Integer.MAX_VALUE;  是int类型的最大值，21e+。
     * 所以在 js中 我更变为 -1 负数
    */
    let min = -1,
        result = 0;
    
    num = num.sort();
    for(let i = 0, len = num.length - 2; i < len; i++){
        let start = i + 1,
            end = num.length - 1;
        while(start < end){
            let sum = num[i] + num[start] + num[end],
                diff = Math.abs(sum - target);
            
            /**
             * 如果 diff 绝对值 比 min 小  或者  min 是未被赋值过的时候
             * 进行第一次赋值
             * 官方 java版本中 没有对  min 是否是第一次赋值做判断，因为  它，初始化的时候是最大值
             * diff 怎么样都是 比  min小的。
             * 不过目前还有一种情况可能会出问题，那就是  diff 最大值 真的是在 21e+的 最大值的情况下
             * 会跟java 的不符
            */
            if((diff < min) || (min < 0)){
                min = diff;
                result = sum;
            }
            if(sum < target){
                start++;
            } else {
                end--;
            }
        }
    }
    return result;
}

// let num = SumClosest([-1, 2, 1, -4, 7, 10, 5, 20], 10);
// console.log(`SumClosest 运算结果：${num}`);