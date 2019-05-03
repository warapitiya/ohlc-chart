/**
 * Created by warapitiya on 2019-05-01.
 */

import React, {Component} from 'react';
import * as PropTypes from "prop-types";

import './OHLCChart.css'

class OHLCChart extends Component {
  constructor(props) {
    super(props);
    this.chartBounds = React.createRef();
    this.state = {
      width: 600,
      height: 348,
      monthNames: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ]
    };
  }

  componentDidMount() {
    const {width, height} = this.getChartBounds();
    this.setState({
      width,
      height
    });
    window.addEventListener('resize', this.onResize);
  }

  /**
   * Get Rect bounds
   * @returns {ClientRect | DOMRect}
   */
  getChartBounds = () => {
    return this.chartBounds.current.getBoundingClientRect();
  };

  /**
   * On window resize change SVG size
   */
  onResize = () => {
    const {width, height} = this.getChartBounds();
    this.setState({
      width,
      height
    });
  };

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  /**
   * Calculate ratio
   * @param val
   * @param maxHeightNumber
   * @param minHeightNumber
   * @param height
   * @param heightTopPadding
   * @returns {number}
   */
  calculate = (val, maxHeightNumber, minHeightNumber, height, heightTopPadding) => {
    const b = height - heightTopPadding;
    const ratio = (b / (maxHeightNumber - minHeightNumber)) * val;
    return b - ratio;
  };

  color = (val1, val2) => {
    return val1 < val2 ? 'green' : 'red';
  };

  render() {
    let {columns, scale} = this.props;
    let {width, height, monthNames} = this.state;
    const yAxisGap = (width - 10) / columns.length;
    let months = columns.reduce((group, column) => {
      group.add(monthNames[new Date(column[0]).getMonth()]);
      return group;
    }, new Set());

    const dataSet = columns.reduce((group, column) => {
      const [d, ...args] = column;
      group = [...group, ...args];
      return group;
    }, []).sort();

    const maxHeightNumber = Math.ceil(Math.max(...dataSet) / scale) * scale;
    const minHeightNumber = Math.floor(Math.min(...dataSet) / scale) * scale;
    let yAxis = [minHeightNumber];

    debugger;
    const heightTopPadding = 10;
    const heightBottomPadding = 20;
    const actualHeight = height - heightBottomPadding - heightTopPadding;

    const totYScale = (maxHeightNumber - minHeightNumber) / scale;
    const xAxisGap = (actualHeight - heightTopPadding) / totYScale;

    for (let i = 1; i <= totYScale; i++) {
      yAxis = [...yAxis, scale * i]
    }

    months = Array.from(months);
    const widthDistance = (width - 150) / months.length;

    return (
      <div ref={this.chartBounds}>
        <svg className="graph"
             style={{width: width, height: height}}
             aria-labelledby="title" role="img">
          <g className="grid x-grid" id="xGrid">
            <line x1="40" x2="40" y1={heightTopPadding} y2={actualHeight} strokeWidth="3" stroke="black"/>
            {columns.map((x, i) => {
              const colorStyle = this.color(x[1], x[4]);
              return (
                <g key={i}>
                  // Main line
                  <line
                    x1={40 + (yAxisGap * (i + 1))}
                    x2={40 + (yAxisGap * (i + 1))}
                    y1={heightTopPadding}
                    y2={actualHeight}/>
                  // Middle Stroke
                  <line x1={40 + (yAxisGap * (i + 1))}
                        x2={40 + (yAxisGap * (i + 1))}
                        y1={10 + this.calculate(x[2], maxHeightNumber, minHeightNumber, actualHeight, heightTopPadding)}
                        y2={10 + this.calculate(x[3], maxHeightNumber, minHeightNumber, actualHeight, heightTopPadding)}
                        strokeWidth="3"
                        stroke={colorStyle}/>
                  // Close
                  <line x1={40 + (yAxisGap * (i + 1))}
                        x2={45 + (yAxisGap * (i + 1))}
                        y1={this.calculate(x[4], maxHeightNumber, minHeightNumber, actualHeight, 0)}
                        y2={this.calculate(x[4], maxHeightNumber, minHeightNumber, actualHeight, 0)}
                        strokeWidth="3" stroke={colorStyle}/>
                  // Open
                  <line x1={35 + (yAxisGap * (i + 1))}
                        x2={40 + (yAxisGap * (i + 1))}
                        y1={this.calculate(x[1], maxHeightNumber, minHeightNumber, actualHeight, 0)}
                        y2={this.calculate(x[1], maxHeightNumber, minHeightNumber, actualHeight, 0)}
                        strokeWidth="3" stroke={colorStyle}/>
                </g>
              )
            })}

          </g>
          <g className="grid y-grid" id="yGrid">
            <line x1="35" x2={width - 10} y1={actualHeight} y2={actualHeight} strokeWidth="3" stroke="black"/>
          </g>
          <g className="labels x-labels">
            {months && months.map((m, i) => {
              return <text key={i} x={widthDistance * (i + 1)} y={height - 10}>{m}</text>
            })}
          </g>
          <g className="labels y-labels">
            {yAxis && yAxis.reverse().map((d, i) => {
              return (
                <g key={i}>
                  <text x="30" y={10 + (i * xAxisGap)}>{d}</text>
                  <line x1="35"
                        x2="40"
                        y1={10 + (i * xAxisGap)}
                        y2={10 + (i * xAxisGap)}
                        strokeWidth="3" stroke="black"/>

                </g>
              )
            })}
          </g>
        </svg>
      </div>
    );
  }
}

OHLCChart.propTypes = {
  columns: PropTypes.array,
  width: PropTypes.any,
  height: PropTypes.any
};

export default OHLCChart;
