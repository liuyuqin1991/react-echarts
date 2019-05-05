import React from 'react';
import BaseComponent from './base-components'
import { BaseChartsProp, BaseCharts } from './base-charts/base';

interface PieChartsProp extends BaseChartsProp {
    //必选（通用）：格式：[{name:"省份排行饼状图",data:[{name:"湖北",value:10},{name:"北京",value:40}]]
    seriesData: any
}

class PieCharts extends BaseComponent<PieChartsProp> {

    constructor(props: PieChartsProp) {
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
            legend: {},
            tooltip: { trigger: 'item' },
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
                        type: 'pie',
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

export default PieCharts;