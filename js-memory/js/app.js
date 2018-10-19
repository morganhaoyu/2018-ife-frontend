

	document.body.onload = function() {
		var data1 = getData();
		tableCreate(data1);
		var data2 =data1.map(function(x) {
       		return x['sale'];
		})
		lineChart(data2);
		barChart(data2);
	}
	
	//checkbox事件监听
	radioWrapper.addEventListener('change',function() {
		var data3 = getData();
		tableCreate(data3);
		document.getElementById('chart-wrapper').innerHTML = '';
		var data4 = data3.map(function(x) {
			return x['sale'];
		})
		lineChart(data4);
		barChart(data4)
	})

	//table事件监听，获取data，改变背景色，渲染图表
	document.getElementById('table-wrapper').addEventListener('mouseover',function(e) {
		var target = e.target;
		var tr = target.parentNode;
		if(tr.tagName == 'TR'){            //排除表头被选中
			var count = tr.childNodes.length;  //count有两种情况，13 / 14，需要分情况讨论
			var dataWrap = [];
			var curData = [];
			if(count == 13) {
				for(let i = 1; i < count; i++) {
				curData.push(tr.childNodes[i].innerText);
				tr.style.background = 'lightblue';   
				}
			}
			if(count == 14) {
				for(let i = 2; i < count; i++) {
				curData.push(tr.childNodes[i].innerText);
				tr.style.background = 'lightblue';  
				tr.firstChild.style.background = 'white';
				}
			}
		    dataWrap.push(curData);
			for(let i in curData) {
				if(!isNaN(curData[i])){
					document.getElementById('chart-wrapper').innerHTML = '';
		    		lineChart(dataWrap);
		    		barChart(dataWrap);
				} 
			}
	    }
	})

	//鼠标移开，颜色还原
	document.getElementById('table-wrapper').addEventListener('mouseout',function(e){
			e.target.parentNode.style.background = '';  
	})