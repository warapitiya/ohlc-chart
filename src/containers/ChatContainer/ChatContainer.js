/**
 * Created by warapitiya on 2019-05-01.
 */
import React from 'react';
import {eachDay} from 'date-fns'

import ListGroup from "../../components/ListGroup/ListGroup";
import OHLCChart from "../../components/OHLCChart/OHLCChart";

function ChatContainer() {

  const datesRange = eachDay(
    new Date(2019, 5, 2),
    new Date(2019, 6, 30 - 18)
  );

  const a = [   // Y: [Open, High ,Low, Close]
    [184.76, 186.28, 184.67, 185.69],
    [185.55, 185.76, 184.12, 184.37],
    [184.71, 185.45, 184.20, 184.51],
    [184.66, 186.09, 183.92, 185.98],
    [186.47, 187.65, 185.90, 186.37],
    [186.22, 187.64, 185.96, 186.22],
    [186.20, 186.22, 183.82, 184.29],
    [183.64, 184.20, 182.01, 182.25],
    [182.48, 182.55, 180.91, 181.22],
    [182.00, 183.00, 181.52, 182.56],
    [182.40, 182.71, 181.24, 182.35],
    [181.90, 182.81, 181.56, 182.26],
    [182.04, 183.61, 181.79, 183.60],
    [184.12, 184.47, 182.36, 182.82],
    [182.59, 182.67, 181.40, 181.55],
    [181.92, 182.25, 181.00, 182.14],
    [181.50, 183.00, 180.65, 180.88],
    [180.25, 180.97, 180.06, 180.72],
    [180.87, 181.37, 179.27, 180.37],
    [179.77, 182.46, 179.66, 181.71],
    [181.33, 181.93, 180.26, 181.27],
    [181.70, 187.27, 181.70, 186.35],
    [186.35, 188.99, 186.17, 188.39],
    [188.39, 188.81, 187.35, 188.53],
    [187.61, 188.27, 187.44, 188.04],
    [187.65, 188.08, 186.37, 187.22],
    [187.68, 188.90, 186.89, 188.42],
    [186.44, 188.05, 186.21, 187.70],
    [187.73, 188.35, 186.70, 188.00],
    [188.53, 190.44, 188.53, 189.86],
    [189.38, 190.08, 188.21, 188.49],
    [192.20, 193.36, 190.76, 192.36],
    [192.36, 195.95, 192.00, 192.49],
    [191.96, 193.44, 190.00, 192.50],
    [191.30, 191.70, 189.25, 190.85],
    [191.56, 194.72, 191.56, 194.09],
    [194.11, 194.90, 193.57, 193.63],
    [193.95, 195.62, 193.75, 195.24],
    [195.30, 195.90, 193.79, 194.40],
    [194.30, 196.40, 193.65, 195.78],
    [195.30, 195.89, 194.54, 194.57],
    [195.20, 195.99, 192.90, 194.00]
  ];

  // Open - high - low - close
  const columns = datesRange.map((d, i) => {
    return [d, ...a[i]];
  });

  const stocks = [
    {
      symbol: "AAPL"
    },
    {
      symbol: "MSFT"
    },
    {
      symbol: "FB"
    },
    {
      symbol: "GOOGL"
    },
    {
      "Company Name": "EnteroMedics Inc.",
      symbol: "ETRM",
      "Test Issue": "N"
    },
    {
      "Company Name": "iShares MSCI Europe Financials Sector Index Fund",
      "Financial Status": "N",
      "Market Category": "G",
      "Round Lot Size": 100,
      "Security Name": "iShares MSCI Europe Financials Sector Index Fund",
      symbol: "EUFN",
      "Test Issue": "N"
    },
    {
      "Company Name": "iShares MSCI Emerging Markets Value Index Fund",
      "Financial Status": "N",
      "Market Category": "G",
      "Round Lot Size": 100,
      "Security Name": "iShares MSCI Emerging Markets Value Index Fund",
      symbol: "EVAL",
      "Test Issue": "N"
    },
    {
      "Company Name": "Lombard Medical, Inc.",
      "Financial Status": "N",
      "Market Category": "G",
      "Round Lot Size": 100,
      "Security Name": "Lombard Medical, Inc. - Ordinary Shares",
      symbol: "EVAR",
      "Test Issue": "N"
    },
  ];

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup stockItems={stocks}/>
      </div>
      <div className="col-md-9 py-2">
        <OHLCChart columns={columns}/>
      </div>
    </div>
  );
}

export default ChatContainer;
