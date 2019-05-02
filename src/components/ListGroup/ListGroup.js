/**
 * Created by warapitiya on 2019-05-01.
 */
import React, {useState} from 'react';

function ListGroup({stockItems, onSelect}) {
  const STORAGE_INDEX = 'app.selectedStockIndex';

  const getIndexFromStore = () => {
    const index = localStorage.getItem(STORAGE_INDEX);
    return index === null ? 0 : parseInt(index);
  };

  const [selectedStock, setSelectedStock] = useState(getIndexFromStore());

  /**
   * Handle click event
   * @param stock
   * @param index
   */
  const handleClick = (stock, index) => {
    localStorage.setItem(STORAGE_INDEX, index);
    setSelectedStock(index);
    onSelect(index);
  };

  return (
    <div className="list-group">
      {stockItems && stockItems.map((s, i) => {
        return (
          <button
            type="button"
            key={`list-${i}`}
            onClick={() => handleClick(s, i)}
            className={`list-group-item list-group-item-action ${selectedStock === i ? 'active' : ''}`}>{s.symbol}</button>
        );
      })}
    </div>
  );
}

export default ListGroup;
