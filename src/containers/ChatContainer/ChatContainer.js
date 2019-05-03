/**
 * Created by warapitiya on 2019-05-01.
 */
import React, {useEffect, useState} from 'react';

import ListGroup from "../../components/ListGroup/ListGroup";
import OHLCChart from "../../components/OHLCChart/OHLCChart";

function ChatContainer() {

  const STORAGE_INDEX = 'app.selectedStockIndex';

  const _stocksList = [
    {
      "name": "Apple",
      "symbol": "AAPL"
    },
    {
      "name": "Microsoft",
      "symbol": "MSFT"
    },
    {
      "name": "Facebook",
      "symbol": "FB"
    },
    {
      "name": "Google",
      "symbol": "GOOGL",
    },
    {
      "name": "Amazon.com",
      "symbol": "AMZN",
    },
    {
      "name": "Cisco",
      "symbol": "CSCO",
    },
    {
      "name": "Intel",
      "symbol": "INTC",
    },
    {
      "name": "Starbucks",
      "symbol": "SBUX",
    },
    {
      "name": "Comcast",
      "symbol": "CMCSA",
    }
  ];

  const getIndexFromStore = () => {
    const index = localStorage.getItem(STORAGE_INDEX);
    return index === null ? 0 : parseInt(index);
  };

  const [stocks, setStocks] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [scale, setScale] = useState(10);
  const [selectedStockIndex, setSelectedStockIndex] = useState(getIndexFromStore());


  useEffect(() => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${_stocksList[selectedStockIndex].symbol}&apikey=6N56JX4UJRNSO28E`)
      .then((response) => response.json())
      .then((payload) => {
        if (!payload.hasOwnProperty('Note')) {
          setApiError(false);
          const data = payload['Time Series (Daily)'];
          const _d = Object.keys(data)
            .slice(0, 40)
            .sort((a, b) => new Date(a) - new Date(b))
            .map((key) => ([
                new Date(key).toJSON(),
                parseFloat(data[key]['1. open']),
                parseFloat(data[key]['2. high']),
                parseFloat(data[key]['3. low']),
                parseFloat(data[key]['4. close'])]
            ));
          setStocks(_d);
        } else {
          setApiError(true);
        }
      });
  }, [selectedStockIndex]);

  const onStockSelect = (index) => {
    setSelectedStockIndex(index);
    localStorage.setItem(STORAGE_INDEX, index);
  };

  const onScaleChange = (event) => {
    setScale(parseInt(event.target.value));
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup onSelect={onStockSelect} selectedIndex={selectedStockIndex} stockItems={_stocksList}/>
      </div>
      <div className="col-md-9 py-2">
        <div className="row">
          <div className="col-md-6">
            <div className="border p-2 m-2">
              <div className="form-check">
                <input onChange={onScaleChange}
                       className="form-check-input"
                       type="radio"
                       name="scaleRadios"
                       id="scaleRadio1"
                       checked={scale === 10}
                       value="10"/>
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Scale 10
                </label>
              </div>
              <div className="form-check">
                <input onChange={onScaleChange}
                       className="form-check-input"
                       type="radio"
                       name="scaleRadios"
                       id="scaleRadios2"
                       checked={scale === 20}
                       value="20"/>
                <label className="form-check-label" htmlFor="exampleRadios2">
                  Scale 20
                </label>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {apiError && (
              <p className="text-danger">API ERROR: Standard API call frequency is 5 calls per minute
                and 500 calls per day. Please wait awhile and try again. (https://www.alphavantage.co)</p>
            )}
          </div>
        </div>
        {stocks && stocks.length !== 0 && (<OHLCChart scale={scale} columns={stocks}/>)}
      </div>
    </div>
  );
}

export default ChatContainer;
