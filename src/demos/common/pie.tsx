import BaseComponent from '../../components/base-components'
import React from 'react';
import PieCharts from '../../components/pie';
import { templatePie } from '../../template/pie';

interface Props {

}

interface State {
    pieChartsData: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class CommonPie extends BaseComponent<Props, State> {

    chartsWidth = "400px";
    chartsHeight = "300px";

    constructor(props: Props) {
        super(props);
        this.state = {
            //饼状图数据
            pieChartsData: [{ name: "", data: [{ name: "湖北", value: 10 }, { name: "北京", value: 40 }] }],
        }
    }

    componentDidMount(): void {
    }

    setPieNormalOption(): any {
        return templatePie;
    }

    render() {
        return (
            <div className="common-pie">
                <div className="title">饼状图（无option配置）</div>
                <PieCharts id="pieCharts-easy"
                    width={this.chartsWidth}
                    height={this.chartsHeight}
                    seriesData={this.state.pieChartsData} />
                <div className="title">饼状图（除series的静态option配置）</div>
                <PieCharts id="pieCharts-normal"
                    width={this.chartsWidth}
                    height={this.chartsHeight}
                    setOption={this.setPieNormalOption.bind(this)}
                    seriesData={this.state.pieChartsData} />
            </div>
        );
    }
}

export default CommonPie;