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
    }
  ];

  const getIndexFromStore = () => {
    const index = localStorage.getItem(STORAGE_INDEX);
    return index === null ? 0 : parseInt(index);
  };

  const [stocks, setStocks] = useState([]);
  const [selectedStockIndex, setSelectedStockIndex] = useState(getIndexFromStore());


  useEffect(() => {
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${_stocksList[selectedStockIndex].symbol}&apikey=6N56JX4UJRNSO28E`)
      .then((response) => response.json())
      .then((payload) => {
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
        console.log(_d);
        setStocks(_d);
      });
  }, [selectedStockIndex]);

  const onStockSelect = (index) => {
    setSelectedStockIndex(index);
    localStorage.setItem(STORAGE_INDEX, index);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup onSelect={onStockSelect} selectedIndex={selectedStockIndex} stockItems={_stocksList}/>
      </div>
      <div className="col-md-9 py-2">
        {stocks && stocks.length !== 0 && (<OHLCChart scale={10} columns={stocks}/>)}
      </div>
    </div>
  );
}

export default ChatContainer;
