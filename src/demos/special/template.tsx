import BaseComponent from '../../components/base-components'
import React from 'react';
const Echarts = require('echarts');

interface Props {
    width?: string
    height?: string
}

interface State {

}

class XXXCharts extends BaseComponent<Props, State> {

    canvas: HTMLDivElement;
    chartsTitle: string = "charts title";

    constructor(props: Props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(): void {
        // setInterval(() => {
        //     this.setState({
        //     });
        //     this.createEcharts();
        // }, 1500)
    }


    setOption() {
        let option = {};
        return option;
    }

    //创建图表
    createEcharts() {
        let charts = Echarts.init(this.canvas);
        let option = this.setOption();
        this.renderEcharts(charts, option);
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
                <div className="title">{this.chartsTitle}</div>
                <div ref={ref => this.canvas = ref} style={{ width: this.props.width || '400px', height: this.props.height || '300px', backgroundColor: "#131233" }}></div>
            </div>

        );
    }
}

export default XXXCharts;