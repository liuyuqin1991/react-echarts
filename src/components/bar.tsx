import React from 'react';
import BaseComponent from './base-components'
import { BaseChartsProp, BaseCharts } from './base-charts/base';

interface BarChartsProp extends BaseChartsProp {
    //必选（通用）：格式：[{name:"北京",data:[10,20,30,40]},{name:"湖北",data:[30,50,70,90]}]
    seriesData: any
    //x轴数据，例如：['星期一', '星期二', '星期三', '星期四']
    xAxisData: Array<string>
    //是否翻转
    isReverse?: boolean
}

class BarCharts extends BaseComponent<BarChartsProp> {

    constructor(props: BarChartsProp) {
        super(props);
    }

    componentWillMount() {
    }

    //series设置回调，在baseCharts中使用
    setSeriesDataFunc() {
        const { seriesData, setOption, xAxisData } = this.props;
        let legendData = [];
        let option: any = {
            series: [],
            xAxis: {
                type: 'category',
            },
            yAxis: {},
            legend: {},
            tooltip: { trigger: 'axis' },
        };
        if (setOption && setOption instanceof Function) {
            option = Object.assign(option, setOption());
        }
        if (seriesData && seriesData.length > 0) {
            for (let i = 0; i < seriesData.length; i++) {
                //已存在模板
                if (option.series && option.series[i]) {
                    option.series[i].name = seriesData[i].name;
                    option.series[i].data = seriesData[i].data;
                }
                //默认
                else {
                    option.series.push({
                        type: 'bar',
                        data: seriesData[i].data,
                        name: seriesData[i].name,
                    })
                }
                legendData.push({
                    name: seriesData[i].name,
                })
            }
        }
        option.legend.data = legendData;
        if (this.props.isReverse) {
            option.yAxis.data = xAxisData;
        }
        option.xAxis.data = xAxisData;
        return option;
    }

    render() {
        let { width, height, title, subTitle, tooltipFormatter } = this.props;
        return (
            <BaseCharts
                width={width}
                height={height}
                title={title}
                subTitle={subTitle}
                tooltipFormatter={tooltipFormatter}
                setSeriesDataFunc={this.setSeriesDataFunc.bind(this)}
            />
        );
    }
}

export default BarCharts;