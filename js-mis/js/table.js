	
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
	

	var tableCreate =  function() {
		var data = getData();
		var tblWrapper = document.getElementById('table-wrapper'),
			tbl = document.createElement('table'),
			th = document.createElement('thead'),
		    titles = ["商品","地区","1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"];

		//清除上一个表格    
		tblWrapper.innerHTML = '';

		//添加表头
		var setHeader = function() {
			for(let i = 0; i < titles.length; i++) {
				var thd = document.createElement('td');
				thd.appendChild(document.createTextNode(titles[i]));
				th.appendChild(thd);
			}
			tbl.appendChild(th);
		}
		
		var regNum = itemChecked(regWrapper).length;
		var ptdNum = itemChecked(pdtWrapper).length;

		//一个地区，一个商品
		if(regNum == 1 && ptdNum == 1) {
			setHeader();
			for(let i in data) {
				var tr = tbl.insertRow();
				for(let j in data[i]) {
					if(j == 'region' || j == 'product') {
						var td = tr.insertCell();
						td.appendChild(document.createTextNode(data[i][j]));
					} else {
						for(let k in data[i][j]) {
							var td = tr.insertCell();
							td.appendChild(document.createTextNode(data[i][j][k]));
						}
					}
				}
			}
		}


		//多个地区，一个商品：商品第一列，地区第二列，并且把商品这一列的单元格做一个合并，只保留一个商品名称
		if(regNum > 1 && ptdNum == 1) {
			setHeader();
			for(let i in data) {
				var tr = tbl.insertRow();
				for(let j in data[i]) {
					if(j == 'product' && i==0) {
						var td = tr.insertCell();
						td.setAttribute('rowSpan',regNum);
						td.appendChild(document.createTextNode(data[i][j]));
					}
					if(j == 'region') {
						var td = tr.insertCell();
						td.appendChild(document.createTextNode(data[i][j]));
					}
					if(j == 'sale') {
						for(let k in data[i][j]) {
							var td = tr.insertCell();
							td.appendChild(document.createTextNode(data[i][j][k]));
						}
					}
				}
			}
		}

	 	//一个地区，多个商品：地区第一列，商品第二列，并且把地区这一列的单元格做一个合并，只保留一个地区名称
		if(ptdNum > 1 && regNum == 1) {
			titles[0] = '地区';
			titles[1] = '商品';
			setHeader();

			for(let i in data) {
				var tr = tbl.insertRow();
				for(let j in data[i]) {
					if(j == 'product' && i == 0) {
						var tdPdt = tr.insertCell();
						tdPdt.setAttribute('rowSpan',ptdNum);
					}
					if(j =='product') {
						ptdDat = document.createTextNode(data[i][j]);
					}
					if(j == 'region') {
						var tdReg = tr.insertCell();
						regData = data[i][j];
					}
					if(j == 'sale') {
						for(let k in data[i][j]) {
							var td = tr.insertCell();
							td.appendChild(document.createTextNode(data[i][j][k]));
						}
					}
				}
				tdPdt.innerHTML = regData;
				tdReg.appendChild(ptdDat);
			}
		}

		//多个地区，多个商品：商品第一列，地区第二列，对第一列商品列做合并
		if(regNum > 1 && ptdNum > 1) {
			setHeader();
			for(let i in data) {
				var tr = tbl.insertRow();
				for(let j in data[i]) {
					if(j == 'product' && !(i % regNum)) {
						var td = tr.insertCell();
						td.setAttribute('rowSpan',regNum);
						td.appendChild(document.createTextNode(data[i][j]));
					}
					if(j == 'region') {
						var td = tr.insertCell();
						td.appendChild(document.createTextNode(data[i][j]));
					}
					if(j == 'sale') {
						for(let k in data[i][j]) {
							var td = tr.insertCell();
							td.appendChild(document.createTextNode(data[i][j][k]));
						}
					}
				}
			}
		}

		tblWrapper.appendChild(tbl);
	}
