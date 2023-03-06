import React from 'react';
import Row from './Row';
import './Table.css';

const Table = ({ labels, rows }) => {
  return <table className={'styled-table'}>
    <thead>
      <Row data={labels} isHead={true} />
    </thead>
    <tbody>
      { rows.map((a, i) => <Row data={a} key={a[0]} />) }
    </tbody>
  </table>
}

export default Table;
