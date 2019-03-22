const templateScatter = {
	title: {
		show: true,
		left: 'center',
		top: '5px',
	},
	grid: {
		top: '20px',
		bottom: '40px',
	},
	tooltip: {
		backgroundColor: 'rgba(35,49,90, 0.8)',
		borderColor: 'rgba(35,49,90, 0.8)',
		borderWidth: 1,
		padding: 10,
		textStyle: {
			color: '#FFF'
		},
		trigger: 'item'
	},
	legend: {
		show: false
	},
	xAxis: {
		name: '',
		nameLocation: 'center',
		boundaryGap: true,
		axisLine: {
			show: true,
			symbol: ['none', 'arrow'],
			lineStyle: {
				color: '#66B1FB',
				width: 2
			}
		},
		axisLabel: {
			show: false,
		},
		axisTick: {
			show: false,
		},
		splitLine: {
			show: false
		},
		nameTextStyle: {
			color: '666666',
			fontFamily: '"PingFang SC',
			fontSize: '14',
		}
	},
	yAxis: {
		name: '',
		nameLocation: 'center',
		axisLabel: {
			show: false,
		},
		axisLine: {
			show: true,
			symbol: ['none', 'arrow'],
			lineStyle: {
				color: '#66B1FB',
				width: 2
			}
		},
		axisTick: {
			show: false,
		},
		splitLine: {
			show: false
		},
		nameTextStyle: {
			color: '#666666',
			fontFamily: '"PingFang SC',
			fontSize: '14',
		}
	},
};
export { templateScatter };