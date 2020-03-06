document.title = '字典';

(function(w, d, undefined){
	class Dictionary{
		constructor(obj = {}){
			this.datastore = obj;
    
            // 返回列表中元素的个数
            Object.defineProperty(this, 'length', {
                get(){
                    return Object.keys(this.datastore);
                },
                set(){
                    return this;
                }
            });
		}
		// 追加键值对
		add = (key, value) => {
			this.datastore[key] = value;
			return this;
		}
		// 找到key对应的值
		find = key => this.datastore[key]
		// 删除 键值对
		remove = key => {
			delete this.datastore[key];
			return this;
		}
		// 显示所有
		showAll = () => {
			let obj = {};
			// 排序
			Object.keys(this.datastore).sort((a, b) => a - b).forEach(item => {
				obj[item] = this.datastore[item];
			});
			return obj;
		}
		// 清空缓存数据
		clear = () => {
			this.datastore = {};
		}
	}
})(window, document);