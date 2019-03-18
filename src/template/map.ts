const templateMap = {
	title: {
		show: true,
		left: 'center',
		top: '5px',
	},
	tooltip: {
		backgroundColor: 'rgba(35,49,90, 0.8)',
		borderColor: 'rgba(35,49,90, 0.8)',
		borderWidth: 1,
		padding: 10,
		textStyle: {
			color: '#FFF'
		},
	},
	visualMap: {
		type: 'piecewise', // 定义为分段型视觉映射组件visualMap
		itemWidth: 22,
		itemHeight: 7,
		itemGap: 0,
		splitNumber: 6,
		textGap: 10,
		top: 12,
		left: 15,
		text: ['   高', '低   '],
		textStyle: {
			color: '#666666',
		},
		inRange: {
			symbol: 'rect',
			color: ['#E5F1FC', '#CCE3FA', '#B3D5F7', '#73B2F1', '#4D9DED', '#0073E6'],
		},
		orient: 'horizontal',
		calculable: true,
	},
	series: [
		{
			type: 'map',
			label: {
				show: false,
			},
			top: '15%',
			left: '5%',
			itemStyle: {
				color: 'transparent',
				borderWidth: 1,
				borderColor: '#FFF',
			},
			emphasis: {
				label: {
					show: false,
				},
				itemStyle: {
					areaColor: '#ffc1ae',
					borderWidth: 1,
					borderColor: '#FFF',
				},
			},
		}
	]
};
export { templateMap };