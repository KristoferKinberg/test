import React from 'react';
import Column from "../Column";

const Row = ({ data, isHead = false }) => {
  return <tr>
    { data.map((item, i) => <Column label={item} key={i} />) }
  </tr>
}

export default Row;
