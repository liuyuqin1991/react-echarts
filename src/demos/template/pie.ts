const templatePie = {
    title: {
        show: true,
        left: 'center',
        top: '5px',
    },
    color: ['#0073E6', '#FD6362', '#7C77EF', '#1D96C9'],
    tooltip: {
        backgroundColor: 'rgba(35,49,90, 0.8)',
        borderColor: 'rgba(35,49,90, 0.8)',
        borderWidth: 1,
        padding: 10,
        textStyle: {
            color: '#FFF'
        },
    },
    series: [
        {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['45%', '50%'],
            minAngle: 5,
            label: {
                show: false,
            },
            itemStyle: {
                borderColor: '#FFFFFF',
                borderWidth: 4,
            }
        }
    ]
};
export { templatePie };