
var itemChecked = function(wrapper) {
	var items = wrapper.querySelectorAll("[type='checkbox']");
	var checkedItems = [];
	for(let i = 1; i < items.length; i++) { 
		    if(items[i].checked) {
				checkedItems.push(items[i]);  //选中的单选放入数组
		    }
		}
	return checkedItems;
}
var getData = function() {
	var data = [];
	//获取选中region和product
	var regChecked = itemChecked(regWrapper);
	var ptdChecked = itemChecked(pdtWrapper);
	
	for(let i in sourceData) {
		for(let j in regChecked) {
			for(let k in ptdChecked) {
				if(sourceData[i].region == regChecked[j].value && sourceData[i].product == ptdChecked[k].value) {
					data.push(sourceData[i])
				}
			}
		}
	}
	if(localStorage.getItem('newData')) {
		var json = localStorage.getItem('newData');       //获取数据
		var newData = JSON.parse(json);				   //解析json数据
		for(let i = 0; i < data.length; i++) {
		 	for(let j = 0; j < newData.length; j++){
		  		if(data[i]['region'] == newData[j]['region'] 
		  			&& data[i]['product'] == newData[j]['product']) {
			  			data[i] = newData[j];             //用本地存储的数据更新数据
		  		}
		  	}
		 }
	}
	return data;
}

