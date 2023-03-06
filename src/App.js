import './App.css';
import Table from "./components/Table";
import React from 'react';
import Button from "./components/Button";
import {fetchProducts} from "./request";

/**
 * 1. Delete isn't working.
 * 2. Weird sorting
 * 3. Undo feature requested.
 */

const DIRECTIONS = {
  ASC: 'ASC',
  DES: 'DES'
}
const NOT_ASSIGNED = 'Not assigned';
const WIDTH = 'Width';
const HEIGHT = 'Height';
const DEPTH = 'Depth';
const DELETE = 'Delete';

function App() {
  const removeProduct = (id) => () => {
    setProducts(products.filter(({itemId}) => {
      return id !== itemId;
    }));
  };

  const formatData = (data) => data.map((data) => {
    const { itemId, content: { name, typeName, measure }} = data;

    const findMeasurement = (key) => {
      const obj = measure.find(({ typeName }) => typeName.toLowerCase() === key);
      return obj?.value ?? NOT_ASSIGNED;
    }

    return {
      itemId,
      name,
      typeName,
      width: findMeasurement(WIDTH.toLowerCase()),
      height: findMeasurement(HEIGHT.toLowerCase()),
      depth: findMeasurement(DEPTH.toLowerCase())
    }
  });

  const [products, setProducts] = React.useState([]);
  React.useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(formatData(res));
    });
  }, [] /** THIS SHOULD BE REMOVED */ );

  const labels = ['Item id', 'Range name', 'Product name', WIDTH, HEIGHT, DEPTH];
  const [sortBy, setSortBy] = React.useState([DIRECTIONS.ASC, WIDTH.toLowerCase()]);

  const _setSortBy = (key) => () => {
    const [currentDirection, currentKey] = sortBy;

    if (key !== currentKey) {
      setSortBy([DIRECTIONS.ASC, key]);
      return setProducts(sort(DIRECTIONS.ASC, key));
    }

    const newDirection = currentDirection === DIRECTIONS.ASC
      ? DIRECTIONS.DES
      : DIRECTIONS.ASC;

    setSortBy([newDirection, key]);
    setProducts(sort(newDirection, key))
  };

  const sort = (currentDirection, key) => {
    const neutralizeNotAssigned = (value) => value === NOT_ASSIGNED
      ? 0
      : value;

    const sorted = products.sort((a, b) => {
      return neutralizeNotAssigned(a[key]) - neutralizeNotAssigned(b[key]);
    });

    return currentDirection === DIRECTIONS.ASC
      ? sorted
      : sorted.reverse();
  };

  const generateRows = () => products.map((data, i) => {
    return [
      ...Object.values(data),
      <Button onClick={removeProduct(data.itemId/** THIS SHOULD BE REMOVED */)} label={DELETE}/>
    ]
  })

  return (
    <div className="App">
      <h1>IKEA Catalog</h1>

      <div>
        <h5 style={{ margin: "10px" }}>Sort by</h5>

        <div style={{ width: "200px", display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={_setSortBy(WIDTH.toLowerCase())} label={WIDTH}/>
          <Button onClick={_setSortBy(HEIGHT.toLowerCase())} label={HEIGHT}/>
          <Button onClick={_setSortBy(DEPTH.toLowerCase())} label={DEPTH}/>
        </div>
      </div>

      <Table labels={labels} rows={generateRows()} />
    </div>
  );
}

export default App;
