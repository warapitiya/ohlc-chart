/**
 * Created by warapitiya on 2019-05-01.
 */

import React, {Component} from 'react';
import * as PropTypes from "prop-types";
import {format} from "date-fns";

import './OHLCChart.css'

class OHLCChart extends Component {
  constructor(props) {
    super(props);
    this.chartBounds = React.createRef();
    this.state = {
      width: 600,
      height: 348,
    };
  }

  componentDidMount() {
    const rect = this.chartBounds.current.getBoundingClientRect();
    this.setState({
      width: rect.width,
      height: rect.height
    })
  }

  render() {
    let {columns} = this.props;
    let {width, height} = this.state;
    const yAxisGap = width / columns.length;
    let months = columns.reduce((group, column) => {
      group.add(format(column[0], "MMM"));
      return group;
    }, new Set());

    const dataSet = columns.reduce((group, column) => {
      const [d, ...args] = column;
      group = [...group, ...args];
      return group;
    }, []).sort();

    const maxHeightNumber = Math.ceil(Math.max(...dataSet) / 5) * 5;
    const minHeightNumber = Math.floor(Math.min(...dataSet) / 5) * 5;
    const heightDiff = 5;
    let yAxis = [];

    for (let i = minHeightNumber; i <= maxHeightNumber; i += heightDiff) {
      yAxis = [...yAxis, i];
    }

    const generalHeight = height - 30;
    const heightPadding = 10;

    const xAxisGap = generalHeight / yAxis.length;

    months = Array.from(months);
    const widthDistance = (width - 150) / months.length;

    function gen(val) {
      const a = height / (maxHeightNumber - minHeightNumber);
      return ((maxHeightNumber - val) * a) - 30;
    }

    function color(val1, val2) {
      return val1 < val2 ? 'green' : 'red';
    }

    return (
      <div ref={this.chartBounds}>
        <svg className="graph"
             style={{width: width, height: height}}
             aria-labelledby="title" role="img">
          <g className="grid x-grid" id="xGrid">
            <line x1="40" x2="40" y1={heightPadding} y2={generalHeight} strokeWidth="3" stroke="black"/>
            {columns.map((x, i) => {
              const colorStyle = color(x[1], x[4]);
              return (
                <g key={i}>
                  // Main line
                  <line
                    x1={40 + (yAxisGap * (i + 1))}
                    x2={40 + (yAxisGap * (i + 1))}
                    y1={heightPadding}
                    y2={generalHeight}/>
                  // Middle Stroke
                  <line x1={40 + (yAxisGap * (i + 1))}
                        x2={40 + (yAxisGap * (i + 1))}
                        y1={gen(x[2])}
                        y2={gen(x[3])}
                        strokeWidth="3"
                        stroke={colorStyle}/>
                  // Close (TOP)
                  <line x1={40 + (yAxisGap * (i + 1))}
                        x2={45 + (yAxisGap * (i + 1))}
                        y1={gen(x[4])}
                        y2={gen(x[4])}
                        strokeWidth="3" stroke={colorStyle}/>
                  // Open (BOTTOM)
                  <line x1={35 + (yAxisGap * (i + 1))}
                        x2={40 + (yAxisGap * (i + 1))}
                        y1={gen(x[1])}
                        y2={gen(x[1])}
                        strokeWidth="3" stroke={colorStyle}/>
                </g>
              )
            })}

          </g>
          <g className="grid y-grid" id="yGrid">
            <line x1="35" x2={width} y1={height - 30} y2={height - 30} strokeWidth="3" stroke="black"/>
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
                  <text x="30" y={heightPadding + (i * xAxisGap)}>{d}</text>
                  <line x1="35" x2="40"
                        y1={heightPadding + (i * xAxisGap)}
                        y2={heightPadding + (i * xAxisGap)}
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
