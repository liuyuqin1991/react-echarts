import BaseComponent from '../../components/base-components'
import React from 'react';
import ScatterCharts from '../../components/scatter';
import { templateScatter } from '../template/scatter';

interface Props {
    width?: string
    height?: string
}

interface State {
    scatterChartData: Array<{ name: string, data: Array<{ name: string, value: Array<number> }> }>
    minPoint: { x: number, y: number }
    maxPoint: { x: number, y: number }
}

class CommonScatter extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            //散点图数据
            scatterChartData: [
                { name: "图例1", data: [{ name: "湖北", value: [35, 10] }, { name: "湖南", value: [40, 100] }, { name: "江西", value: [20, 45] }] },
                { name: "图例2", data: [{ name: "云南", value: [60, 20] }, { name: "贵州", value: [90, 45] }, { name: "四川", value: [75, 30] }] },
                { name: "图例3", data: [{ name: "哈尔滨", value: [20, 70] }, { name: "吉林", value: [10, 90] }, { name: "辽宁", value: [35, 80] }] },
                { name: "图例4", data: [{ name: "北京", value: [70, 90] }, { name: "上海", value: [85, 65] }, { name: "广州", value: [100, 70] }] },
            ],
            //scatterNormalChartData所有坐标点的x,y的最大坐标点和x,y的最小坐标点，可以通过数据处理得出，在复杂散点图例子中使用（为了划分四块背景用的）
            minPoint: { x: 10, y: 10 },
            maxPoint: { x: 100, y: 100 },
        }
    }

    componentDidMount(): void {
    }

    setScatterNormalOption(): any {
        return templateScatter;
    }

    setScatterDifficultOption(): any {
        let option: any = templateScatter;
        let labelFormatter = function (params: any) {
            return params.name;
        }
        let series = [];
        const itemColor = ['#FC5554', '#FFB45A', '#6B6BB9', '#0073E6'];
        const markAreaColor = [['#F2B4B4', '#FFF1F1', '#FDDEDE'], ['#EFBE82', '#FFF9F1', '#FEF0DF'], ['#B3C3F7', '#F4F7FF', '#E5EBFF'], ['#91BFE1', '#EAF6FF', '#CEE8FF']];
        const minX = this.state.minPoint.x || 0;
        const minY = this.state.minPoint.y || 0;
        const maxX = this.state.maxPoint.x || 0;
        const maxY = this.state.maxPoint.y || 0;
        option.xAxis.name = "X轴销售额";
        option.xAxis.min = minX;
        option.xAxis.max = maxX;
        option.yAxis.name = "Y轴销售额";
        option.yAxis.min = minY;
        option.yAxis.max = maxY;
        const markAreaData = [
            [{ name: "自然市场", coord: [minX, (minY + maxY) / 2] }, { name: "自然市场", coord: [(minX + maxX) / 2, minY] }],
            [{ name: "策略市场", coord: [minX, maxY] }, { name: "策略市场", coord: [(minX + maxX) / 2, (minY + maxY) / 2] }],
            [{ name: "精耕市场", coord: [(minX + maxX) / 2, (minY + maxY) / 2] }, { name: "精耕市场", coord: [maxX, minY] }],
            [{ name: "重点市场", coord: [(minX + maxX) / 2, maxY] }, { name: "重点市场", coord: [maxX, (minY + maxY) / 2] }],
        ]
        for (let i = 0; i < itemColor.length; i++) {
            let s: any = {
                type: 'scatter',
                symbol: 'circle',
                symbolSize: '12',
                label: {
                    show: true,
                    position: 'right',
                    color: '#333333',
                    fontFamily: '"PingFang SC',
                    fontSize: '14',
                },
                itemStyle: {
                    color: itemColor[i],
                },
                markArea: {
                    data: [markAreaData[i]],
                    label: {
                        show: true,
                        position: ['30%', '45%'],
                        color: markAreaColor[i][0],
                        fontSize: 22,
                    },
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 1,
                            y2: 0,
                            colorStops: [{
                                offset: 0, color: markAreaColor[i][1] // 0% 处的颜色
                            }, {
                                offset: 1, color: markAreaColor[i][2] // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                    emphasis: {
                        label: {
                            show: false,
                            position: ['30%', '45%'],
                        }
                    }
                }
            };
            if (labelFormatter && labelFormatter instanceof Function) {
                s.label.formatter = labelFormatter;
            }
            series.push(s);
        }
        option.series = series;
        return option;
    }

    setScatterTooltipFormatter() {
        const scatterTooltipFormatter = function (params: any) {
            let _html = "";
            if (!!params.value) {
                _html += "<span class='tooltip name'>" + params.name + "</span>" + "：" + "<br>" +
                    "<span class='tooltip data'>X轴销售额：" + params.value[0] + "</span><br>" +
                    "<span class='tooltip data'>Y轴销售额：" + params.value[1] + "</span><br>";
            }
            return _html;
        };
        return scatterTooltipFormatter
    }

    render() {
        return (
            <div className="common-scatter">
                <div className="title">散点图（无option配置）</div>
                <ScatterCharts
                    width={this.props.width}
                    height={this.props.height}
                    seriesData={this.state.scatterChartData} />
                <div className="title">散点图（除series外的静态option配置）</div>
                <ScatterCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setScatterNormalOption.bind(this)}
                    seriesData={this.state.scatterChartData} />
                <div className="title">散点图（包含series的动态option配置）</div>
                <ScatterCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setScatterDifficultOption.bind(this)}
                    tooltipFormatter={this.setScatterTooltipFormatter()}
                    seriesData={this.state.scatterChartData} />
            </div>
        );
    }
}

export default CommonScatter;