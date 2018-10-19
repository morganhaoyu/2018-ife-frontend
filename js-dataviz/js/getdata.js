
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
		return data;
	}
	
