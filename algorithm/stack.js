document.title = '栈';

((w, d) => {
    /**
     * clear 清空栈
     * push 压入栈
     * pop 出栈
     * peek 预览栈顶元素
     * toString 返回栈列表
    */
	class Stack{
		constructor(arr = []){
			this.dataStore = arr;
			this.top = arr.length;
			Object.defineProperty(this, 'length', {
				get(){
					return this.top;
				},
				set(len){
					this.top = len;
					this.dataStore.length = len;
				}
			});
		}
		// 清空栈
		clear = () => {
			this.top = 0;
			this.dataStore.length = 0;
			return this;
		}
		// 压入栈
		push = (...args) => {
			args.forEach(item => { this.dataStore[this.top++] = item });
		}
		// 出栈
		pop = () => {
			let data = this.dataStore.pop();
			this.top--;
			return data;
		}
		// 预览栈顶元素
		peek = () => {
			return this.dataStore[this.top-1];
		}
		// 返回栈列表
		toString = () => {
			return this.dataStore;
		}
	}

	w.Stack = Stack;
})(window, document);

function stackTest(){
	let stack = new Stack();
	stack.push(1, 2, 3, 4);
	console.log(stack, stack.length);
	console.log(stack.pop(), stack)
	console.log(stack.peek())
	console.log(stack.clear())
}

// 进制转换，将数字转成想要的进制
function mulBase(num, base = 10){
	if(!isNaN(num) || !isNaN(base)){
		console.error('num，base 必须为数字格式')
		return -1;
	}
	let s = new Stack();
	let converted = '';
	do{
		s.push(num % base);
		num = Math.floor(num / base);
	} while (num > 0);

	while (s.length > 0) {
		converted += s.pop();
	}
	s = '';
	return converted;
}

// console.log(mulBase(32, 2));

// stackTest();

// 判断是否是回文  1001、dad 这种的文字
function isPalindrome(word){
	let newWord = String(word).split('');
	let s = new Stack(newWord);

	let rword = '';
	while (s.length > 0) {
		rword += s.pop();
	}
	s = '';
	return word == rword;
}

// console.log(isPalindrome(1001))

// 括号匹配
function parenthesesMath(str){
	let s1 = new Stack(), s2 = new Stack(), s3 = new Stack(), transNum;
	let len = str.length, i = 0;
	while (i < len) {
		switch (str[i]) {
			case '(':
				s1.push(i+1);
				break;
			case '[':
				s2.push(i+1);
				break;
			case '{':
				s3.push(i+1);
				break;
			case ')':
				if(s1.length){
					s1.pop();
				}
				break;
			case ']':
				if(s2.length){
					s2.pop();
				}
				break;
			case '}':
				if(s3.length){
					s3.pop();
				}
				break;
			default:
				break;
		}
		i++;
	}
	let s = '';
	s = s1.toString().reduce((string, item) => {
		return string += `在第${item}位缺少(匹配的)字符`;
	}, s);
	s = s2.toString().reduce((string, item) => {
		return string += `在第${item}位缺少[匹配的]字符`;
	}, s);
	s = s3.toString().reduce((string, item) => {
		return string += `在第${item}位缺少{匹配的}字符`;
	}, s);
	return s
}

// console.log(parenthesesMath('2.3+23/12+((1+2+3.14159*0.24)'));


// 中缀表达式  转换  后缀表达式
function suffix(str){
	let s = new Stack(), len = str.length, i = 0,
		expression = '',
		priority = {
			'+': 1,
			'-': 1,
			'*': 2,
			'/': 2,
			'(': 3,
			')': 3
		};
	while (i < len) {
		let thatLevel = priority[str[i]];
		if(!thatLevel){
			// 数字
			expression += str[i++] ;
		} else {
			// 操作符
			if(!s.length){
				s.push({
					str: str[i++],
					level: thatLevel
				});
			} else {
				let operator = s.peek();
				// console.log(expression, JSON.stringify(s.toString()), operator.str, operator.level, str[i], thatLevel);
				if((operator.level < thatLevel || (thatLevel === 3 && str[i] === '(') || operator.str === '(') && str[i] !== ')'){
					// 当前操作等级 大于 栈顶等级 或者 当前操作符 为  (  或者  栈顶操作符为 (  并且 当前不为  )  入栈 
					s.push({
						str: str[i++],
						level: thatLevel
					});
				} else {
					// 当前操作等级 小于等于 栈顶等级  出栈
					operator = s.pop();
					// 栈顶为 ( 时，停止出栈
					if(operator.str === '('){
						i++;
					}
					expression = strJoin(expression, operator.str);
				}
			}
		}
	}
	function strJoin(str, opea){
		return opea != '(' && opea != ')' ? str + opea : str
	}
	while (s.length) {
		let obj = s.pop()
		expression = strJoin(expression, obj.str);
	}
	console.log(expression);
	s = '';
	return expression;
}

// 计算后缀表达式
function calcExpression(expression){
	let s = new Stack(), len = expression.length, i = 0, num = 0,
		priority = {
			'+': 1,
			'-': 1,
			'*': 2,
			'/': 2,
			'(': 3,
			')': 3
		};;
	while (i < len) {
		if(!priority[expression[i]]){
			// 数字  入栈
			s.push(expression[i]);
		} else {
			// 操作符，弹出2位进行运算
			let one = s.pop(), two = s.pop();
			// 因为后缀表达式是倒序的，所以这里也应该是 倒序计算
			s.push(eval(`${two}${expression[i]}${one}`));
		}
		i++;
	}
	return s.pop();
}

// console.log(calcExpression(suffix('3+(2-5)*6/3')));

// 佩兹糖果盒问题，不改变盒内糖果叠放顺序的情况下，将 黄色糖果拿出
function candy(list = []){
	// 保留下来的糖果
	let checkOut = new Stack();
	// 拿来的糖果
	let checkIn = new Stack();

	list.forEach(item => {
		if(item === 'yellow'){
			checkIn.push(item);
		} else {
			checkOut.push(item);
		}
	});
	return checkOut.toString();

}

function testCandy(){
	let len = 20;
	let list = [];
	let colors = [
		'yellow',
		'white',
		'red'
	];
	while (len > 0) {
		len--;
		list.push(colors[Math.floor(Math.random() * colors.length)]);
	}
	console.log(list)
	console.log(candy(list));
}

testCandy();