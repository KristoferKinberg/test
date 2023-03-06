import './App.css';
import Table from "./components/Table";
import React from 'react';
import Button from "./components/Button";
import {fetchProducts} from "./request";
import useSort from "./hooks/useSort";

/**
 * 1. Delete isn't working.
 * 2. Undo feature requested.
 */

export const NOT_ASSIGNED = 'Not assigned';
const WIDTH = 'Width';
const HEIGHT = 'Height';
const DEPTH = 'Depth';
const DELETE = 'Delete';

function App() {
  const [products, setProducts] = React.useState([]);
  const { setSortBy, sortedItems } = useSort({ defaultSort: WIDTH.toLowerCase(), items: products });

  const removeProduct = (id) => () => {
    setProducts(sortedItems.filter(({itemId}) => {
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

  React.useEffect(() => {
    fetchProducts().then((res) => {
      setProducts(formatData(res));
    });
  });

  const labels = ['Item id', 'Range name', 'Product name', WIDTH, HEIGHT, DEPTH, ''];

  const generateRows = () => sortedItems.map((data, i) => {
    return [
      ...Object.values(data),
      <Button onClick={removeProduct} label={DELETE}/>
    ]
  })

  return (
    <div className="App">
      <h1>IKEA Catalog</h1>

      <div>
        <h5>Sort by</h5>

        <div className="button-wrapper">
          <Button onClick={setSortBy(WIDTH.toLowerCase())} label={WIDTH}/>
          <Button onClick={setSortBy(HEIGHT.toLowerCase())} label={HEIGHT}/>
          <Button onClick={setSortBy(DEPTH.toLowerCase())} label={DEPTH}/>
        </div>
      </div>

      <Table labels={labels} rows={generateRows()} />
    </div>
  );
}

export default App;
