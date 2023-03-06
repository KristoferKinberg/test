import React from "react";
import {NOT_ASSIGNED} from "../App";

const DIRECTIONS = {
  ASC: 'ASC',
  DES: 'DES'
}

const useSort = ({ defaultSort, items }) => {
  const [sortBy, setSortBy] = React.useState([DIRECTIONS.ASC, defaultSort]);

  const sort = () => {
    const [direction, key] = sortBy;

    const neutralizeNotAssigned = (value) => value === NOT_ASSIGNED
      ? 0
      : value;

    const sorted = items.sort((a, b) => {
      return neutralizeNotAssigned(a[key]) - neutralizeNotAssigned(b[key]);
    });

    return direction === DIRECTIONS.ASC
      ? sorted
      : sorted.reverse();
  };

  const _setSortBy = (key) => {
    const [currentDirection, currentKey] = sortBy;

    if (key !== currentKey) {
      setSortBy([DIRECTIONS.ASC, key]);
    }

    const newDirection = currentDirection === DIRECTIONS.ASC
      ? DIRECTIONS.DES
      : DIRECTIONS.ASC;

    setSortBy([newDirection, key]);
  };

  return { setSortBy: _setSortBy, sortedItems: sort() };
}

export default useSort;
export { DIRECTIONS };
