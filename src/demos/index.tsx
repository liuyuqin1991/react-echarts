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
    chartsWidth: string
    chartsHeight: string
}

class Demos extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            chartsWidth: "400px",
            chartsHeight: "300px",
        }
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
                        <CommonLine width={this.state.chartsWidth} height={this.state.chartsHeight} />
                    </div>
                    <div className="charts bar">
                        <CommonBar width={this.state.chartsWidth} height={this.state.chartsHeight} />
                        <div className="title">特殊图表-自动滚动翻转柱状图（单axis）</div>
                        <BarRollingCharts width={this.state.chartsWidth} height={this.state.chartsHeight} />
                        <div className="title">特殊图表-自动滚动翻转柱状图（双axis）</div>
                        <BarRollingTwoAxisCharts width={this.state.chartsWidth} height={this.state.chartsHeight} />
                    </div>
                    <div className="charts scatter">
                        <CommonScatter width={this.state.chartsWidth} height={this.state.chartsHeight} />
                    </div>
                    <div className="charts map">
                        <CommonMap width={this.state.chartsWidth} height={this.state.chartsHeight} />
                    </div>
                    <div className="charts pie">
                        <CommonPie width={this.state.chartsWidth} height={this.state.chartsHeight} />
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