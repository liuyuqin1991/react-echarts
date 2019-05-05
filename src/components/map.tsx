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
    //展示中国地图：regionType："china"，regionName:"中国"
    //展示省份地图：regionType:"province"，regionName:"北京"
    regionName?: string
}

interface MapChartsState {
    regionJson?: any,
}

class MapCharts extends BaseComponent<MapChartsProp, MapChartsState> {

    constructor(props: MapChartsProp) {
        super(props);
        this.state = {
            regionJson: null
        };
    }

    componentWillMount() {
        let { regionType, regionName } = this.props;
        //加载地图类型及地图geoJson数据
        switch (regionType) {
            case "city": {
                break;
            }
            case "province": {
                if (!!regionName) {
                    import('../components/map-json/provinceJson/' + regionName + '.json').then(mapJson => {
                        this.setState({
                            regionJson: mapJson
                        })
                    });
                    break;
                }
            }
            default: {
                import('../components/map-json/countryJson/china.json').then(mapJson => {
                    this.setState({
                        regionJson: mapJson
                    })
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
                }
                //默认
                else {
                    option.series.push({
                        type: 'map',
                        name: seriesData[i].name,
                        data: seriesData[i].data,
                        map: regionName,
                    })
                }
            }
        }
        option.visualMap.min = min;
        option.visualMap.max = max;
        //设置加载地图后的个性化回调方法
        if (setOptionAfterLoadMap && setOptionAfterLoadMap instanceof Function) {
            option = setOptionAfterLoadMap(option, this.state.regionJson);
        }
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
                regionJson={this.state.regionJson}
            />
        );
    }
}

export default MapCharts;