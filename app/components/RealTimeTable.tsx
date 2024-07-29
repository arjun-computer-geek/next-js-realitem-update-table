'use client'
import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';

interface Data {
  ticker: string;
  instrument: string;
  p_l: number;
  totalValue: number;
  quantity: number;
  price: number;
}

const RealTimeTable = () => {
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    // Fetch initial data
    fetch('/api/data')
      .then((response) => response.json())
      .then((initialData) => setData(initialData));

    // Set up WebSocket connection
    const ws = new WebSocket('ws://localhost:3000/ws');
    ws.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      setData((prevData) => {
        return prevData.map((item) => {
          const update = updatedData.find((upd:any) => upd.ticker === item.ticker);
          return update ? { ...item, ...update } : item;
        });
      });
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Ticker</Table.HeadCell>
        <Table.HeadCell>Instrument</Table.HeadCell>
        <Table.HeadCell>P&L</Table.HeadCell>
        <Table.HeadCell>Total Value</Table.HeadCell>
        <Table.HeadCell>Quantity</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {data.map((row, index) => (
          <Table.Row key={index} className="bg-white dark:bg-gray-800">
            <Table.Cell>{row.ticker}</Table.Cell>
            <Table.Cell>{row.instrument}</Table.Cell>
            <Table.Cell>{row.p_l}</Table.Cell>
            <Table.Cell>{row.totalValue}</Table.Cell>
            <Table.Cell>{row.quantity}</Table.Cell>
            <Table.Cell>{row.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default RealTimeTable;
