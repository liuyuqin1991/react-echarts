import BaseComponent from '../base-components'
import React from 'react';
const Echarts = require('echarts');

interface BaseChartsProp {
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

    //初始化的Echarts对象
    echarts: any
    //系统配置的document.getElementById()
    canvas: HTMLDivElement

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

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.listenerFunc);
    }

    //创建图表
    createEcharts() {
        this.echarts = Echarts.init(this.canvas);
        let option = this.setSeriesCallBack();
        //为地图图表注册地图geo json数据
        if (!!this.props.regionJson) {
            Echarts.registerMap(option.series[0].map, this.props.regionJson);
        }
        this.setCommonConfig(option);
        this.renderEcharts(option);
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

    listenerFunc(): void {
        if (!!this.echarts) {
            this.echarts.resize();
        }
    }


    //通用化配置，渲染图表
    renderEcharts(option: any): void {
        if (option.hasOwnProperty("mapJson")) {
            delete option.mapJson;
        }
        this.echarts.setOption(option, true);
        //控制台打印配置，右键存储到全局对象，使用JSON.stringify()复制文本到VS code格式化后，粘贴到下面的网址进行调试：http://echarts.baidu.com/examples/editor.html?c=line-stack
        //注意修改网站图表div的背景色
        window.addEventListener('resize', this.listenerFunc);
    }

    render() {
        let { width, height } = this.props;
        return (
            <div ref={ref => this.canvas = ref} style={{ width: width || "100%", height: height || "100%", }}></div>
        );
    }
}

export { BaseCharts, BaseChartsProp };