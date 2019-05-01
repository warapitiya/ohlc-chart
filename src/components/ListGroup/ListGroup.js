/**
 * Created by warapitiya on 2019-05-01.
 */
import React from 'react';

function ListGroup({stockItems}) {
  return (
    <div className="list-group">
      {stockItems && stockItems.map((s, i) => {
        return (
          <a
            key={`list-${i}`}
            href="#"
            className="list-group-item list-group-item-action">{s.symbol}</a>
        );
      })}
    </div>
  );
}

export default ListGroup;
