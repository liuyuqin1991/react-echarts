import React from 'react';
import BaseComponent from './base-components'
import { BaseChartsProp, BaseCharts } from './base-charts/base';

interface ScatterChartsProp extends BaseChartsProp {
    //必选（通用）：格式：[{name:"series1",data:[{name:"节点名称",value[1,2]},{name:"节点名称",value:[3,4]},{...},{...}]
    //如果需要在tooltip时显示更多的数据项，可以在节点对象里加属性，然后在tooltip中的params参数中选择该对象
    seriesData: any
}

class ScatterCharts extends BaseComponent<ScatterChartsProp> {

    constructor(props: ScatterChartsProp) {
        super(props);
    }

    componentWillMount() {

    }

    //series设置回调，在baseCharts中使用
    setSeriesDataFunc() {
        const { seriesData, setOption } = this.props;
        let legendData = [];
        let option: any = {
            series: [],
            xAxis: {},
            yAxis: {},
            legend: {},
            tooltip: {},
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
                        type: 'scatter',
                        data: seriesData[i].data,
                        name: seriesData[i].name,
                    })
                }
                legendData.push({
                    name: seriesData[i].name
                });
            }
        }
        option.legend.data = legendData;
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
                setSeriesDataFunc={this.setSeriesDataFunc.bind(this)}
                tooltipFormatter={tooltipFormatter}
            />
        );
    }
}

export default ScatterCharts;