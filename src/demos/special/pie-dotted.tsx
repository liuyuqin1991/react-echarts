import BaseComponent from '../../components/base-components'
import React from 'react';
import PieCharts from '../../components/pie';
import { templatePie } from '../template/pie';

interface Props {
    width?: string
    height?: string
}

interface State {
    pieChartsData: Array<{ name: string, data: Array<{ name: string, value: number }> }>
}

class CommonPie extends BaseComponent<Props, State> {

    chratsTitle: string = "特殊图表-虚线饼状图";

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
            <>
                <div className="title">{this.chratsTitle}</div>
                <PieCharts
                    width={this.props.width}
                    height={this.props.height}
                    setOption={this.setPieNormalOption.bind(this)}
                    seriesData={this.state.pieChartsData} />
            </>
        );
    }
}

export default CommonPie;