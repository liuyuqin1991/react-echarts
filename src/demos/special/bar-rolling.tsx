import BaseComponent from '../../components/base-components'
import React from 'react';
const Echarts = require('echarts');

interface Props {
    width?: string
    height?: string
}

class BarRollingCharts extends BaseComponent<Props> {

    start: number = 100
    end: number = 50

    constructor(props: Props) {
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
                show: false
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['2019年']
            },
            grid: {
                left: '10%',
                right: '4%',
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, '10%'],
                min: 0,
                max: 100,
            },
            yAxis: {
                type: 'category',
                data: ['巴西', '印尼', '美国', '印度', '中国', '日本', '韩国', '法国', '英国', '德国']
            },
            dataZoom: {
                type: 'slider',
                show: true,
                yAxisIndex: [0],
                left: '100%',
                start: start,
                end: end
            },
            series: [
                {
                    name: '2019年',
                    type: 'bar',
                    itemStyle: {
                        color: '#0073E6'
                    },
                    data: [5, 10, 15, 25, 30, 45, 60, 75, 90, 100]
                },
            ]
        };
        return option;
    }

    //创建图表
    createEcharts(start: number, end: number) {
        let charts = Echarts.init(document.getElementById('bar-rolling'));
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
            <div>
                <div className="title">特殊图表-自动滚动翻转柱状图（单axis）</div>
                <div id='bar-rolling' style={{ width: this.props.width || '400px', height: this.props.height || '300px' }}></div>
            </div>

        );
    }
}

export default BarRollingCharts;