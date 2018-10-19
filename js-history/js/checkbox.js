	//获取CheckBox容器
	var regWrapper = document.getElementById('region-radio-wrapper');
	var pdtWrapper = document.getElementById('product-radio-wrapper');
	var radioWrapper = document.getElementById('radio-wrapper');

	//设置CheckBox的value
	var regObj = [{
		value:'华东'
	},{
		value:'华南'
	},{
		value:'华北'
	}] 

	var ptdObj = [{
		value:'手机'
	},{
		value:'笔记本'
	},{
		value:'智能音箱'
	}]

   
	checkboxCreate(regWrapper,regObj);

	checkboxCreate(pdtWrapper,ptdObj);

	function checkboxCreate(wrapper,obj) {
		//全选选项
		var checkAll = document.createElement('input');
		checkAll.type = 'checkbox';
		checkAll.value = 'checkAll';
		checkAll.id = wrapper.id + '-all';
		checkAll.setAttribute('box-type','all');  //自定义属性
		wrapper.appendChild(checkAll);
		var lableAll = document.createElement('lable');
		lableAll.setAttribute('for', wrapper.id + '-all');
		lableAll.appendChild(document.createTextNode('全选'));
		wrapper.appendChild(lableAll);
		checkAll.checked = true;        //初始状态

		//CheckBox选项
		var checkboxs = [];
		for(let i = 0; i < obj.length; i++) {
			var checkChild = document.createElement('input');
			checkChild.type = 'checkbox';
			checkChild.value = obj[i].value;
			checkChild.id = obj[i].value;
			checkChild.setAttribute('box-type','child')
			wrapper.appendChild(checkChild);
			checkboxs.push(checkChild);
			var lableChild = document.createElement('lable');
			lableChild.setAttribute('for', obj[i].value);
			lableChild.appendChild(document.createTextNode(obj[i].value));
			wrapper.appendChild(lableChild);
			checkboxs[i].checked = true;     //初始状态
		} 
	
		//事件委托
		wrapper.onclick = function(e) {
			var target = e.target;
       	 	var num = 0; //选中的个数
            var attribute = target.getAttribute("box-type"); 
            if (attribute == "all") {
            	if(target.checked === true){
            		for (let j = 0; j < checkboxs.length; j++) {
                    	checkboxs[j].checked = true; 
                	}
            	} else {
            		for (let j = 0; j < checkboxs.length; j++) {
            			if(j == 0) {
            				checkboxs[0].checked = true;
            			} else {
            				checkboxs[j].checked = false;
            			}
            		}
            	}
                
            }
            for (let j = 0; j < checkboxs.length; j++) {
                if (checkboxs[j].checked == true) {
                    num++;
                }
            }
            if (attribute == "child") {
                if (num == 3) {
                    checkAll.checked = true;
                }
                if (num < 3) {
                    checkAll.checked = false;
                }
                if (num == 0) {
                	target.checked = true; 
                    num = 1;
                }
            }
        }
    }


   
    