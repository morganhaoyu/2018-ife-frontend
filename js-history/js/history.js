function getState() {
	var checkboxs = document.querySelectorAll('input[type=checkbox]');
	var curState = '';

	for(let i = 0; i < checkboxs.length; i++) {
		if(checkboxs[i].checked === true) {
			curState += '1';
		} else {
			curState += '0';
		}
	}
	return curState;
}

function updateCheckbox() {
	if(window.location.search === '') {
		window.location.search = '11111111';
	}
	var checkboxs = document.querySelectorAll('input[type=checkbox]');
	var stateArr = window.location.search.slice(1).split('');
	for(let j = 0; j < stateArr.length; j++) {
		if(stateArr[j] === '1') {
			checkboxs[j].checked = true;
		} else if(stateArr[j] === '0') {
			checkboxs[j].checked = false;
		}
	}
}

radioWrapper.addEventListener('click',function() {
	history.pushState({query: getState()}, null, '?'+getState());
	stateChanged();
})

function stateChanged() {
	updateCheckbox();
	var data1 = getData();
	console.log(data1);
	tableCreate(data1);
	var data2 =data1.map(function(x) {
   		return x['sale'];
	})
	document.getElementById('chart-wrapper').innerHTML = '';
	lineChart(data2);
	barChart(data2);
}

stateChanged();

window.onpopstate = stateChanged;
