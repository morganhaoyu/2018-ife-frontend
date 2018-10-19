

function dataStorage(inputData) {
	if(typeof(Storage) !== 'undefined') {				    //check浏览器可用性
		if(!localStorage.getItem('newData') 
			|| JSON.parse(localStorage.getItem('newData'))===0) {
			let dataArr = [];
			dataArr.push(inputData);							//将用户的输入放到数组中
			localStorage.setItem('newData',JSON.stringify(dataArr)); //存储数据到本地
		} else {
			let dataArr2 = JSON.parse(localStorage.getItem('newData'));
			dataArr2.push(inputData);
			for(let i = 0; i < dataArr2.length; i++) {
				if(inputData['product']==dataArr2[i]['product'] 
					&& inputData['region']==dataArr2[i]['region']) {
					dataArr2[i]['sale']=inputData['sale'];
					localStorage.setItem('newData',JSON.stringify(dataArr2));
				}
			}
		}
		
	} else {
		alert('抱歉，您的浏览器不支持本地存储');
	}
}
	
	