document.title = '列表';
(function(w, d, undefined){
    function objectToString(obj, str){
        return Object.prototype.toString.call(obj) === `[${str}]`;
    }
    function isObject(obj){
        return objectToString(obj, 'object Object');
    }
    function isArray(arr){
        return Array.isArray(arra);
    }
    function isBooblan(str){
        return objectToString(obj, 'object Boolean');
    }
    /**
     * listSize 列表的元素个数
     * pos 列表的当前位置
     * length 返回列表中元素的个数
     * clear 清空列表
     * toString 返回列表的字符串形式
     * getElement 返回当前位置的元素
     * insert 在现有元素后插入新元素
     * append 在列表的末尾添加新元素
     * remove 从列表中删除元素
     * front 将列表的当前位置移动到第一个元素
     * end 将列表的当前位置移动到最后一个元素
     * next 将当前位置后移一位
     * prev 将当前位置前移一位
     * hasNext 判断后一位
     * hasPrev 判断前一位
     * currPos 返回列表的当前位置
     * moveTo 将当前位置移动到指定位置
    */
    class List{
        constructor(arr = []){
            this.listSize = arr.length;// 列表的元素个数
            this.pos = 0;// 列表的当前位置
            this.dataStore = arr; // 列表数据缓存
    
            // 返回列表中元素的个数
            Object.defineProperty(this, 'length', {
                get(){
                    return this.listSize
                },
                set(len){
                    this.listSize = len;
                    this.dataStore.length = len;
                }
            });
        }

        // 清空列表
        clear = () => {
            this.dataStore.length = 0;
            this.listSize = this.pos = 0;
            return this;
        }
        // 返回列表的字符串形式
        toString = () => {
            return this.dataStore;
        }
        // 返回当前位置的元素
        getElement = () => {
            return this.dataStore[this.pos];
        }
        // 在现有元素后插入新元素
        insert = (element, after, type = 'element') => {
            let index = -1;
            if(type === 'index'){
                index = after;
            } else {
                index = this.find(after);
            }
            if(index > -1){
                this.dataStore.splice(index, 0, element);
                ++this.listSize;
                return true;
            }
            return false;
        }
        // 在列表的末尾添加新元素
        append = (element) => {
            this.dataStore[this.listSize++] = element;
            return this;
        }
        // 查找位置
        find = (element, key = '') => {
            let index = -1;
            if(typeof element !== 'Object'){
                if(key){
                    this.dataStore.some((item, i) => {
                        if(item[key] === element){
                            index = i;
                            return
                        }
                    });
                } else {
                    // 包含字符串类型、Boolean类型 以及 数字类型
                    index = this.dataStore.indexOf(element);
                }
            } else {
                // 复杂类型
                element = JSON.stringify(element);
                if(key){
                    this.dataStore.some((item, i) => {
                        if(JSON.stringify(item[key]) === element){
                            index = i;
                            return
                        }
                    });
                } else {
                    this.dataStore.some((item, i) => {
                        if(JSON.stringify(item) === element){
                            index = i;
                            return
                        }
                    });
                }
            }
            return index;
        }
        // 从列表中删除元素  元素删除
        remove = (element) => {
            element = this.find(element);
            if(element > -1){
                this.dataStore.splice(element, 1);
                --this.listSize;
                return true
            }
            return false
        }
        // 从列表中删除元素 下标删除
        removeIndex = (index) => {
            if(this.listSize){
                this.dataStore.splice(index, 1);
                --this.listSize;
                return true
            }
            return false;
        }
        // 将列表的当前位置移动到第一个元素
        front = () => {
            this.pos = 0;
            return this;
        }
        // 将列表的当前位置移动到最后一个元素
        end = () => {
            this.pos = this.length - 1;
            return this;
        }
        // 将当前位置后移一位
        next = () => {
            if(this.pos < this.length){
                this.pos++;
            }
            return this;
        }
        // 将当前位置前移一位
        prev = () => {
            if(this.pos > 0){
                this.pos--;
            }
            return this;
        }
        // 判断后一位
        hasNext = () => {
            return this.pos < this.length -1;
        }
        // 判断前一位
        hasPrev = () => {
            return this.pos > 0;
        }
        // 返回列表的当前位置
        currPos = () => {
            return this.pos;
        }
        // 将当前位置移动到指定位置
        moveTo = (position) => {
            this.pos = position;
            return this;
        }
        // 链表反转
        reverse = () => {
            this.pos = 0;
            this.dataStore.reverse();
            return this;
        }
        // 链表中段截取 非函数式
        splice = (start, end) => {
            let arr = this.dataStore.splice(start, end);
            this.pos = 0;
            this.listSize = arr.length;
            this.dataStore = arr;
            return this;
        }
        // 链表中段截取 函数式
        slice = (start, end) => {
            let arr = this.dataStore.splice(start, end);
            return new List(arr);
        }
        // 判断给定的值是否存在于列表中
        contains = (...args) => {
            let index = this.find(...args);
            return index > -1;
        }
    }

    w.List = List;
})(window, document);

// 链表使用测试

function nameListTest(){
    let names = new List();
    names.append('Cynthia')
    names.append('Raymond')
    names.append('Barbara')
    console.log(names.toString());


    console.log('remove children')
    names.remove('Raymond');
    console.log(names.toString());

    names.insert('Raymond', 'Barbara');
    console.log(names.toString());

    names.next();
    console.log(names.getElement());

    names.prev();
    console.log(names.getElement());

    names.end();
    console.log(names.getElement());
    console.log(names.hasNext());   

    names.front();
    console.log(names.getElement());
    console.log(names.hasPrev());

    for(names.end().currPos(); names.hasPrev(); names.prev()){
        console.log(names.getElement());
    }
}

// 租赁影碟测试
function leaseMovies(){
    function read(){
        return `The Shawshank Redemption（《肖申克的救赎》）
            The Godfather（《教父》）
            The Godfather：PartII（《教父 2》）
            Pulp Fiction（《低俗小说》）
            The Good，the Bad and the Ugly（《黄金三镖客》）
            12Angry Men（《十二怒汉》）
            Schindler's List（《辛德勒名单》）
            The Dark Knight（《黑暗骑士》）
            The Lord of the Rings：The Return of the King（《指环王：王者归来》）
            Fight Club（《搏击俱乐部》）
            Star Wars：Episode V - The Empire Strikes Back（《星球大战5：帝国反击战》）
            One Flew Over the Cuckoo's Nest（《飞越疯人院》）
            The Lord of the Rings：The Fellowship of the Ring（《指环王：护戒使者》）
            Inception（《盗梦空间》）
            Goodfellas（《好家伙》）
            Star Wars（《星球大战》）
            Seven Samurai（《七武士》）
            The Matrix（《黑客帝国》）
            Forrester Gump（《阿甘正传》）
            City of God（《上帝之城》）`
    }
    function readFile(file){
        let arr = read(file).split('\n');
        arr = arr.map(item => item.trim());
        return arr;
    }

    let moveList = new List(readFile('mobile.text'));
    
    // 显示影碟清单
    function displayList(list){
        for(list.front().currPos(); list.currPos() < list.length; list.next()){
            let item = list.getElement();
            if(item instanceof Customer){
                console.log(`${item['name']}, ${item.movie}`);
            } else {
                console.log(item);
            }
        }
    }

    // 已租赁列表
    let customers = new List();
    function Customer(name, movie){
        this.name = name;
        this.movie = movie;
    }

    // 出租
    function checkOut({name, movie}){
        if(moveList.contains(movie)){
            let c = new Customer(name, movie);
            customers.append(c);
            moveList.remove(movie);
            console.log(`\nCustomer Rentals: \n`);
            displayList(customers);
        } else {
            console.log(`${movie}  is not available.`);
        }
    }

    // 归还
    function checkIn({name, movie}){
        if(customers.contains(movie, 'movie')){
            customers.remove({
                name,
                movie
            });
            moveList.append(movie);
            console.log(`\nAvailable movies: \n`);
            displayList(moveList);
        } else {
            console.log(`${movie}  is not lease.`);
        }
    }

    console.log(`Available movies: \n`);
    displayList(moveList);
    checkOut({
        name: 'Jane Doe',
        movie: 'The Godfather（《教父》）'
    });
    checkOut({
        name: 'Jane Doe',
        movie: 'Pulp Fiction（《低俗小说》）'
    });

    checkIn({
        name: 'Jane Doe',
        movie: 'The Godfather（《教父》）'
    });
}

// test
function test(){
    function copy(list){
        return JSON.parse(JSON.stringify(list));
    }

    function insert(element, list, type = 1){
        if(typeof element === 'object'){
            throw 'element is not Object';
        }
        let arr = copy(list.toString());
        arr.push(element);
        if(isNaN(element)){
            arr.sort();
            if(arr[type ? arr.length - 1 : 0] === element){
                list.append(element);
            }
        } else {
            arr.sort((a, b) => a - b);
            if(arr[type ? arr.length - 1 : 0] === element){
                list.append(element);
            }
        }
    }

    function Person(name, sex){
        this.name = name;
        this.sex = sex;
    }

    let personList = new List();
    personList.append(new Person('a1', 1));
    personList.append(new Person('a2', 0));
    personList.append(new Person('a3', 0));
    personList.append(new Person('a4', 1));
    personList.append(new Person('a5', 1));
    personList.append(new Person('a6', 1));
    personList.append(new Person('a7', 0));
    personList.append(new Person('a8', 1));
    personList.append(new Person('a9', 1));
    personList.append(new Person('a0', 0));

    function showSex(list, sex){
        let arr = list.toString().filter(item => item.sex === sex).map(item => `name: ${item.name},   sex: ${item.sex}`).join('\n');
        console.log(arr);
    }
    showSex(personList, 1);
}

leaseMovies();