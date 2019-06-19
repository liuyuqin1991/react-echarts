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
}

class BarDottedCharts extends BaseComponent<Props, State> {

    chratsTitle: string = "特殊图表-渐变虚线柱状图";

    constructor(props: Props) {
        super(props);
        this.state = {
            //折线图，柱状图数据
            commonChartsData: [{ name: "湖北", data: [20, 40, 80, 30, 30, 60, 40, 20, 90, 40, 10, 60] }],
            commonXAxisData: ['03-01', '03-02', '03-03', '03-04', '03-05', '03-06', '03-07', '03-08', '03-09', '03-10', '03-11', '03-12'],
        }
    }

    componentDidMount(): void {

    }


    setOption() {
        let option: any = Object.assign({}, templateBar);
        option.series = [{
            name: this.state.commonChartsData[0].name,
            type: 'bar',
            barWidth: 10,
            itemStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(65,105,225,1)' // 0% 处的颜色
                    }, {
                        offset: 0.5, color: 'rgba(65,105,225,0.7)' // 100% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(65,105,225,0.1)' // 100% 处的颜色 
                    }],
                    global: false // 缺省为 false
                }
            },
            z: 10,
            data: this.state.commonChartsData[0].data
        }, {
            name: 'dotted',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
                color: '#FFF' //与图表背景色一致
            },
            symbolRepeat: true,
            symbolSize: [12, 3],
            symbolMargin: 2,
            z: 11,
            data: this.state.commonChartsData[0].data
        }];
        return option;
    }

    setAxisTooltipFormatter(series: any) {
        let _html = "";
        if (series && series.length > 0) {
            _html += "<span class='tooltip name'>" + series[0].name + "</span>" + "：" + "<br>" +
                "<span class='tooltip value'>" + series[0].seriesName + "：" + series[0].value + "</span><br>";
        }
        return _html;
    }

    render() {
        return (
            <div>
                <div className="title">{this.chratsTitle}</div>
                <BarCharts
                    width={this.props.width}
                    height={this.props.height}
                    tooltipFormatter={this.setAxisTooltipFormatter.bind(this)}
                    setOption={this.setOption.bind(this)}
                    seriesData={this.state.commonChartsData}
                    xAxisData={this.state.commonXAxisData} />
            </div>

        );
    }
}

export default BarDottedCharts;