document.title = '动态规划算法';

((w, d, undefined) => {
    // 动态规划版本的  斐波那契数列，避免递归低效处理
    function dynFib(n){
        if(n == 1 || n == 2){
            return 1;
        }
        let val = new Array(n).fill(0);
        val[1] = 1;
        val[2] = 2;
        for(let i = 3; i <= n; i++){
            val[i] = val[i-1] + val[i-2];
        }
        return val;
    }

    // 寻找2个字符串中，最长公共子串
    function lcs(word1, word2){
        let max = 0, // 最大长度
            // 真实位置
            index = 0,
            str1 = word1.split(''),
            str2 = word2.split(''),
            str1Len = str1.length,
            str2Len = str2.length,
            // 创建一个二维数组
            arr = new Array(str1Len + 1).fill(0).map(() => new Array(str2Len + 1).fill(0));
        // for(let i = 0; i <= str1Len; i++){
        //     for(let j = 0; j <= str2Len; j++){
        //         arr[i][j] = str1[i - 1] && str2[j - 1] && str1[i - 1] == str2[j - 1] ? arr[i - 1][j - 1] + 1 : 0;
        //         if(max < arr[i][j]){
        //             max = arr[i][j];
        //             index = i;
        //         }
        //     }
        // }
        arr.forEach((item, i) => {
            item.forEach((data, j) => {
                arr[i][j] = str1[i - 1] && str2[j - 1] && str1[i - 1] == str2[j - 1] ? arr[i - 1][j - 1] + 1 : 0;
                if(max < arr[i][j]){
                    max = arr[i][j];
                    index = i;
                }
            });
        });
        if(max == 0){
            return '';
        }
        let str ='';
        for(let i = index - max; i < index; i++){
            str += str1[i];
        }
        return str;
    }
    console.log(lcs('03424helloworldfdfcp043p92jflkf79hhedhey464w6hsry4648721fjbmcvszfq39wnf39804', '1234helloworld2j3293gdgdg6464642093jdklwjflwewt423412897491274uhrf12rfr12'));

    function max(a, b){
        return a > b ? a : b;
    }
    // 背包问题
    function dknapsack(capacity, size , value){
        let k = new Array(capacity).fill(0).map(() => new Array());
        let n = size.length;
        for(let i = 0; i <= n; i++){
            for(let w = 0; w <= capacity; w++){
                if(i == 0 || w == 0){
                    k[i][w] = 0;
                } else if(size[i - 1] <= w){
                    k[i][w] = max(value[i - 1] + k[i-1][w-size[i-1]], k[i -1][w]);
                } else {
                    k[i][w] = k[i - 1][w];
                }
                console.log(`k[i][w]: ${k[i][w]}`);
            }
        }
        return k[n][capacity];
    }
    console.log(dknapsack(16, [3, 4, 7, 8, 9], [4, 5, 10, 11, 13]));
})(window, document);

function test1(){
}

test1();