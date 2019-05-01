/**
 * Created by warapitiya on 2019-05-01.
 */
import React from 'react';

import './Footer.css'

function Footer({title}) {
  return (
    <div className="footer-container p-2">
      <p className="m-0">{title}</p>
    </div>
  )
}

export default Footer;
