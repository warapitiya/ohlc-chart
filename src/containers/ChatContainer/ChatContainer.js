/**
 * Created by warapitiya on 2019-05-01.
 */
import React, {useEffect, useState} from 'react';

import ListGroup from "../../components/ListGroup/ListGroup";
import OHLCChart from "../../components/OHLCChart/OHLCChart";

function ChatContainer() {

  const STORAGE_INDEX = 'app.selectedStockIndex';

  const getIndexFromStore = () => {
    const index = localStorage.getItem(STORAGE_INDEX);
    return index === null ? 0 : parseInt(index);
  };

  const [stocks, setStocks] = useState([]);
  const [selectedStockIndex, setSelectedStockIndex] = useState(getIndexFromStore());


  useEffect(() => {
    fetch("./ohlc-data.json")
      .then((response) => response.json())
      .then((payload) => {
        setStocks(payload);
      });
  }, []);

  const onStockSelect = (index) => {
    setSelectedStockIndex(index);
    localStorage.setItem(STORAGE_INDEX, index);
  };

  return (
    <div className="row">
      <div className="col-md-3">
        <ListGroup onSelect={onStockSelect} selectedIndex={selectedStockIndex} stockItems={stocks}/>
      </div>
      <div className="col-md-9 py-2">
        {stocks && stocks.length !== 0 && (<OHLCChart scale={10} columns={stocks[selectedStockIndex].stockChanges}/>)}
      </div>
    </div>
  );
}

export default ChatContainer;
