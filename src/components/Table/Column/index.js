import React from 'react';

const Column = ({ isHead, label }) => {
  const renderContent = () => typeof label === 'function'
    ? label()
    : label;

  return isHead
    ? <th>{ renderContent() }</th>
    : <td>{ renderContent() }</td>
};

export default Column;
