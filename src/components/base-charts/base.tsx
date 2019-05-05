import BaseComponent from '../base-components'
import React from 'react';
const Echarts = require('echarts');

interface BaseChartsProp {
    //必选（通用）：id，charts组件id，必须值
    id: string
    //可选（通用）：图表的宽和高，不填默认长宽100%
    width?: string
    height?: string
    //可选（通用）：图表标题与副标题
    title?: string
    subTitle?: string
    //必选（通用）：初始化后加载数据回调
    setSeriesDataFunc?: Function
    //可选（通用）：option回调
    setOption?: Function
    //可选（通用），图表的提示回调
    tooltipFormatter?: Function
    //可选（地图专用），地区名称的GEO Json文件
    regionJson?: string
}

class BaseCharts extends BaseComponent<BaseChartsProp> {

    constructor(props: BaseChartsProp) {
        super(props);
    }

    componentDidMount(): void {
        this.createEcharts();
    }

    componentDidUpdate(): boolean {
        this.createEcharts();
        return true;
    }

    //创建图表
    createEcharts() {
        const { id } = this.props;
        if (!!id) {
            let charts = Echarts.init(document.getElementById(id));
            let option = this.setSeriesCallBack();
            //为地图图表注册地图geo json数据
            if (!!this.props.regionJson) {
                Echarts.registerMap(option.series[0].map, this.props.regionJson);
            }
            this.setCommonConfig(option);
            this.renderEcharts(charts, option);
        }
    }

    //series个性化配置回调函数
    setSeriesCallBack(): any {
        if (this.props.setSeriesDataFunc && this.props.setSeriesDataFunc instanceof Function) {
            return this.props.setSeriesDataFunc();
        }
    }

    //option通用化配置
    setCommonConfig(option: any) {
        //设置标题
        if (option.title) {
            option.title.text = this.props.title || "";
            option.title.subtext = this.props.subTitle || "";
        }
        else {
            option.title = {
                text: this.props.title || "",
                subtext: this.props.subTitle || "",
            }
        }
        //提示框回调
        if (this.props.tooltipFormatter && this.props.tooltipFormatter instanceof Function) {
            if (option.tooltip) {
                option.tooltip.formatter = this.props.tooltipFormatter;
            }
            else {
                option.tooltip = {
                    formatter: this.props.tooltipFormatter
                }
            }
        }
    }


    //通用化配置，渲染图表
    renderEcharts(charts: any, option: any): void {
        if (option.hasOwnProperty("mapJson")) {
            delete option.mapJson;
        }
        charts.setOption(option, true);
        //控制台打印配置，右键存储到全局对象，使用JSON.stringify()复制文本到VS code格式化后，粘贴到下面的网址进行调试：http://echarts.baidu.com/examples/editor.html?c=line-stack
        //注意修改网站图表div的背景色
        window.addEventListener('resize', () => charts.resize());
    }

    render() {
        let { id, width, height } = this.props;
        return (
            <div id={id} style={{ width: width || "100%", height: height || "100%", }}></div>
        );
    }
}

export { BaseCharts, BaseChartsProp };