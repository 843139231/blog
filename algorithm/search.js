document.title = '二分查找法';

((w, d, undefined) => {
    function binSearch(arr, data){
        let upperBound = arr.length - 1;
        let lowerBound = 0;
        while(lowerBound <= upperBound){
            let mid = Math.floor((lowerBound + upperBound) / 2);
            if(arr[mid] < data){
                lowerBound = mid + 1;
            } else if(arr[mid] > data){
                upperBound = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    /**
     * 计算重复次数
     */
    function count(arr, data){
        let num = 0, len = arr.length;
        let position = binSearch(arr, data);
        if(position > -1){
            ++num;
            for(let i = position -1; i > 0; i--){
                if(arr[i] == data){
                    ++num;
                } else {
                    break;
                }
            }
            for(let i = position + 1; i < len; i++){
                if(arr[i] == data){
                    ++num;
                } else {
                    break;
                }
            }
        }
        return num;
    }
    let data = count([1,2,3,4,5,6,7,9,10,11,12,12,13,14,14,14,14,14,14,15,16,17,190], 14);
    console.log(data);
})(window, document);

function test1(){
}

test1();