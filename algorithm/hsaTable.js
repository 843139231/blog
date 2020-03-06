document.title = '散列';

(function(w, d, undefined){
    class HasTable{
        constructor(){
            this.table = new Array(137);
        }
        simpleHash(data){
            let total = 0;
            let i = 0, len = data.length;
            for(; i < len; i++){
                total += data.charCodeAt(i);
            }
            return total % len
        }
        betterHash(string){
            const H = 37;
            let total = 0, i = 0, len = string.length;
            for(; i < len; i++){
                total += H * total + string.charCodeAt(i);
            }
            total = total % this.table.length;
            if(total < 0){
                total += this.table.length - 1;
            }
            return parseInt(total, 10);
        }
        showDistro(){
            let list = [];
            this.table.forEach((item, index) => {
                if(item[0] != undefined){
                    console.log(`${index}: ${item}`);
                    list.push(item);
                }
            });
            return list
        }
        put(data){
            let pos = this.betterHash(data), index = 0;
            if(this.table[pos][index] == undefined){
                this.table[pos][index] = data;
            } else {
                ++index;
                while(this.table[pos][index] != undefined){
                    ++index;
                }
                this.table[pos][index+1] = data;
            }
        }
        get(key){
            return this.table[this.betterHash(key)];
        }
        buildChains(){
            this.table.forEach((item, index) => {
                this.table[index] = new Array;
            });
        }
    }
    w.HasTable = HasTable;
})(window, document);

function test(){
    let someNames = ['David', 'Jennifer', 'Donnie', 'Raymond', 'Cynthia', 'Mike', 'Clayton', 'Danny', 'Jonathan'];

    let hTable = new HasTable();
    someNames.forEach(item => {
        hTable.put(item);
    });
    hTable.showDistro();
}

function test1(){
    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function genStuData(arr){
        arr.forEach((item, index) => {
            let num = '';
            for(let i = 0; i <= 9; i++){
                num += Math.floor(Math.random() * 10);
            }
            num += getRandomInt(50, 100);
            arr[i] = num;
        });
    }
}

test1();