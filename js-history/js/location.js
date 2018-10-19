function getHash() {
	var checkboxs = document.querySelectorAll('input[type=checkbox]');
	var curHash = '';
	
	for(let i = 0; i < checkboxs.length; i++) {
		if(checkboxs[i].checked) {
			curHash += '1';
		} else {
			curHash += '0'
		}
	}
	 return curHash;
}

function updateCheckbox() {
	if(window.location.hash === '') {
		window.location.hash = '11111111';
	}
	var checkboxs = document.querySelectorAll('input[type=checkbox]');
	var hashArr = window.location.hash.slice(1).split('');
	for(let j = 0; j < hashArr.length; j++) {
		if(hashArr[j] === '1') {
			checkboxs[j].checked = true;
		} else if(hashArr[j] === '0') {
			checkboxs[j].checked = false;
		}
	}
}

radioWrapper.addEventListener('click',function() {
	var newHash = getHash();
	location.hash = newHash;
})

function hashChanged() {
	updateCheckbox();
	var data1 = getData();
	tableCreate(data1);
	var data2 =data1.map(function(x) {
   		return x['sale'];
	})
	document.getElementById('chart-wrapper').innerHTML = '';
	lineChart(data2);
	barChart(data2);
}
hashChanged();
window.onhashchange = hashChanged;

