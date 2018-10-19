
var barChart = function(data) {
	//创建svg
	var svgNS = 'http://www.w3.org/2000/svg',
	svg = document.createElementNS(svgNS,'svg');
	svg.setAttribute('width','650');
	svg.setAttribute('height','450');
	svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('chart-wrapper').append(svg);

	//定义变量
	var axisWidth = 555, axisHeight = 400, margin = 50;
	var dataArray = data.reduce((acc,cur) => acc.concat(cur));
	var max = dataArray.reduce((prev,next) => Math.max(prev,next));
	//var scale = (axisHeight - margin) / (Math.ceil(max/100) * 100);         //获取高度和值的比例
	var cols = ['#ADD8E6','#87CEFA','#6495ED','#E6E6FA','#9370DB','#DDA0DD','#FFE4E1','#F090B0','#FFC0CB'];

	//绘制横坐标轴
	var xAxis = document.createElementNS(svgNS,'line');
	xAxis.setAttribute('x1', margin);
	xAxis.setAttribute('y1', axisHeight);
	xAxis.setAttribute('x2', axisWidth+margin);
	xAxis.setAttribute('y2', axisHeight);
	xAxis.setAttribute('stroke', 'black');
	svg.append(xAxis);

	//绘制纵坐标轴
	var yAxis = document.createElementNS(svgNS,'line');
	yAxis.setAttribute('x1', margin);
	yAxis.setAttribute('y1', axisHeight);
	yAxis.setAttribute('x2', margin);
	yAxis.setAttribute('y2', margin);
	yAxis.setAttribute('stroke', 'black');
	svg.append(yAxis);

	//绘制横轴刻度
	for(let i = 1; i < 13; i++) {
		var xtick = document.createElementNS(svgNS,'line');
			xtick.setAttribute('x1', margin+(45 * i) - 15);
			xtick.setAttribute('y1', axisHeight+1);
			xtick.setAttribute('x2', margin+(45 * i) - 15);
			xtick.setAttribute('y2', axisHeight+7);
			xtick.setAttribute('stroke', 'black');
			svg.append(xtick);

		var mon = i + '月',
			xtext = document.createElementNS(svgNS,'text');
			xtext.setAttribute('x', margin+(45 * i) - 15);
			xtext.setAttribute('y', axisHeight+24);
			xtext.setAttribute('text-anchor', 'middle');
			xtext.setAttribute('style','font: 12px arial');
			xtext.innerHTML = mon;
			svg.append(xtext);
	}	
	
	//绘制纵轴刻度
	
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
	for(let i = 1; i < count+1; i++) {
		var ytick = document.createElementNS(svgNS,'line');
		ytick.setAttribute('x1', margin);
		ytick.setAttribute('y1', axisHeight - spc * i);
		ytick.setAttribute('x2', margin-7);
		ytick.setAttribute('y2', axisHeight - spc * i);
		ytick.setAttribute('stroke','black');
		svg.append(ytick);

		var ytext = document.createElementNS(svgNS,'text');
		ytext.setAttribute('x', margin-10);
		ytext.setAttribute('y', axisHeight - spc * i);
		ytext.setAttribute('text-anchor', 'end');
		ytext.setAttribute('alignment-baseline', 'middle');
		ytext.setAttribute('style','font: 12px arial');
		ytext.innerHTML = space * i;
		svg.append(ytext);
	}

	//绘制柱状图
	for(let i in data){
		for(let j in data[i]) {
			var height = data[i][j] * scale, y = axisHeight - height;
			var width, posX, w;
			if(data.length <= 1) {
				width = 30, gap = 15;
				w = width / data.length;
				posX = margin + gap + (width + gap) * j;
			} else {
				width = 36, gap = 9;
				w = width / data.length;
				posX = margin + gap + (width + gap) * j;
			}
				rect = document.createElementNS(svgNS, 'rect');
				rect.setAttribute('x', posX + i * w);
				rect.setAttribute('y', y);
				rect.setAttribute('width', w);
				rect.setAttribute('height',height);
				rect.setAttribute('fill', cols[i]);
				svg.append(rect);
		}	  
	}
}

