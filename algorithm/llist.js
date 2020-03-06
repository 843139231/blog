document.title = '链表';

(function(w, d, undefined){
	class Node{
		constructor(element){
			this.element = element;
			this.next = null;
			this.previous = null;
		}
	}
	/**
	 * length 列表的元素个数
	 * current 列表的当前位置
	 * insert 在现有元素后插入新元素
	 * find 查找位置
	 * remove 从列表中删除元素 元素删除
	 * findLast 找到最后一个元素
	 * dispReverse 链表的逆向显示
	 * display 链表正向显示
	 * advance 在链表向前移动n个节点
	 * back 在链表向后移动n个节点
	 * show 只显示当前节点
	*/
	class Llist{
		constructor(){
			this.head = new Node('head');
			this.head.next = this.head;
			this.current = 0;
			this.length = 0;
		}
		// 找到元素
		find = item => {
			let current = this.head;
			while (current.element != item && current.next.element !== 'head') {
				current = current.next;
			}
			return current
		}
		// 插入元素
		insert = (newElement, item) => {
			let newNode = new Node(newElement);
			let current = this.find(item);
			newNode.next = current.next;
			newNode.previous = current;
			current.next = newNode;
			this.length++;
			return this
		}
		// 删除元素
		remove = item => {
			let current = this.find(item);
			console.log(current);
			if(current.next !== null && current.next.element !== 'head'){
				current.previous.next = current.next;
				current.next.previous = current.previous;
				current.next = null;
				current.previous = null;
				this.length--;
			}
			return this
		}
		// 找到最后一个元素
		findLast = () => {
			let current = this.head;
			while (current.next !== null && current.next.element !== 'head') {
				current = current.next;
				this.current++;
			}
			return current;
		}
		// 链表的逆向显示
		dispReverse = () => {
			let list = [];
			let current = this.head;
			current = this.findLast();
			this.current = 0;
			while(current.previous !== null){
				list.push(current.element);
				current = current.previous;
			}
			return list;
		}
		// 链表正向显示
		display = () => {
			let list = [];
			let current = this.head;
			this.current = 0;
			while (current.next !== null && current.next.element !== 'head') {
				list.push(current.element);
				current = current.next;
				this.current++;
			}
			return list;
		}
		// 在链表向前移动n个节点
		advance = n => {
			this.current -= n;
			let current = this.head;
			let i = 0;
			while (current.next !== null && i < this.current) {
				current = current.next;
				i++
			}
			return this;
		}
		// 在链表向后移动n个节点
		back = n => {
			this.current += n;
			let current = this.head;
			let i = 0;
			while (current.next !== null && i < this.current) {
				current = current.next;
				i++
			}
			return this;
		}
		// 只显示当前节点
		show = () => {
			let current = this.head;
			let i = 0;
			while (current.next !== null && i < this.current) {
				current = current.next;
				i++
			}
			return current;
		}
	}
	w.Llist = Llist;
})(window, document);

function test(){
	let nums = new Llist();
	let num = nums.head.element;
	console.log(num);
	new Array(10).fill(1).forEach((item, index) => {
		// let n = Math.floor(Math.random() * (index + 10));
		let n = index + 1;
		nums.insert(n, num);
		num = nums.show().element;
	});
	console.log(nums);

	console.log(nums.advance(2).show());
	console.log(nums.back(4).show())
}


function killTest(){
	// 将n个人围成一圈，并且第m个人会被杀掉，计算一圈中哪两个人最后存活
	function kill(n, m){
		let nums = new Llist();
		let num = nums.head.element; 
		console.log(n, num);
		new Array(n).fill(1).forEach((item, index) => {
			nums.insert(index+1, num);
			num = nums.show().element;
		});
		console.log(nums.length, m);
		let i = 0;
		let len = nums.length;
		nums.find(nums.head.element);
		console.log(nums.current);
		while (i <= m) {
			if(i === m){
				len--;
				console.log(nums.length, nums.show().element, i, m, nums.display());
				nums.remove(nums.show().element);
			}
			nums.back(1);
			console.log(nums.current);
			i++;
		}
		console.log(nums.display());
	}

	kill(40, 3);
}

killTest();