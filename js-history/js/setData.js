var setData = function(e) {
 	var inputData = {};
 	var newSale = [];
 	var tr = e.target.parentNode.parentNode;
 	var count = tr.childNodes.length; 
 	var inputEl = tr.getElementsByClassName('inputDom');
 	var tbl = document.getElementsByTagName('table')[0];
 	var thead = document.getElementsByTagName('thead')[0];

 	if(thead.childNodes[0].innerText == '商品') {
 		if(count == 14) {
 			inputData['product'] = tr.cells[0].innerText;
 			inputData['region'] = tr.cells[1].innerText;
 		}
 		if(count == 13) {
 			if(tr.previousSibling.childNodes.length == 14) {
 				inputData['product'] = tr.previousSibling.cells[0].innerText;
 			} else if (tr.previousSibling.childNodes.length == 13) {
 				inputData['product'] = tr.previousSibling.previousSibling.cells[0].innerText;
 			}
 			inputData['region'] = tr.cells[0].innerText;
 		}
 		for(let i = 0; i < inputEl.length; i++) {
 			newSale.push(Number(inputEl[i].value));  
 		}
 		inputData['sale'] = newSale;        //更新用户输入的数据
 	} else {
 		if(count == 14) {
 			inputData['product'] = tr.cells[1].innerText;
 			inputData['region'] = tr.cells[0].innerText;
 		}
 		if(count == 13) {
 			if(tr.previousSibling.childNodes.length == 14) {
 				inputData['region'] = tr.previousSibling.cells[0].innerText;
 			} else if (tr.previousSibling.childNodes.length == 13) {
 				inputData['region'] = tr.previousSibling.previousSibling.cells[0].innerText;
 			}
 			inputData['product'] = tr.cells[0].innerText;
 		}
 		for(let i = 0; i < inputEl.length; i++) {
 			newSale.push(Number(inputEl[i].value));  
 		}
 		inputData['sale'] = newSale;
	}
	console.log(inputData);
	dataStorage(inputData);
}
