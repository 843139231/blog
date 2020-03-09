document.title = '集合';

((w, d, undefined) => {
    // 定义
    /**
     * 不包含任何成员的集合称为空集，全集则是包含一切可能成员的集合
     * 如何两个集合的成员完全相同，则称两个集合相等
     * 如果一个集合中所有的成员都属于另一个集合，则前一集合称为后一集合的子集
     * 并集
     *  讲两个集合中的成员进行合并，得到一个新集合
     * 交集
     *  两个集合中共同存在的成员组成一个新的集合
     * 补集
     *  属于一个集合而不属于另一个集合的成员组成的集合
    */
    /**
     * add 添加元素
     * remove 删除元素
     * union 并集
     * intersect 交集
     * subset 子集
     * difference 补集
     * show 显示集合中所有成员
     */
	class Collection{
		constructor(arr = []){
            this.dataStore = arr;
        }
        // 判断元素是否存在于数组中
        contains = data => {
            if(this.dataStore.indexOf(data) > -1){
                return true;
            }
            return false;
        }
        // 获取长度
        size = () => {
            return this.dataStore.length;
        }
        add = data => {
            if(this.dataStore.indexOf(data) < 0){
                this.dataStore.push(data);
                return true;
            }
            return false;
        }
        remove = data => {
            let i = this.dataStore.indexOf(data);
            if(i > -1){
                this.dataStore.splice(i, 1);
                return true;
            }
            return false;
        }
        show = () => {
            return this.dataStore;
        }
        // 并集
        union = set => {
            let tempSet = new Set();
            // 循环当前，添加至新集合
            this.dataStore.forEach(item => tempSet.add(item));
            // 循环需要交集的集合，判断是否存在，不存在添加至新集合
            set.dataStore.forEach(item => {
                if(!tempSet.contains(item)){
                    tempSet.add(item);
                }
            });
            return tempSet;
        }
        // 交集
        intersect = set => {
            let tempSet = new Set();
            this.dataStore.forEach(item => {
                if(set.contains(item)){
                    tempSet.add(item);
                }
            });
            return tempSet;
        }
        // 子集
        subset = set => {
            if(this.size() > set.size()){
                return false;
            }
            let flg = this.dataStore.every(item => set.contains(item));
            return flg
        }
        // 补集
        difference = set => {
            let tempSet = new Set();
            this.dataStore.forEach(item => {
                if(!set.contains(item)){
                    tempSet.add(item);
                }
            });
            return tempSet;
        }
	}

	w.Collection = Collection;
})(window, document);
