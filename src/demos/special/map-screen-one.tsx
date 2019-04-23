import BaseComponent from '../../components/base-components'
import React from 'react';
import MapCharts from '../../components/map';

import './map-screen-one.scss';

interface Props {
    width?: string
    height?: string
}

interface State {
    mapChartsDataByChina: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class MapScreenOneCharts extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            //地图数据（中国）
            mapChartsDataByChina: [{
                name: "中国", data: [
                    { name: "黑龙江", value: 10 },
                    { name: "西藏", value: 20 },
                    { name: "山东", value: 30 },
                    { name: "广东", value: 90 },
                    { name: "湖北", value: 30 },
                    { name: "吉林", value: 40 },
                    { name: "辽宁", value: 50 },
                    { name: "天津", value: 60 },
                    { name: "北京", value: 100 },
                    { name: "内蒙古", value: 20 },
                    { name: "河北", value: 12 },
                    { name: "上海", value: 45 },
                    { name: "河北", value: 76 },
                    { name: "河南", value: 2 },
                    { name: "山西", value: 65 },
                    { name: "陕西", value: 42 },
                    { name: "宁夏", value: 23 },
                    { name: "甘肃", value: 15 },
                    { name: "新疆", value: 32 },
                    { name: "青海", value: 88 },
                    { name: "西藏", value: 45 },
                    { name: "广西", value: 1 },
                    { name: "四川", value: 34 },
                    { name: "重庆", value: 23 },
                    { name: "贵州", value: 19 },
                    { name: "云南", value: 43 },
                    { name: "湖南", value: 53 },
                    { name: "福建", value: 33 },
                    { name: "江西", value: 50 },
                    { name: "浙江", value: 23 },
                    { name: "江苏", value: 54 },
                    { name: "安徽", value: 97 },
                    { name: "海南", value: 2 },
                    { name: "香港", value: 48 },
                    { name: "澳门", value: 24 },
                    { name: "南海诸岛", value: 0 },
                    { name: "台湾", value: 36 }
                ]
            }],
        }
    }

    componentDidMount(): void {
    }


    setMapNormalOption(): any {
        let option = {
            title: {
                show: true,
                left: 'center',
                top: '5px',
            },
            tooltip: {
                backgroundColor: 'rgba(35,49,90, 0.8)',
                borderColor: 'rgba(35,49,90, 0.8)',
                borderWidth: 1,
                padding: 10,
                textStyle: {
                    color: '#FFF'
                },
            },
            visualMap: {
                type: 'piecewise', // 定义为分段型视觉映射组件visualMap
                itemWidth: 22,
                itemHeight: 7,
                itemGap: 0,
                splitNumber: 6,
                textGap: 10,
                bottom: 150,
                left: 40,
                text: ['   高', '低   '],
                textStyle: {
                    color: '#92A7FD',
                    fontSize: 12,
                },
                inRange: {
                    symbol: 'rect',
                    color: ['#280069', '#28009E', '#3500CE', '#480BF3', '#486AFE', '#6991FF'],
                },
                orient: 'horizontal',
                calculable: true,
            },
            series: [
                {
                    type: 'map',
                    zoom: 1.1,
                    label: {
                        show: true,
                        color: '#92A7FD',
                        fontSize: 10,
                    },
                    top: '15%',
                    left: '8%',
                    itemStyle: {
                        color: 'transparent',
                        borderWidth: 2,
                        borderColor: '#5944ff',
                    },
                    emphasis: {
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            areaColor: '#778dff',
                            borderWidth: 2,
                            borderColor: '#5944ff',
                        },
                    },
                }
            ]
        };
        return option;
    }

    //通用化配置，渲染图表
    renderEcharts(charts: any, option: any): void {
        charts.setOption(option, true);
        //控制台打印配置，右键存储到全局对象，使用JSON.stringify()复制文本到VS code格式化后，粘贴到下面的网址进行调试：http://echarts.baidu.com/examples/editor.html?c=line-stack
        //注意修改网站图表div的背景色
        window.onresize = function () {
            charts.resize();
        };
    }

    render() {
        return (
            <div>
                <div className="map-screen-one">
                    <div className="box">
                        <div className="ring inner-ring"></div>
                        <div className="ring outer-ring"></div>
                    </div>
                    <MapCharts id="map-screen-one"
                        className="map-screen-one-charts"
                        width={this.props.width}
                        height={this.props.height}
                        setOption={this.setMapNormalOption.bind(this)}
                        regionType="country"
                        regionName="中国"
                        seriesData={this.state.mapChartsDataByChina} />
                    <div className="label">GMV</div>
                </div>
            </div>
        );
    }
}

export default MapScreenOneCharts;