import BaseComponent from '../../components/base-components'
import React from 'react';
const Echarts = require('echarts');

class BarRollingTwoAxisCharts extends BaseComponent {

    start: number = 100
    end: number = 50

    constructor(props: any) {
        super(props);
    }

    componentDidMount(): void {
        setInterval(() => {
            this.createEcharts(this.start, this.end);
            if (this.end <= 0) {
                this.start = 100;
                this.end = 50;
            }
            else {
                this.start -= 11;
                this.end -= 11;
            }
        }, 1000)
    }


    setOption(start: number, end: number) {
        let option = {
            title: {
                text: '今日排行',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '15%',
                right: '10%',
            },
            xAxis: [{
                show: false,
                type: 'value',
                boundaryGap: ['0', '400%']
            }, {
                show: false,
                type: 'value',
                inverse: true,
                boundaryGap: ['0', '400%']
            }],
            yAxis: [{
                name: 'GMV省份排行',
                type: 'category',
                data: ['山东', '湖北', '北京', '河北', '上海', '四川', '浙江', '湖南', '江西', '山西']
            }, {
                name: '门店数省份排行',
                type: 'category',
                data: ['湖北', '四川', '新疆', '江苏', '山东', '北京', '浙江', '湖南', '江西', '山西']
            }],
            dataZoom: [{
                type: 'slider',
                show: false,
                yAxisIndex: [0],
                start: start,
                end: end
            }, {
                type: 'slider',
                show: false,
                yAxisIndex: [1],
                start: start,
                end: end
            }],
            series: [
                {
                    name: 'GMV',
                    type: 'bar',
                    data: [1234, 2565, 3712, 4865, 5342, 6923, 7412, 8736, 9103, 9973],
                    label: {
                        show: true,
                        position: 'right',
                    }
                },
                {
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    name: '门店数',
                    type: 'bar',
                    data: [10, 20, 25, 40, 55, 69, 72, 89, 93, 99],
                    label: {
                        show: true,
                        position: 'left',
                    }
                }
            ]
        };
        return option;
    }

    //创建图表
    createEcharts(start: number, end: number) {
        let charts = Echarts.init(document.getElementById('bar-rolling-two-axis'));
        let option = this.setOption(start, end);
        this.renderEcharts(charts, option);
    }


    //通用化配置，渲染图表
    renderEcharts(charts: any, option: any): void {
        charts.setOption(option, true);
        //控制台打印配置，右键存储到全局对象，使用JSON.stringify()复制文本到VS code格式化后，粘贴到下面的网址进行调试：http://echarts.baidu.com/examples/editor.html?c=line-stack
        //注意修改网站图表div的背景色
        window.onresize = function () {
            charts.resize();
        };
    }

    render() {
        return (
            <div id='bar-rolling-two-axis' style={{ width: '400px', height: '300px' }}></div>
        );
    }
}

export default BarRollingTwoAxisCharts;