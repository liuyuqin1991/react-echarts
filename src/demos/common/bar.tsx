import BaseComponent from '../../components/base-components'
import React from 'react';
import BarCharts from '../../components/bar';
import { templateBar } from '../template/bar';

interface Props {
    width?: string
    height?: string
}

interface State {
    commonChartsData: Array<{ name: string, data: Array<number> }>
    commonXAxisData: Array<string>
    reverseChartsData: Array<{ name: string, data: Array<number> }>
    reverseYAxisData: Array<string>
}

class CommonBar extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            //折线图，柱状图数据
            commonChartsData: [{ name: "北京", data: [10, 80, 90, 40, 50, 70, 60] }, { name: "湖北", data: [20, 40, 80, 30, 30, 60, 40] }],
            commonXAxisData: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
            //翻转折线图数据
            reverseChartsData: [{ name: "2018年", data: [10, 80, 90, 40, 50, 70, 60, 20, 100] }],
            reverseYAxisData: ['巴西', '印尼', '美国', '印度', '中国', '日本', '韩国', '新加坡', '俄罗斯'],
        }
    }

    componentDidMount(): void {
    }

    setBarNormalOption(): any {
        return templateBar;
    }

    setBarDifficultOption(): any {
        let option: any = Object.assign({}, templateBar);
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
        let option: any = Object.assign({}, templateBar);
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

    render() {
        return (
            <div className="common-bar">
                <div className="title">基本图表-柱状图（无option配置）</div>
                <BarCharts
                    width={this.props.width}
                    height={this.props.height}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
                <div className="title">基本图表-（除series的静态option配置）</div>
                <BarCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setBarNormalOption.bind(this)}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
                <div className="title">基本图表-（包含series的动态option配置）</div>
                <BarCharts
                    width={this.props.width}
                    height={this.props.height}
                    tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                    setOption={this.setBarDifficultOption.bind(this)}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
                <div className="title">基本图表-翻转柱状图（包含series的option配置）</div>
                <BarCharts
                    width={this.props.width}
                    height={this.props.height}
                    isReverse={true}
                    tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                    setOption={this.setBarReverseOption.bind(this)}
                    seriesData={this.state.reverseChartsData}
                    xAxisData={this.state.reverseYAxisData} />
            </div>
        );
    }
}

export default CommonBar;