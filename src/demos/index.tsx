import React from 'react';
import ReactDom from 'react-dom';
import BaseComponent from '../components/base-components';
import CommonBar from '../demos/common/bar';
import CommonLine from '../demos/common/line';
import CommonScatter from '../demos/common/scatter';
import CommonMap from '../demos/common/map';
import CommonPie from '../demos/common/pie';
import BarRollingCharts from './special/bar-rolling';
import BarRollingTwoAxisCharts from './special/bar-rolling-two-axis';
import './index.scss';

interface Props {

}

interface State {
    pieChartsData: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class Demos extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
    }


    setAxisTooltipFormatter(series: any) {
        let _html = "";
        if (series && series.length > 0) {
            _html += "<span class='tooltip name'>" + series[0].name + "</span>" + "：" + "<br>";
            for (let i = 0; i < series.length; i++) {
                _html += "<span class='tooltip value'>" + series[i].seriesName + "：" + series[i].value + "</span><br>";
            }
        }
        return _html;
    }

    render() {
        return (
            <div className="content">
                <div className="content-tip">
                    说明：基础图表可以直接使用组件，特殊图表不能直接使用组件，详情见示例
                </div>
                <div className="content-charts">
                    <div className="charts line">
                        <CommonLine />
                    </div>
                    <div className="charts bar">
                        <CommonBar />
                        <div className="title">特殊图表-自动滚动翻转柱状图（单axis）</div>
                        <BarRollingCharts />
                        <div className="title">特殊图表-自动滚动翻转柱状图（双axis）</div>
                        <BarRollingTwoAxisCharts />
                    </div>
                    <div className="charts scatter">
                        <CommonScatter />
                    </div>
                    <div className="charts map">
                        <CommonMap />
                    </div>
                    <div className="charts pie">
                        <CommonPie />
                    </div>
                </div>
            </div>
        );
    }
}

export default Demos;

ReactDom.render(
    <Demos></Demos>,
    document.getElementById('root')
);