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
 * 求众数
 * 给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 * 难度：简单
 * @param {number[]} nums
 * @return {number}
 */
let majorityElement = function(nums) {
    console.log('给定一个大小为 n 的数组，找到其中的众数。众数是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。');
    isArray(nums);
    let result = '', len = nums.length;
    if(!len){ throw new Error('数组不能为空') }
    nums = nums.sort((a, b) => a - b);
    // 最小满足条件
    let minLen = len / 2;
    // 当前元素重复数
    let maxLen = 0;
    let curryNum = '';
    for(let num of nums){
        if(num === curryNum){
            maxLen++;
        } else {
            // 如果有一个满足条件就可以直接结束了，因为  当整个数组中 有至少一半是这个数，那么就再也没有比这个数多的了
            if(maxLen >= minLen){ return curryNum; }
            curryNum = num;
            maxLen = 1;
        }
    }
    // 保证最后一次也能正确计算在内
    if(maxLen >= minLen){ result = curryNum; }
    return result;
};
console.log(`majorityElement运行结果：${majorityElement([3,3,4])}`);

/**
 * 移动零
 * 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。
 * 难度：简单
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
let moveZeroes = function(nums) {
    isArray(nums);
    let len = 0;
    if(nums.indexOf(0) == -1){ return nums }
    for(let num of nums){
        if(num === 0){ len++; }
    }
    for(let i = 0; i < len; i++){
        nums.push(nums.splice(nums.indexOf(0), 1)[0]);
    }
    return nums;
};
console.log(`moveZeroes运行结果：${moveZeroes([0,1,0,3,12])}`);

/**
 * 杨辉三角 2
 * 给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。
 * 难度：简单
 * @param {number} rowIndex
 * @return {number[]}
 */
let getRow = function(rowIndex) {
    console.log('给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。');
    let arr = [];
    for(let i = 0; i <= rowIndex; i++){
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
    return arr[rowIndex];
};
console.log(`getRow运行结果：${getRow(3)}`);

/**
 * 岛屿最大面积
 * 给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。
 * 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为0。)
 * 难度：简单
 * @param {number[][]} grid
 * @return {number}
 */
let maxAreaOfIsland = function(grid) {
    console.log('给定一个包含了一些 0 和 1的非空二维数组 grid , 一个 岛屿 是由四个方向 (水平或垂直) 的 1 (代表土地) 构成的组合。你可以假设二维矩阵的四个边缘都被水包围着。');
    isArray(grid);
    let visited = JSON.parse(JSON.stringify(grid));
    let size = 0, len = grid.length, k = grid[0].length;
    if(len > 50){ throw new Error('宽度不能超过50') }
    if(k > 50){ throw new Error('长度不能超过50') }
    for(let i = 0; i < len; i++){
        for(let j = 0; j < k; j++){
            if(visited[i][j] == 1){
                let n = island(visited, i, j, len, k);
                size = Math.max(size, n);
            }
        }
    }
    function island(grid, i, j, len, k){
        if(i >= 0 && i < len && j >= 0 && j < k && grid[i][j] == 1){
            // 防止重复计算
            grid[i][j] = 0;
            // 计算四边形
            return 1 + island(grid, i+1, j, len, k) + island(grid, i-1, j, len, k) + island(grid, i, j+1, len, k) + island(grid, i, j-1, len, k);
        }
        return 0;
    }
    return size;
};
console.log(`maxAreaOfIsland运行结果：${maxAreaOfIsland([
    [0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]
])}`);

/**
 * 移除元素
 * 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
 * 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
 * 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
 * 难度：简单
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
let removeElement = function(nums, val) {
    isArray(nums)
    for(let i = 0, len = nums.length; i < len; i++){
        if(nums[i] === val){
            nums.splice(i, 1);
            i--;
        }
    }
    // console.log(nums);
    return nums.length
};
console.log(`removeElement运行结果：${removeElement([3,2,2,3], 3)}`);

/**
 * 买卖股票的最佳时机
 * 如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。
 * 难度：简单
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit = function(prices) {
    console.log('如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。');
    isArray(prices);
    let len = prices.length;
    if(len < 2){ return 0 }
    let min = prices[0];
    let max = 0;
    prices.forEach(item => {
        max = Math.max(max, item - min);
        min = Math.min(min, item);
    });
    return max
};
console.log(`maxProfit运行结果：${maxProfit([7,1,5,3,6,4])}`);

/**
 * 最大连续1的个数
 * 给定一个二进制数组， 计算其中最大连续1的个数。
 * 难度：简单
 * @param {number[]} nums
 * @return {number}
 */
let findMaxConsecutiveOnes = function(nums) {
    console.log('给定一个二进制数组， 计算其中最大连续1的个数。');
    isArray(nums);
    let len = nums.length;
    if(len < 1 || len > 10000){ throw new Error('数组长度不正确') }
    if(nums.indexOf(1) == -1){ return 0 }
    // let n = 0, arr = [];
    // nums.forEach(item => {
    //     if(item === 1){
    //         n++;
    //     } else if(item === 0 && n > 0){
    //         arr.push(n);
    //         n = 0;
    //     }
    // });
    // if(n > 0){
    //     arr.push(n);
    //     n = 0;
    // }
    // console.log(arr);
    // let max = Math.max.apply(null, arr);
    // let max = Math.max(...nums.join('').split('0').map(item => item.length));
    let max = 0, curr = 0;
    nums.map(item => {
        if(item === 1){
            max = max > curr ? curr++ : curr;
        } else {
            curr = 0;
        }
    });
    return max;
};
console.log(`findMaxConsecutiveOnes运行结果：${findMaxConsecutiveOnes([1,1,0,1,1,1])}`);

/**
 * 买卖股票的最佳时机2
 * 给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
 * 难度：简单
 * @param {number[]} prices
 * @return {number}
 */
let maxProfit2 = function(prices) {
    console.log('设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。');
    isArray(prices);
    let len = prices.length;
    if(len == 0){ return 0 }
    // // 买入价、利润
    // let buy = new Array(len),
    //     sell = new Array(len);
        
    // buy[0] = prices[0];
    // sell[0] = 0;
    // for(let i = 1; i < len; i++){
    //     buy[i] = Math.min(buy[i - 1], prices[i] - sell[i-1]);
    //     sell[i] = Math.max(sell[i - 1], prices[i] - buy[i-1]);
    // }
    let max = 0;
    prices.forEach((item, i) => {
        let d = item - prices[i-1];
        d > 0 ? max += d : '';
    });
    return max;
};
console.log(`maxProfit2运行结果：${maxProfit2([7,1,5,3,6,4])}`);

/**
 * 缺失数字
 * 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
 * 难度：简单
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    console.log('给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。');
    isArray(nums);
    let n = nums.length;
    if(n < 1){ return 0 }
    if(n < 2){ return nums[0] > 0 ? nums[0]-1 : nums[0]+1 }
    nums = nums.sort((a, b) => a - b);
    let num = nums[0] - 1;
    nums.some((item, i) => {
        if(item+1 < nums[i+1]){
            num = item+1;
            return;
        }
    });
    num = num >= 0 ? num : nums[n-1]+1;
    return num;
};
console.log(`missingNumber运行结果：${missingNumber([0,2])}`);

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

/**
 * 验证回文串
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 * 难度：简单
 * @param {String} s 需要验证的字符串
 * @return {Boolean} 是否为回文字符串
 */
var isPalindrome = function(s){
    // var reg= /^[A-Za-z0-9]+$/;
    // let list = s.toLowerCase().split('').filter(item => reg.test(item));
    // console.log(list);
    // return list.join('') == list.reverse().join('');
    let str = s.replace(/\W/g, '').toLowerCase(),
        left = 0,
        right = str.length - 1;
    while(left < right){
        if(str[left] !== str[right]){
            return false;
        }
        left++;
        right--;
    }
    return true;
}

console.log(`输入: "A man, a plan, a canal: Panama"， 输出${isPalindrome("A man, a plan, a canal: Panama")}`);
console.log(`输入: "race a car"， 输出${isPalindrome("race a car")}`);
console.log(`输入: "0P"， 输出${isPalindrome("0P")}`);

/**
 * 两数之和
 * 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
 * 难度：简单
 * @param {Array} nums 整数数组
 * @param {Number} target 目标值
 */
let twoSum = function(nums, target){
    // let i = 0;
    // let len = nums.length;
    // while(i < len){
    //     let n = target - nums[i];
    //     let k = nums.indexOf(n);
    //     if(k != -1 && k != i){
    //         return [i, k];
    //     }
    //     i++;
    // }
    // throw new Error('数据不正确');
    let map = new Map();
    for(let i = 0, len = nums.length; i < len; i++){
        let num = nums[i];
        let dif = target - num;
        if(map.has(dif)){
            return [map.get(dif), i];
        }
        map.set(num, i);
    };
}

console.log(`给定 nums = [2, 7, 11, 15], target = 9  结果：${twoSum([2, 7, 11, 15], 9)}`);
console.log(`给定 nums = [3, 2, 4], target = 6  结果：${twoSum([3, 2, 4], 6)}`);

/**
 * 两数相加
 * 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。
 * 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
 * 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 * 难度：中等
 * @param {ListNode} l1 第一个数组
 * @param {ListNode} l2 第二个数组
 * @return {ListNode} 加起来后的逆向数组
 */
/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
    this.val = val;
    this.next = null;
}
var addTwoNumbers = function(l1, l2){
    // let len = Math.max.apply(Math, [l1.length, l2.length]);
    // let arr = [];
    // for(let i = 0; i < len; i++){
    //     let n1 = l1[i];
    //     let n2 = l2[i];
    //     let n = n1 + n2;
    //     n = String(n).split('');
    //     arr.push(n.splice(-1)[0]);
    //     l1[i+1] = l1[i+1]+Number(n.join(''));
    // }
    // console.log(arr);
    // return arr;
    let node = new ListNode('head');
    let temp = node, sum, n = 0;
    while(l1 || l2){
        let n1 = l1 ? l1.val : 0;
        let n2 = l2 ? l2.val : 0;
        sum = n1 + n2 + n;
        temp.next = new ListNode(sum % 10);
        temp = temp.next;
        n = parseInt( sum / 10, 10 );
        if(l1){
            l1 = l1.next;
        }
        if(l2){
            l2 = l2.next;
        }
    }
    if(n != 0){
        temp.next = new ListNode(n);
        temp = temp.next;
    }
    return node.next;
};

console.log(`输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)  输出：${addTwoNumbers([2, 4, 3], [5, 6, 4])}`);

/**
 * 模式匹配
 * 你有两个字符串，即pattern和value。 pattern字符串由字母"a"和"b"组成，用于描述字符串中的模式。
 * 例如，字符串"catcatgocatgo"匹配模式"aabab"（其中"cat"是"a"，"go"是"b"），该字符串也匹配像"a"、"ab"和"b"这样的模式。
 * 但需注意"a"和"b"不能同时表示相同的字符串。编写一个方法判断value字符串是否匹配pattern字符串。
 * 难度：中等
 * @param {String} pattern 模式匹配规则
 * @param {String} value 需要匹配的字符串
 * @return {Boolean} 是否匹配
 */
var patternMatching = function(pattern, value){
    // 根据遍历值的starta和startb模拟出string和value做比较
    function getPatternStr(stra, strb){
        let arr = [];
        pattern.split('').forEach(item => {
            if(item === 'a'){
                arr.push(stra);
            } else if(item == 'b'){
                arr.push(strb);
            }
        });
        return arr.join('');
    }
    // 边界值判断
    if(!pattern){
        return value === '';
    }
    if(pattern.length == 1){
        return true;
    }
    if(pattern && !value){
        return false;
    }
    let p_len = pattern.length, v_len = value.length;
    if(p_len == 1){
        return true;
    }
    // 只有 a 或者 b的情况
    if(pattern.indexOf('a') === -1 || pattern.indexOf('b') === -1){
        // 如果不能整除，代表不重复
        if(v_len % p_len !== 0){
            return false;
        }
        // 切割验证
        let str = value.substring(0, parseInt(v_len / p_len, 10));
        if(new Array(p_len).fill(str).join('') === value){
            return true;
        }
        return false;
    }
    // a、b都存在的情况
    // 先行计算，得出 a，b 出现的次数
    let aLen = 0, bLen = 0;
    pattern.split('').forEach(item => {
        if(item === 'a'){
            aLen++;
        } else if(item == 'b'){
            bLen++;
        }
    });
    // 边界值判断
    if(aLen == 1 || bLen == 1){
        return true;
    }
    /**
     * aLen * a_str + bLen * b_str = value.length
     * a_str，b_str 可以为 ''，且 a_str不能与b_str相等
     */
    let la, lb;
    // 遍历 la的长度，根据la的长度遍历 lb的长度，针对 aLen、bLen为0的边界值做处理
    let maxA = Math.floor(v_len / aLen); // 最大a的长度
    for(la = 0; la < maxA; la++){
        // 计算出 当前a字符串下，b的字符
        let allLb = v_len - la * aLen;
        if(allLb % bLen === 0){
            lb = parseInt(allLb / bLen, 10);
            // 继续去计算a代表的值a_str，b代表的值b_str
            let a_str = '', b_str = '';
            if(pattern.charAt(0) === 'a'){
                // 根据位置截取aStr
                a_str = value.substring(0, la);
                let index = pattern.indexOf('b');
                b_str = value.substring(index * la, index * la + lb);
                // 两个字符串相同，舍弃这次结果
                if(a_str === b_str){
                    continue;
                }
                // 计算模拟的值和value值是否相等
                if(getPatternStr(a_str, b_str) === value){
                    return true;
                }
            } else {
                // 根据位置截取出bStr
                b_str = value.substring(0, lb);
                let index = pattern.indexOf('a');
                a_str = value.substring(index * lb, index * lb + la);
                // 两个字符串相同，舍弃这次结果
                if(a_str === b_str){
                    continue;
                }
                // 计算模拟的值和value值是否相等
                console.log(getPatternStr(a_str, b_str), value, a_str, b_str);
                if(getPatternStr(a_str, b_str) === value){
                    return true;
                }
            }
        }
    }
    return false;
};

console.log(`输入： pattern = "abba", value = "dogcatcatdog"   输出：${patternMatching('abba', 'dogcatcatdog')}`);
console.log(`输入： pattern = "abba", value = "dogcatcatfish"   输出：${patternMatching('abba', 'dogcatcatfish')}`);
console.log(`输入： pattern = "aaaa", value = "dogcatcatdog"   输出：${patternMatching('aaaa', 'dogcatcatdog')}`);
console.log(`输入： pattern = "abba", value = "dogdogdogdog"   输出：${patternMatching('abba', 'dogdogdogdog')}`);
console.log(`输入： pattern = "bbbbbbbbbbbbbbabbbbb", value = "ppppppppppppppjsftcleifftfthiehjiheyqkhjfkyfckbtwbelfcgihlrfkrwireflijkjyppppg"   输出：${patternMatching('bbbbbbbbbbbbbbabbbbb', 'ppppppppppppppjsftcleifftfthiehjiheyqkhjfkyfckbtwbelfcgihlrfkrwireflijkjyppppg')}`);

/**
 * 二进制求和
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 * 输入为 非空 字符串且只包含数字 1 和 0。
 * 难度：简单
 * @param {String} a 
 * @param {String} b 
 * @return {String}
 */
var addBinary = function(a, b){
    a = a.split('').reverse();
    b = b.split('').reverse();
    let len = Math.max.apply(Math, [a.length, b.length]);
    let arr = [];
    let n = 0;
    for(let i = 0; i < len; i++){
        let num = Number(a[i] || 0) + Number(b[i] || 0) + n;
        n = 0;
        if(num > 1){
            arr.push(num % 2);
            n = 1;
        } else {
            arr.push(num);
        }
    }
    if(n != 0){
        arr.push(n);
    }
    return arr.reverse().join('');
}

console.log(`输入: a = "11", b = "1"   输出：${addBinary('11', '1')}`);
console.log(`输入: a = "1010", b = "1011"   输出：${addBinary('1010', '1011')}`);

/**
 * 整数反转
 * 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。
 * 难度：简单
 * @param {Number} x 需要反转的数字
 * @return {Number}
 */
var reverse = function(x){
    let n = Math.abs(x);
    let max = Math.pow(2, 31);
    // 暴力法
    // n = Number(String(n).split('').reverse().join(''));
    // if(n > max){
    //     return 0;
    // }
    // return x < 0 ? '-'+n : n;
    let num = 0;
    // 取余法
    while(n > 0){
        num = num * 10 + n % 10;
        n = Math.floor(n / 10);
    }
    return x < 0 ? num <= max ? -num : 0 : num < max ? num : 0;
}
console.log(`输入 1534236469   输出：${reverse('1534236469')}`);
console.log(`输入 123   输出：${reverse('123')}`);


/**
 * 无重复字符的最长子串
 * 给定一个字符串，请你找出其中不含有重复字符的最长子串的长度
 * 难度：中等
 * @param {Sring} s 字符串
 * @return {Number} 不含重复字符的最长子串的长度
 */
var lengthOfLongestSubstring = function(s){
    if(!s){
        return 0;
    }
    let arr = s.split('');
    let sList = [];
    let strs = [];
    // 筛选出无重复项的单字母
    arr.forEach(str => {
        if(!sList.includes(str)){
            sList.push(str)
        }
    });
    // 判断字符，在字符串中出现次数
    function patch(str, re){
        re = eval('/'+re+'/ig');
        let a = str.match(re);
        return a ? a.length : 0;
    }
    for(let i = 0, len = arr.length; i < len; i++){
        let n = 1;
        strs.push(arr[i]);
        while(n < len){
            n++;
            let str = s.substring(i, n);
            let flg = sList.some(item => {
                console.log(patch(str, item), str, item);
                return patch(str, item) > 1;
            });
            if(str && !flg){
                strs.push(str);
            }
        }
    }
    return Math.max.apply(Math, strs.map(str => {
        return str.length;
    }));
}

// console.log(`输入："abcabcbb"    输出：${lengthOfLongestSubstring('abcabcbb')}`);
console.log(`输入："pwwkew"    输出：${lengthOfLongestSubstring('pwwkew')}`);