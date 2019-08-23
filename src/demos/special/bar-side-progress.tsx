import BaseComponent from '../../components/base-components'
import React from 'react';
import { templateBar } from '../template/bar';
const Echarts = require('echarts');

import './bar-side-progress.scss';

interface Props {
    width?: string
    height?: string
    exposureProgress: string
    clickProgress: string
    buyProgress: string
    movesaleProgress: string
    reverseChartsData: any
    reverseYAxisData: any
}

interface States {

}

class BarSideProgressCharts extends BaseComponent<Props, States> {

    ref: HTMLDivElement
    max: number = 0
    empty: Array<number> = []

    constructor(props: Props) {
        super(props);
        if (this.props.reverseChartsData && this.props.reverseChartsData[0].data) {
            this.props.reverseChartsData[0].data.forEach((element: any) => {
                if (element > this.max) {
                    this.max = element;
                }
            });
            for (let i = 0; i < this.props.reverseChartsData[0].data.length; i++) {
                this.empty.push(this.max);
            }
        }
    }

    componentDidMount(): void {
        this.createEcharts();
    }

    setBarReverseStyleOption(): any {
        let option: any = Object.assign({}, templateBar);
        let series = [];
        series.push({
            type: 'bar',
            barWidth: '25px',
            barCategoryGap: '10px',
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 1,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#00E0D2'
                    }, {
                        offset: 1, color: '#00BDA6'
                    }],
                    global: false // 缺省为 false
                }
            },
            data: this.props.reverseChartsData[0].data,
            name: this.props.reverseChartsData[0].name
        });
        series.push({
            type: 'bar',
            itemStyle: {
                normal: { color: 'rgba(95,191,179,0.1)' }
            },
            barGap: '-100%',
            barWidth: '25px',
            barCategoryGap: '10px',
            data: this.empty,
            animation: false
        });
        option.legend.show = false;
        option.xAxis = {
            type: 'value',
            position: 'top',
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#999999',
                margin: 25,
            }
        };
        option.yAxis = {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#333333',
            },
            data: this.props.reverseYAxisData
        }
        option.grid = {
            left: '100px',
            right: '80px',
            top: '70px',
            bottom: '30px',
            containLabel: false,
        };
        option.series = series;
        return option;
    }

    //创建图表
    createEcharts() {
        let charts = Echarts.init(this.ref);
        let option = this.setBarReverseStyleOption();
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
            <>
                <div className="title">特殊图表-侧面展现进度条</div>
                <div style={{ position: "relative" }}>
                    <div ref={(ref) => this.ref = ref} style={{ width: this.props.width || '400px', height: this.props.height || '350px' }} />
                    <div className="progress">
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div className="item exposure">供应曝光转化率{this.props.exposureProgress}</div>
                            <div className="item click">曝光点击转化率{this.props.clickProgress}</div>
                            <div className="item buy">点击购买转化率{this.props.buyProgress}</div>
                        </div>
                        <div>
                            <div className="movesale"></div>
                        </div>
                        <div className="movesale-label">动销率<span>{this.props.movesaleProgress}</span></div>
                    </div>
                </div>
            </>
        );
    }
}

export default BarSideProgressCharts;