const templateBar = {
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
        trigger: 'axis'
    },
    legend: {
        show: true
    },
    xAxis: {
        name: '',
        nameLocation: 'end',
        boundaryGap: true,
        axisLine: {
            show: true,
            lineStyle: {
                color: '#F2F2F2',
                width: 1
            }
        },
        axisLabel: {
            show: true,
            color: '#999999',
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: false,
        },
        nameTextStyle: {
            color: '#999999',
            fontFamily: 'PingFang SC',
        }
    },
    yAxis:
    {
        name: '',
        nameLocation: 'end',
        axisLabel: {
            show: true,
            color: '#999999',
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: '#F2F2F2',
                width: 1
            }
        },
        axisTick: {
            show: false,
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F2F2F2',
                width: 1
            }
        },
        nameTextStyle: {
            color: '#999999',
            fontFamily: 'PingFang SC',
            align: 'right',
        }
    },
};
export { templateBar };