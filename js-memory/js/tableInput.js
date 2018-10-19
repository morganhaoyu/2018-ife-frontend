var tableInput = function (td,dataVal) {
	//创建一系列按钮和输入框
	var inputDom = document.createElement('input'),
		inputBtn = document.createElement('input'),
		inputConf = document.createElement('input'),
		inputCancel = document.createElement('input');
		inputVal = document.createTextNode(dataVal);

		inputDom.type = 'text';
		inputDom.setAttribute('value', dataVal);
		inputDom.setAttribute('class','inputDom');

		inputBtn.type = 'button';
		inputBtn.value = '编辑';
		inputBtn.setAttribute('class','inputBtn');

		inputConf.type = 'button';
		inputConf.value = '确定';
		inputConf.setAttribute('class','inputConf');

		inputCancel.type = 'button';
		inputCancel.value = '取消';
		inputCancel.setAttribute('class','inputCancel');
		
		td.appendChild(inputDom);
		td.appendChild(inputBtn);
		td.appendChild(inputConf);
		td.appendChild(inputCancel);
		td.appendChild(inputVal);

	//点击编辑按钮，显示确定和取消
	inputBtn.onclick = function(e) {
		var btns = e.target.parentNode.childNodes;
		btns[0].setAttribute('style','display:block');   //输入框
		btns[0].focus();
		btns[0].select();
		btns[1].setAttribute('style','display:none');    //编辑
		btns[2].setAttribute('style','display:block'); 	 //确认
		btns[3].setAttribute('style','display:block'); 	 //取消
	}

	//点击确定按钮，存储数据到本地
	inputConf.onclick = function(e) {
		var btns = e.target.parentNode.childNodes;
		var val = btns[0].value;
		if(isNaN(val)) {
			alert('请输入数字');
			btns[0].select();
		} else {
		 	btns[0].setAttribute('style','display:none');
		 	btns[1].setAttribute('style','display:block');
		 	btns[2].setAttribute('style','display:none'); 
		 	btns[3].setAttribute('style','display:none'); 
			setData(e);
			var curData = getData();   //更新数据
			tableCreate(curData);      //更新表格
	 }
	}
		 	
	//点击取消按钮，恢复初始状态
	inputCancel.onclick = function(e) {
		var btns = e.target.parentNode.childNodes;
		var val = e.target.parentNode.textContent;
		btns[0].value = val;
		btns[0].setAttribute('style','display:none');
		btns[1].setAttribute('style','display:block');
		btns[2].setAttribute('style','display:none'); 
		btns[3].setAttribute('style','display:none'); 
	}
	//监听键盘事件
	inputDom.onkeydown = function(e) {
		if(e.keyCode == 27) {
			var btns = e.target.parentNode.childNodes;
			btns[0].setAttribute('style','display:none');
			btns[1].setAttribute('style','display:block');
			btns[2].setAttribute('style','display:none'); 
			btns[3].setAttribute('style','display:none'); 
		}
		if(e.keyCode == 13) {
			var btns = e.target.parentNode.childNodes;
			var val = btns[0].value;
			if(isNaN(val)) {
				alert('请输入数字');
				btns[0].select();
			} else {
				btns[0].setAttribute('style','display:none');
			 	btns[1].setAttribute('style','display:none');
			 	btns[2].setAttribute('style','display:none'); 
			 	btns[3].setAttribute('style','display:none'); 
				setData(e);
				var curData = getData();   //更新数据
				tableCreate(curData);      //更新表格
			}
		}
	}
	//输入框失去焦点
	inputDom.onblur = function(e) {
		var btns = e.target.parentNode.childNodes;
		setTimeout(function() {
			if(btns[0].style.display == 'block') {
			btns[0].setAttribute('style','display:none');
			}
			if(btns[1].style.display == 'none') {
				btns[1].setAttribute('style','display:block');
			}
			if(btns[2].style.display == 'block') {
				btns[2].setAttribute('style','display:none');
			}
			if(btns[3].style.display == 'block') {
				btns[3].setAttribute('style','display:none');
			}
		},300)  //设置延迟，确保按钮能被按到
	}
}
	

