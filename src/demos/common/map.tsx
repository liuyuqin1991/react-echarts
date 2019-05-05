import BaseComponent from '../../components/base-components'
import React from 'react';
import MapCharts from '../../components/map';
import { templateMap } from '../template/map';

interface Props {
    width?: string
    height?: string
}

interface State {
    mapChartsDataByChina: Array<{ name: string, data: Array<{ name: string, value: number }> }>
    mapChartsDataByHubei: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class CommonMap extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            //地图数据（中国）
            mapChartsDataByChina: [{ name: "中国", data: [{ name: "黑龙江", value: 10 }, { name: "西藏", value: 20 }, { name: "山东", value: 30 }, { name: "广东", value: 40 }, { name: "湖北", value: 50 }] }],
            //地图数据（湖北）
            mapChartsDataByHubei: [{ name: "湖北", data: [{ name: "武汉市", value: 10 }, { name: "恩施州", value: 20 }, { name: "荆门市", value: 30 }, { name: "黄冈市", value: 40 }, { name: "襄阳市", value: 50 }] }],
        }
    }

    componentDidMount(): void {
    }

    setMapNormalOption(): any {
        return templateMap;
    }

    setOptionAfterLoadMap(option: any, mapJson: any): any {
        if (!!mapJson) {
            let markPoints: any[] = [];
            let seriesData = this.state.mapChartsDataByChina;
            for (let p of mapJson.features) {
                if (seriesData[0] && seriesData[0].data && seriesData[0].data[0].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 13,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(245,144,110,1)',
                            borderWidth: 15,
                            borderColor: 'rgba(245,144,110,0.4)',
                        },
                    });
                }
                else if (seriesData[0] && seriesData[0].data && seriesData[0].data[1].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 10,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(255,216,77,1)',
                            borderWidth: 12,
                            borderColor: 'rgba(255,216,77,0.4)',
                        },
                    });
                }
                else if (seriesData[0] && seriesData[0].data && seriesData[0].data[2].name.indexOf(p.properties.name) > -1) {
                    markPoints.push({
                        coord: p.properties.cp,
                        symbol: 'circle',
                        symbolSize: 7,
                        lebel: {
                            show: false,
                        },
                        itemStyle: {
                            color: 'rgba(194,228,92,1)',
                            borderWidth: 9,
                            borderColor: 'rgba(194,228,92,0.4)',
                        },
                    });
                }
            }
            option.series[0].markPoint = {
                show: true,
                symbolSize: 20,
                itemStyle: {
                    color: 'blue',
                },
                data: markPoints
            };
        }
        return option;
    }

    render() {
        return (
            <div className="common-map">
                <div className="title">全国地图（无option配置）</div>
                <MapCharts
                    width={this.props.width}
                    height={this.props.height}
                    regionType="country"
                    regionName="中国"
                    seriesData={this.state.mapChartsDataByChina} />
                <div className="title">湖北省地图（无option配置）</div>
                <MapCharts
                    width={this.props.width}
                    height={this.props.height}
                    regionType="province"
                    regionName="湖北"
                    seriesData={this.state.mapChartsDataByHubei} />
                <div className="title">全国地图（除series的option静态配置）</div>
                <MapCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setMapNormalOption.bind(this)}
                    regionType="country"
                    regionName="中国"
                    seriesData={this.state.mapChartsDataByChina} />
                <div className="title">全国地图（包含加载地图后对option再配置）</div>
                <MapCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setMapNormalOption.bind(this)}
                    setOptionAfterLoadMap={this.setOptionAfterLoadMap.bind(this)}
                    regionType="country"
                    regionName="中国"
                    seriesData={this.state.mapChartsDataByChina} />
            </div>
        );
    }
}

export default CommonMap;