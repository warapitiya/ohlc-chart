/**
 * Created by warapitiya on 2019-05-01.
 */
import React from 'react';
import './Header.css';

function Header({title}) {
  return (
    <div className="title-container p-2 px-3">
      <h4 className="m-0">{title}</h4>
    </div>
  )
}

export default Header;
