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
    markPointData: Array<any>
    markPointDataMin: number
    markPointDataMax: number
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
            //散点数据（省市）
            markPointData: [
                { name: '海门', coord: [121.15, 31.89], value: 20 },
                { name: "鄂尔多斯", coord: [109.781327, 39.608266], value: 30 },
                { name: "舟山", coord: [122.207216, 29.985295], value: 40 },
                { name: "齐齐哈尔", coord: [123.97, 47.33], value: 10 },
                { name: "盐城", coord: [120.13, 33.38], value: 5 },
                { name: "赤峰", coord: [118.87, 42.28], value: 25 },
                { name: "青岛", coord: [120.33, 36.07], value: 35 },
                { name: "乳山", coord: [121.52, 36.89], value: 74 },
                { name: "金昌", coord: [102.188043, 38.520089], value: 42 },
                { name: "泉州", coord: [118.58, 24.93], value: 39 },
                { name: "南通", coord: [121.05, 32.08], value: 27 },
                { name: "拉萨", coord: [91.11, 29.97], value: 76 },
                { name: "云浮", coord: [112.02, 22.93], value: 19 },
                { name: "梅州", coord: [116.1, 24.55], value: 78 },
                { name: "上海", coord: [121.48, 31.22], value: 53 },
                { name: "攀枝花", coord: [101.718637, 26.582347], value: 40 },
                { name: "承德", coord: [117.93, 40.97], value: 90 },
                { name: "厦门", coord: [118.1, 24.46], value: 78 },
                { name: "汕尾", coord: [115.375279, 22.786211], value: 23 },
                { name: "潮州", coord: [116.63, 23.68], value: 11 },
                { name: "丹东", coord: [124.37, 40.13], value: 99 },
                { name: "太仓", coord: [121.1, 31.45], value: 88 },
                { name: "曲靖", coord: [103.79, 25.51], value: 77 },
                { name: "福州", coord: [119.3, 26.08], value: 33 },
                { name: "瓦房店", coord: [121.979603, 39.627114], value: 12 },
                { name: "洛阳", coord: [112.44, 34.7], value: 54 },
                { name: "秦皇岛", coord: [119.57, 39.95], value: 70 },
                { name: "株洲", coord: [113.16, 27.83], value: 10 },
                { name: "石家庄", coord: [114.48, 38.03], value: 25 },
                { name: "莱芜", coord: [117.67, 36.19], value: 35 },
                { name: "常德", coord: [111.69, 29.05], value: 12 },
                { name: "保定", coord: [115.48, 38.85], value: 68 },
                { name: "湘潭", coord: [112.91, 27.87], value: 75 },
                { name: "金华", coord: [119.64, 29.12], value: 14 },
                { name: "岳阳", coord: [113.09, 29.37], value: 12 },
                { name: "长沙", coord: [113, 28.21], value: 24 },
                { name: "衢州", coord: [118.88, 28.97], value: 67 },
                { name: "廊坊", coord: [116.7, 39.53], value: 12 },
                { name: "菏泽", coord: [115.480656, 35.23375], value: 34 },
                { name: "合肥", coord: [117.27, 31.86], value: 30 },
                { name: "武汉", coord: [114.31, 30.52], value: 50 }
            ],
            markPointDataMin: 0,
            markPointDataMax: 100,
        }
    }

    componentDidMount(): void {
    }

    setPointSize(value: number) {
        const max = this.state.markPointDataMax;
        const min = this.state.markPointDataMin
        let per = (max - min) / 4;
        for (let i = 0; i < 4; i++) {
            if (value >= min + per * i && value <= min + per * (i + 1)) {
                return 5 + (3 * i);
            }
        }
        return 30;
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
                    roam: true,
                    scaleLimit: {
                        min: 1.1,
                        max: 3
                    },
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
                    markPoint: {
                        symbol: 'circle',
                        symbolSize: (value: any, params: any) => {
                            return this.setPointSize(value);
                        },
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: '#3AFFFF',
                        },
                        data: this.state.markPointData,
                        tooltip: function (params: any) {
                            return "111";
                        },
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
                <div className="title">特殊图表-大屏地图-样式1</div>
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
                    <div className="label gmv">GMV</div>
                    <div className="label store">成交门店数</div>
                    <div className="store-point-view">
                        <div className="level-label">低</div>
                        <div className="store-point point-1"></div>
                        <div className="store-point point-2"></div>
                        <div className="store-point point-3"></div>
                        <div className="store-point point-4"></div>
                        <div className="level-label">高</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MapScreenOneCharts;
