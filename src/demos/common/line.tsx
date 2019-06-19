import BaseComponent from '../../components/base-components'
import React from 'react';
import LineCharts from '../../components/line';
import { templateLine } from '../template/line';

interface Props {
    width?: string
    height?: string
}

interface State {
    commonChartsData: Array<{ name: string, data: Array<number> }>
    commonXAxisData: Array<string>
}

class CommonLine extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            //折线图，柱状图数据
            commonChartsData: [{ name: "北京", data: [10, 80, 90, 40, 50, 70, 60] }, { name: "湖北", data: [20, 40, 80, 30, 30, 60, 40] }],
            commonXAxisData: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07'],
        }
    }

    componentDidMount(): void {
    }

    setLineNormalOption(): any {
        return templateLine;
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
            <div className="common-line">
                <div className="title">折线图（无option配置）</div>
                <LineCharts
                    width={this.props.width}
                    height={this.props.height}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
                <div className="title">折线图（除series的静态option配置）</div>
                <LineCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setLineNormalOption.bind(this)}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
                <div className="title">折线图（包含series的动态option配置）</div>
                <LineCharts
                    width={this.props.width}
                    height={this.props.height}
                    tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                    setOption={this.setLineDifficultOption.bind(this)}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
            </div>
        );
    }
}

export default CommonLine;