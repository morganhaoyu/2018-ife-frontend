
var lineChart = function(data) {
	//创建画布
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	document.getElementById('chart-wrapper').appendChild(canvas);
	canvas.id = 'liChart';
	canvas.width = 600;
	canvas.height = 450;
	//canvas.setAttribute('style','border: 1px solid black');
	
	//定义变量
	var axisWidth = 500, axisHeight = 400, margin = 50;
	var r = 3.5, lineWidth = 1, gap = 40;
	var dataArray = data.reduce((acc,cur) => acc.concat(cur));
	var max = dataArray.reduce((prev,next) => Math.max(prev,next));
	var cols = ['#ADD8E6','#87CEFA','#6495ED','#E6E6FA','#9370DB','#DDA0DD','#FFE4E1','#F090B0','#FFC0CB']
	if(max > 100){
		var space = 100, 
			scale = (axisHeight - margin) / (Math.ceil(max/100) * 100),
			spc = space * scale, 
			count = max / 100;
	} else {
		var space = 10, 
		scale = (axisHeight - margin) / (Math.ceil(max/10) * 10),
		spc = space * scale, 
		count = Math.ceil(max / space);
	}

	//绘制x轴
	ctx.beginPath();
	ctx.moveTo(margin,axisHeight);
	ctx.lineTo(margin+axisWidth,axisHeight);
	ctx.stroke();

	for(let i = 1; i <= 12; i++) {
		var mon = i + '月';
		ctx.beginPath();
		ctx.moveTo(margin+gap*i,axisHeight);
		ctx.lineTo(margin+gap*i,axisHeight+7);
		ctx.stroke();
		ctx.font = '12px arial';
		ctx.textAlign = 'center';
		ctx.fillText(mon, margin+gap*i, axisHeight+25);
	}

	//绘制y轴
	ctx.beginPath();
	ctx.moveTo(margin,axisHeight);
	ctx.lineTo(margin,margin);
	ctx.stroke();
	
	for(let j = 1; j < count+1; j++) {
		ctx.beginPath();
		ctx.moveTo(margin,axisHeight-spc*j);
		ctx.lineTo(margin-7,axisHeight-spc*j);
		ctx.stroke();

		ctx.font = '12px arial';
		ctx.textAlign = 'end';
		ctx.textBaseline = 'middle'
		ctx.fillText(space * j, margin-15,axisHeight-spc*j);
	}

    for(let i = 0; i < data.length; i++) {
    	//绘制数据点
		for(let j = 0; j < data[i].length; j++) {
			var height = axisHeight - data[i][j] * scale;
			var width = margin + gap * (j + 1);
			ctx.beginPath();
			ctx.arc(margin+gap*(j+1), height, r, 0, Math.PI*2, true);
			ctx.fillStyle = cols[i];
			ctx.fill();
   		
   	    //连线
	   		ctx.moveTo(width,height);
	   		ctx.lineTo(margin+gap*(j+2), axisHeight-data[i][j+1]*scale);
	   		ctx.strokeStyle = cols[i];
	   		ctx.lineWidth = 2;
	   		ctx.stroke();
		}
    }
	
}

// 