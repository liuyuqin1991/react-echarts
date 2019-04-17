import React from 'react';
import ReactDom from 'react-dom';
import BaseComponent from '../components/base-components';
import ScatterCharts from '../components/scatter';
import MapCharts from '../components/map';
import BarCharts from '../components/bar';
import BarRollingCharts from './special/bar-rolling';
import LineCharts from '../components/line';
import PieCharts from '../components/pie';
import { templateScatter } from '../template/scatter';
import { templateMap } from '../template/map';
import { templateBar } from '../template/bar';
import { templateLine } from '../template/line';
import { templatePie } from '../template/pie';
import './index.scss';

interface DemoProps {

}

interface DemoState {
    commonChartsData: Array<{ name: string, data: Array<number> }>,
    commonXAxisData: Array<string>,
    reverseChartsData: Array<{ name: string, data: Array<number> }>,
    reverseYAxisData: Array<string>,
    pieChartsData: Array<{ name: string, data: Array<{ name: string, value: number }> }>
    scatterChartData: Array<{ name: string, data: Array<{ name: string, value: Array<number> }> }>
    minPoint: { x: number, y: number },
    maxPoint: { x: number, y: number },
    mapChartsDataByChina: Array<{ name: string, data: Array<{ name: string, value: number }> }>
    mapChartsDataByHubei: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class Demos extends BaseComponent<DemoProps, DemoState> {

    static chartsWidth = "400px";
    static chartsHeight = "300px";
    constructor(props: DemoProps) {
        super(props);
        this.state = {
            //折线图，柱状图数据
            commonChartsData: [{ name: "北京", data: [10, 80, 90, 40, 50, 70, 60] }, { name: "湖北", data: [20, 40, 80, 30, 30, 60, 40] }],
            commonXAxisData: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
            //翻转折线图数据
            reverseChartsData: [{ name: "2018年", data: [10, 80, 90, 40, 50, 70, 60, 20, 100] }],
            reverseYAxisData: ['巴西', '印尼', '美国', '印度', '中国', '日本', '韩国', '新加坡', '俄罗斯'],
            //饼状图数据
            pieChartsData: [{ name: "", data: [{ name: "湖北", value: 10 }, { name: "北京", value: 40 }] }],
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
            //地图数据（中国）
            mapChartsDataByChina: [{ name: "中国", data: [{ name: "黑龙江", value: 10 }, { name: "西藏", value: 20 }, { name: "山东", value: 30 }, { name: "广东", value: 40 }, { name: "湖北", value: 50 }] }],
            //地图数据（湖北）
            mapChartsDataByHubei: [{ name: "湖北", data: [{ name: "武汉市", value: 10 }, { name: "恩施州", value: 20 }, { name: "荆门市", value: 30 }, { name: "黄冈市", value: 40 }, { name: "襄阳市", value: 50 }] }],
        }
    }


    setLineNormalOption(): any {
        return templateLine;
    }

    setBarNormalOption(): any {
        return templateBar;
    }

    setPieNormalOption(): any {
        return templatePie;
    }

    setScatterNormalOption(): any {
        return templateScatter;
    }

    setMapNormalOption(): any {
        return templateMap;
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

    setBarDifficultOption(): any {
        let option: any = templateBar;
        let series = [];
        const itemColor = ['#0073E6', '#FC5554', '#FFB45A', '#6B6BB9'];
        for (let i = 0; i < this.state.commonChartsData.length; i++) {
            let s = {
                type: 'bar',
                itemStyle: {
                    color: itemColor[i]
                }
            }
            series.push(s);
        }
        option.xAxis.name = "(元)";
        option.yAxis.name = "(个)";
        option.series = series;
        return option;
    }

    setBarReverseOption(): any {
        let option: any = templateBar;
        let series = [];
        const itemColor = ['#0073E6', '#FC5554', '#FFB45A', '#6B6BB9'];
        for (let i = 0; i < this.state.reverseChartsData.length; i++) {
            let s = {
                type: 'bar',
                barWidth: '15px',
                barCategoryGap: '10px',
                itemStyle: {
                    color: itemColor[i]
                }
            }
            series.push(s);
        }
        option.xAxis = {
            type: 'value',
            boundaryGap: [0, '10%']
        };
        option.yAxis = {
            type: 'category',
        }
        option.grid = {
            left: '6%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        };
        option.series = series;
        return option;
    }

    setLineDifficultOption(): any {
        let option: any = templateLine;
        let series = [];
        const itemColor = ['#0073E6', '#FC5554', '#FFB45A', '#6B6BB9'];
        for (let i = 0; i < this.state.commonChartsData.length; i++) {
            let s = {
                type: 'line',
                symbol: 'circle',
                symbolSize: '6',
                itemStyle: {
                    color: itemColor[i],
                    borderColor: '#FFF',
                    borderWidth: '2',
                },
                lineStyle: {
                    width: '2',
                    color: itemColor[i],
                },
            }
            series.push(s);
        }
        option.series = series;
        return option;
    }

    setOptionAfterLoadMap(option: any, mapJson: any): any {
        if (!!mapJson) {
            let markPoints: any[] = [];
            let seriesData = this.state.mapChartsDataByChina;
            for (let p of mapJson.features) {
                if (seriesData[0] && seriesData[0].data && seriesData[0].data[0].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 13,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(245,144,110,1)',
                            borderWidth: 15,
                            borderColor: 'rgba(245,144,110,0.4)',
                        },
                    });
                }
                else if (seriesData[0] && seriesData[0].data && seriesData[0].data[1].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 10,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(255,216,77,1)',
                            borderWidth: 12,
                            borderColor: 'rgba(255,216,77,0.4)',
                        },
                    });
                }
                else if (seriesData[0] && seriesData[0].data && seriesData[0].data[2].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 7,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(194,228,92,1)',
                            borderWidth: 9,
                            borderColor: 'rgba(194,228,92,0.4)',
                        },
                    });
                }
            }
            option.series[0].markPoint = {
                show: true,
                symbolSize: 20,
                itemStyle: {
                    color: 'blue',
                },
                data: markPoints
            };
        }
        return option;
    }

    setAxisTooltipFormatter(series: any) {
        let _html = "";
        if (series && series.length > 0) {
            _html += "<span class='tooltip name'>" + series[0].name + "</span>" + "：" + "<br>";
            for (let i = 0; i < series.length; i++) {
                _html += "<span class='tooltip value'>" + series[i].seriesName + "：" + series[i].value + "</span><br>";
            }
        }
        return _html;
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
            <div className="content">
                <div className="charts line">
                    <div className="title">折线图（无option配置）</div>
                    <LineCharts id="lineCharts-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                    <div className="title">折线图（除series的静态option配置）</div>
                    <LineCharts id="lineCharts-normal"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setLineNormalOption.bind(this)}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                    <div className="title">折线图（包含series的option配置）</div>
                    <LineCharts id="lineCharts-difficult"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                        setOption={this.setLineDifficultOption.bind(this)}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                </div>
                <div className="charts bar">
                    <div className="title">柱状图（无option配置）</div>
                    <BarCharts id="barCharts-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                    <div className="title">柱状图（除series的静态option配置）</div>
                    <BarCharts id="barCharts-normal"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setBarNormalOption.bind(this)}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                    <div className="title">柱状图（包含series的option配置）</div>
                    <BarCharts id="barCharts-difficult"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                        setOption={this.setBarDifficultOption.bind(this)}
                        seriesData={this.state.commonChartsData}
                        xAxisData={this.state.commonXAxisData} />
                    <div className="title">柱状图翻转（包含series的option配置）</div>
                    <BarCharts id="barCharts-reverse"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        isReverse={true}
                        tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                        setOption={this.setBarReverseOption.bind(this)}
                        seriesData={this.state.reverseChartsData}
                        xAxisData={this.state.reverseYAxisData} />
                    <div className="title">柱状图滚动翻转（包含series的option配置）</div>
                    <BarRollingCharts />
                </div>
                <div className="charts scatter">
                    <div className="title">散点图（无option配置）</div>
                    <ScatterCharts id="scatterCharts-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        seriesData={this.state.scatterChartData} />
                    <div className="title">散点图（除series外的静态option配置）</div>
                    <ScatterCharts id="scatterCharts-normal"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setScatterNormalOption.bind(this)}
                        seriesData={this.state.scatterChartData} />
                    <div className="title">散点图（包含series的option配置）</div>
                    <ScatterCharts id="scatterCharts-difficult"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setScatterDifficultOption.bind(this)}
                        tooltipFormatter={this.setScatterTooltipFormatter()}
                        seriesData={this.state.scatterChartData} />
                </div>
                <div className="charts map">
                    <div className="title">全国地图（无option配置）</div>
                    <MapCharts id="mapChartsByChina-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        regionType="country"
                        regionName="中国"
                        seriesData={this.state.mapChartsDataByChina} />
                    <div className="title">湖北省地图（无option配置）</div>
                    <MapCharts id="mapChartsByHubei-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        regionType="province"
                        regionName="湖北"
                        seriesData={this.state.mapChartsDataByHubei} />
                    <div className="title">全国地图（除series的option静态配置）</div>
                    <MapCharts id="mapChartsByChina-normal"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setMapNormalOption.bind(this)}
                        regionType="country"
                        regionName="中国"
                        seriesData={this.state.mapChartsDataByChina} />
                    <div className="title">全国地图（包含加载地图后对option再配置）</div>
                    <MapCharts id="mapChartsByChina-difficult"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setMapNormalOption.bind(this)}
                        setOptionAfterLoadMap={this.setOptionAfterLoadMap.bind(this)}
                        regionType="country"
                        regionName="中国"
                        seriesData={this.state.mapChartsDataByChina} />
                </div>
                <div className="charts pie">
                    <div className="title">饼状图（无option配置）</div>
                    <PieCharts id="pieCharts-easy"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        seriesData={this.state.pieChartsData} />
                    <div className="title">饼状图（除series的静态option配置）</div>
                    <PieCharts id="pieCharts-normal"
                        width={Demos.chartsWidth}
                        height={Demos.chartsHeight}
                        setOption={this.setPieNormalOption.bind(this)}
                        seriesData={this.state.pieChartsData} />
                </div>
            </div>
        );
    }
}

export default Demos;

ReactDom.render(
    <Demos></Demos>,
    document.getElementById('root')
);