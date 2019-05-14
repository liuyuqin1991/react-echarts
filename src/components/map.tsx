import React from 'react';
import BaseComponent from './base-components'
import { BaseChartsProp, BaseCharts } from './base-charts/base';

interface MapChartsProp extends BaseChartsProp {
    //必须：数据对象
    seriesData: any
    //可选（地图专用），Echarts装载map完成后配置option的回调函数
    setOptionAfterLoadMap?: Function
    //必须（地图专用），地区类型，可选类型为："country","province","city"，对应为：国家，省份，城市
    regionType: string
    //可选（地图专用）：地区名称，为地区类型下对应的省市县名称（PS：地区名称必须与地区json文件名相同），以中国为例：
    //展示中国地图：regionType："country"，regionName:"中国"
    //展示省份地图：regionType:"province"，regionName:"北京"
    regionName?: string
}

interface MapChartsState {
    regionJson?: any,
}

class MapCharts extends BaseComponent<MapChartsProp, MapChartsState> {

    //地图left和top的偏移量：因为某些省份显示不居中，需要根据json一个个控制省份居中
    mapOffset: any = {
        "中国": { left: "10%", top: "15%" },
        "北京": { left: "18%", top: "10%" },
        "上海": { left: "15%", top: "10%" },
        "天津": { left: "23%", top: "12%" },
        "重庆": { left: "18%", top: "12%" },
        "河北": { left: "27%", top: "12%" },
        "山西": { left: "30%", top: "12%" },
        "河南": { left: "15%", top: "12%" },
        "辽宁": { left: "10%", top: "12%" },
        "吉林": { left: "10%", top: "20%" },
        "黑龙江": { left: "15%", top: "12%" },
        "内蒙古": { left: "10%", top: "12%" },
        "江苏": { left: "15%", top: "12%" },
        "山东": { left: "10%", top: "15%" },
        "安徽": { left: "25%", top: "12%" },
        "浙江": { left: "23%", top: "12%" },
        "福建": { left: "23%", top: "12%" },
        "湖北": { left: "10%", top: "13%" },
        "湖南": { left: "23%", top: "12%" },
        "广东": { left: "15%", top: "12%" },
        "广西": { left: "12%", top: "12%" },
        "江西": { left: "30%", top: "12%" },
        "四川": { left: "15%", top: "12%" },
        "海南": { left: "35%", top: "12%" },
        "贵州": { left: "15%", top: "12%" },
        "云南": { left: "25%", top: "12%" },
        "西藏": { left: "10%", top: "25%" },
        "陕西": { left: "27%", top: "15%" },
        "甘肃": { left: "10%", top: "12%" },
        "青海": { left: "10%", top: "20%" },
        "宁夏": { left: "25%", top: "12%" },
        "新疆": { left: "15%", top: "12%" },
        "台湾": { left: "30%", top: "12%" },
        "香港": { left: "12%", top: "12%" },
        "澳门": { left: "30%", top: "12%" },
    };

    constructor(props: MapChartsProp) {
        super(props);
        this.state = {
            regionJson: null
        };
    }

    onChangeRegion(callback: Function) {
        //加载地图类型及地图geoJson数据
        switch (this.props.regionType) {
            case "city": {
                break;
            }
            case "province": {
                import('../components/map-json/provinceJson/' + this.props.regionName + '.json').then(mapJson => {
                    if (callback && callback instanceof Function) {
                        callback(this.props.regionName, mapJson);
                    }
                });
                break;
            }
            default: {
                import('../components/map-json/countryJson/china.json').then(mapJson => {
                    if (callback && callback instanceof Function) {
                        callback(this.props.regionName, mapJson);
                    }
                });
                break;
            }
        }
    }

    //series设置回调，供BaseCharts回调，设置series的map，data，以及echarts对象的左击，右击事件
    setSeriesDataFunc() {
        const { seriesData, regionName, setOptionAfterLoadMap, setOption } = this.props;
        let option: any = {
            series: [],
            visualMap: {
                min: 0,
                max: 0,
            },
            tooltip: { trigger: 'item' },
        };
        if (setOption && setOption instanceof Function) {
            option = Object.assign(option, setOption());
        }

        //设置VisualMapMinAndMax
        let min = 0, max = 0;
        if (seriesData && seriesData.length > 0) {
            //遍历series
            for (let i = 0; i < seriesData.length; i++) {
                //遍历每个series中的data
                for (let j = 0; j < seriesData[i].data.length; j++) {
                    if (seriesData[i].data[j].value > max) {
                        max = seriesData[i].data[j].value;
                    }
                    if (seriesData[i].data[j].value < min) {
                        min = seriesData[i].data[j].value
                    }
                }
                //已存在模板
                if (option.series[i]) {
                    option.series[i].name = seriesData[i].name;
                    option.series[i].data = seriesData[i].data;
                    option.series[i].map = regionName;
                    option.series[i].left = this.mapOffset[regionName].left;
                    option.series[i].top = this.mapOffset[regionName].top;
                }
                //默认
                else {
                    option.series.push({
                        type: 'map',
                        name: seriesData[i].name,
                        data: seriesData[i].data,
                        map: regionName,
                        left: this.mapOffset[regionName].left,
                        top: this.mapOffset[regionName].top
                    })
                }
            }
        }
        option.visualMap.min = min;
        option.visualMap.max = max;
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
                onChangeRegion={this.onChangeRegion.bind(this)}
                setOptionAfterLoadMap={this.props.setOptionAfterLoadMap}
            />
        );
    }
}

export default MapCharts;