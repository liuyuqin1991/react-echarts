import BaseComponent from '../../components/base-components'
import React from 'react';
const Echarts = require('echarts');

interface Props {
    width?: string
    height?: string
}

class PieGaugeCharts extends BaseComponent<Props> {


    constructor(props: Props) {
        super(props);
    }

    componentDidMount(): void {
        this.createEcharts();
    }


    setOption() {
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
            series: [
                {
                    name: '饼状图名称',
                    type: 'pie',
                    radius: ['50%', '75%'],
                    startAngle: 228,
                    data: [
                        {
                            value: 10,
                            name: '真实数据',
                            label: {
                                show: true,
                                position: 'center',
                                formatter: [
                                    '{a|全国数据}',
                                    '{b|234}'
                                ].join('\n\n'),
                                rich: {
                                    a: {
                                        color: '#FFF',
                                        fontSize: 16,
                                    },
                                    b: {
                                        color: '#FFF',
                                        fontSize: 50,
                                    }
                                }
                            },
                            itemStyle: {
                                color: '#385783'
                            }
                        },
                        {
                            value: 10 * 0.3,
                            name: '背景2',
                            itemStyle: {
                                color: '#131233'
                            }
                        },
                    ]
                },
                {
                    type: 'graph',
                    layout: 'circular',
                    data: this.createNodes(26),
                    symbolSize: 5,
                    itemStyle: {
                        color: '#77A0DD'
                    },
                    lineStyle: {
                        color: '#131233'
                    },
                    width: '42%',
                    height: '42%',
                    animation: false,
                    edges: this.createEdges(26).map(function (e) {
                        return {
                            source: e[0],
                            target: e[1]
                        };
                    })
                }
            ]
        };
        return option;
    }

    createNodes(count: number) {
        let nodes = [];
        for (let i = 0; i < count; i++) {
            if (i >= 4 && i <= 8) {
                nodes.push({
                    name: i,
                    symbolSize: 0
                });
            }
            else {
                nodes.push({
                    name: i,
                    symbolSize: 5
                });
            }
        }
        return nodes;
    }

    createEdges(count: number) {
        let edges = [];
        if (count === 2) {
            return [[0, 1]];
        }
        for (var i = 0; i < count; i++) {
            edges.push([i, (i + 1) % count]);
        }
        return edges;
    }

    //创建图表
    createEcharts() {
        let charts = Echarts.init(document.getElementById('pie-gauge'));
        let option = this.setOption();
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
                <div className="title">特殊图表-类仪表盘饼图</div>
                <div id='pie-gauge' style={{ width: this.props.width || '400px', height: this.props.height || '300px', backgroundColor: "#131233" }}></div>
            </div>

        );
    }
}

export default PieGaugeCharts;