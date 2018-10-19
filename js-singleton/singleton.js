function Dish(name,price) {
	this.name = name;
	this.price = price;
}
//菜单
var menu = [
	new Dish('Salad', 19),
	new Dish('Pasta',29),
	new Dish('Sandwich',29),
	new Dish('Taco',35),
	new Dish('Burger',35),
	new Dish('Pizza',69)
] 

//waiter--singleton
function Waiter(name,salary) {
	if(typeof Waiter.instance === 'object') {
		return Waiter.instance;
	}
	this.name = name;
	this.salary = salary;
	this.orderFood = function(dish) {
		console.log('Waiter: "This customer ordered ' + dish + '."');
		return dish;
	}
	this.serveFood = function(dish) {
		console.log('Waiter: "This is your ' + dish + '."');
		return dish;
	}
	Waiter.instance = this;  //实现单例
}
var waiter = new Waiter('Dan',5000);

//cook--singleton
function Cook(name,salary){
	if(typeof Cook.instance === 'object') {
		return Cook.instance;
	}
	this.name = name;
	this.salary = salary;
	this.cookFood = function(curFood) {
		console.log('Cook: "' + curFood + ' is cooked!"')
		return curFood;
	}
	Cook.instance = this;  //实现单例
}
var cook = new Cook('Jack',6000);

//customer--constructor
function Customer(name) {
	this.name = name;
	this.order = function(menu) {
		if(menu) {
			var x = Math.floor(Math.random() * menu.length);  //随机选择菜品
			console.log('Customer ' + this.name + ': "I want ' 
						+ menu[x].name + '."');
			waiter.orderFood(menu[x].name);
			cook.cookFood(menu[x].name);
			waiter.serveFood(menu[x].name);
		}
		
	}
	this.eat = function(x) {
		console.log('Customer ' + this.name + ' : "I finished eating!"');
		console.log('Waiter: "Next one please!"')
	}
}
//顾客数组
var customers = [
	new Customer('Tony'),
	new Customer('Shawn'),
	new Customer('Lily'),
	new Customer('Ryan'),
	new Customer('Molly'),
	new Customer('Kelly'),
]
//实现队列功能
function Queue() {
	var arr = [];
	this.queueIn = function(data) {
		for(let i in data) {
			arr.push(data[i]);
		}
		return arr;
	}
	this.queueOut = function() {
		return arr.shift();
	}

}
//为每个顾客执行任务
var cstQueue = new Queue();
cstQueue.queueIn(customers);   //把顾客加入队列
for(let j = 0; j < 6; j++) {
	var curCst = cstQueue.queueOut();   //让位于对头的顾客进行点餐
	curCst.order(menu);
	curCst.eat();
	console.log('--------------');
}