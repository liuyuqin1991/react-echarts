import BaseComponent from '../../components/base-components'
import React from 'react';
const Echarts = require('echarts');

interface Props {
    width?: string
    height?: string
}

interface State {
    pieData: Array<{ name: string, percentage: number }>
}

class PieGaugeCharts extends BaseComponent<Props, State> {



    constructor(props: Props) {
        super(props);
        this.state = {
            pieData: [
                { name: "访问量", percentage: 0.1 }
            ]
        }
    }

    componentDidMount(): void {
        setInterval(() => {
            this.state.pieData[0].percentage = Math.random();
            this.setState({
                pieData: this.state.pieData
            });
            this.createEcharts();
        }, 1500)
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
                    name: '背景图',
                    type: 'pie',
                    radius: ['50%', '75%'],
                    startAngle: 228,
                    z: 3,
                    data: [
                        {
                            value: 1,
                            name: '背景',
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false,
                            },
                            itemStyle: {
                                color: '#385783'
                            }
                        },
                        {
                            value: 0.3,
                            name: '背景2',
                            itemStyle: {
                                color: '#131233'
                            }
                        },
                    ]
                },
                {
                    name: this.state.pieData[0].name,
                    type: 'pie',
                    radius: ['48%', '77%'],
                    startAngle: 228,
                    z: 3,
                    data: [
                        {
                            value: 1 * this.state.pieData[0].percentage,
                            name: '真实数据',
                            label: {
                                show: true,
                                position: 'center',
                                formatter: [
                                    '{a|全国数据}',
                                    '{b|' + (this.state.pieData[0].percentage * 100).toFixed(1) + '%}'
                                ].join('\n\n'),
                                rich: {
                                    a: {
                                        color: '#FFF',
                                        fontSize: 16,
                                    },
                                    b: {
                                        color: '#FFF',
                                        fontSize: 35,
                                    }
                                }
                            },
                            itemStyle: {
                                color: '#33AECC'
                            }
                        },
                        {
                            value: 1 * (1.3 - this.state.pieData[0].percentage),
                            name: '背景2',
                            itemStyle: {
                                color: 'transparent'
                            }
                        },
                    ]
                },
                {
                    type: 'graph',
                    layout: 'circular',
                    data: this.createNodes(26),
                    silent: true,
                    itemStyle: {
                        color: '#77A0DD'
                    },
                    emphasis: {
                        label: {
                            show: false
                        }
                    },
                    lineStyle: {
                        color: '#131233'
                    },
                    width: '42%',
                    height: '42%',
                    animationDurationUpdate: 1500
                }
            ]
        };
        return option;
    }


    createNodes(count: number) {
        let nodes = [];
        for (let i = 0; i < count; i++) {
            //隐藏缺口圆点
            if (i >= 4 && i <= 8) {
                nodes.push({
                    name: i,
                    symbolSize: 0
                });
            }
            else {
                //因为关系图从3点位置顺时针打点，缺口在下方，总计26个点，隐藏的有5个点，显示的有21个点，计算得0-4的点占19%，其他占比81%
                let lightPoint = Math.ceil(21 * this.state.pieData[0].percentage)
                if (this.state.pieData[0].percentage <= 0.81) {
                    if (i > 4 && i <= 8 + lightPoint) {
                        nodes.push({
                            name: i,
                            symbolSize: 8,
                            itemStyle: {
                                color: '#33AECC'
                            }
                        });
                    }
                    else {
                        nodes.push({
                            name: i,
                            symbolSize: 5
                        });
                    }
                }
                else {
                    if ((i > 4 && i <= 25) || (i >= 0 && i < lightPoint - 17)) {
                        nodes.push({
                            name: i,
                            symbolSize: 8,
                            itemStyle: {
                                color: '#33AECC'
                            }
                        });
                    }
                    else {
                        nodes.push({
                            name: i,
                            symbolSize: 5
                        });
                    }
                }
            }
        }
        return nodes;
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