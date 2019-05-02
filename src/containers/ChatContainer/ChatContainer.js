/**
 * Created by warapitiya on 2019-05-01.
 */
import React, {useEffect, useState} from 'react';

import ListGroup from "../../components/ListGroup/ListGroup";
import OHLCChart from "../../components/OHLCChart/OHLCChart";

function ChatContainer() {

  const [stocks, setStocks] = useState([]);
  const [selectedStockIndex, setSelectedStockIndex] = useState(0);

  useEffect(() => {
    fetch("./ohlc-data.json")
      .then((response) => response.json())
      .then((payload) => {
        setStocks(payload);
      })
  });

  const onStockSelect = (index) => {
    setSelectedStockIndex(index);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup onSelect={onStockSelect} stockItems={stocks}/>
      </div>
      <div className="col-md-9 py-2">
        {stocks && stocks.length !== 0 && (<OHLCChart columns={stocks[selectedStockIndex].stockChanges}/>)}
      </div>
    </div>
  );
}

export default ChatContainer;
