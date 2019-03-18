const templateLine = {
    title: {
        show: true,
        left: 'center',
        top: '5px',
    },
    grid: {
        left: '45px',
        top: '65px',
        right: '45px',
        bottom: '65px',
    },
    tooltip: {
        backgroundColor: 'rgba(35,49,90, 0.8)',
        borderColor: 'rgba(35,49,90, 0.8)',
        borderWidth: 1,
        padding: 10,
        textStyle: {
            color: '#FFF'
        },
        trigger: 'axis'
    },
    legend: {
        orient: 'horizontal',
        right: '45px',
        top: '20px',
        itemWidth: 4,
        itemHeight: 8,
        itemGap: 20,
        textStyle: {
            color: '#666',
            padding: [0, 5, 0, 5]
        },
    },
    xAxis: {
        boundaryGap: false,
        axisLine: {
            show: false,
        },
        axisLabel: {
            fontFamily: 'MicrosoftYaHei',
            color: '#9DA2AD',
            margin: 30,
        },
        axisTick: {
            show: false,
        },
    },
    yAxis: {
        name: '',
        splitNumber: 5,
        axisLabel: {
            show: false,
        },
        axisLine: {
            show: false,
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            lineStyle: {
                color: '#EEE',
                type: 'dashed',
            }
        }
    },
}

export { templateLine };