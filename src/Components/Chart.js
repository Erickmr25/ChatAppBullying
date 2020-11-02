import React, {Component} from 'react';
import {  Bar, Line, Pie  } from 'react-chartjs-2'

class Chart extends Component {
    constructor(props){
        super(props);
            this.state = {
                charData: {
                    labels: ['No Activos', 'Activos'],
                    datasets: [
                        {
                            label: 'Popolutation',
                            data: [
                                1,
                                2,
                                3,
                                4,
                                5
                            ],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(153, 102, 255, 0.6)',
                                'rgba(255, 159, 64, 0.6)',
                                'rgba(75, 99, 132, 0.6)',
                            ]
                        }
                    ]
                }
            }
        }


    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'
    }

    render() {
        return (
            <div className="chart">
                <Bar
                    data={this.state.charData}
                    options={{
                        title:{
                            display: this.props.displayTitle,
                            text: 'Usuarios que han hecho uso de la aplicación.',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;