import React from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import { XYPlot, XAxis, YAxis, LineSeries } from 'react-vis';
import 'react-vis/dist/style.css';

function StockChart({ chart, setChart, selection }) {
  console.log(chart);

  const displayChart = (range) => {
    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    if (chart[range]) {
      setChart((prev) => ({ ...prev, type: range }));
    } else {
      axios.get(url).then((res) => {
        const data = res.data;
        setChart((prev) => ({ ...prev, [range]: data, type: range, data }));
      });
    }
  };

  const data =
    chart.type === '1d'
      ? chart['1d']
          .filter((marker) => marker.high !== null)
          .map((marker) => ({
            x: new Date(`${marker.date} ${marker.minute}`),
            y: Number(marker.high),
          }))
      : chart.data.map((marker) => ({
          x: new Date(marker.date),
          y: Number(marker.close),
        }));

  const handleTickFormat = (tick) => {
    if (chart.type === '1d') {
      return format(tick, 'h:mm');
    } else if (chart.type === 'ytd') {
      return format(tick, 'M/d');
    } else if (chart.type === '5d' || chart.type === '1m') {
      return format(tick, 'MMM d');
    } else if (chart.type === '3m') {
      return format(tick, 'MMMM');
    } else if (chart.type === '6m' || chart.type === '1y') {
      return format(tick, 'MMM');
    } else if (chart.type === '2y') {
      return format(tick, 'MM-yy');
    } else if (chart.type === '5y' || chart.type === 'max') {
      return format(tick, 'yyyy');
    }
  };

  return chart.data.length ? (
    <ChartWrapper>
      <ChartRanges>
        <button onClick={() => displayChart('1d')}>1D</button>
        <button onClick={() => displayChart('5d')}>5D</button>
        <button onClick={() => displayChart('1m')}>1M</button>
        <button onClick={() => displayChart('3m')}>3M</button>
        <button onClick={() => displayChart('6m')}>6M</button>
        <button onClick={() => displayChart('ytd')}>YTD</button>
        <button onClick={() => displayChart('1y')}>1Y</button>
        <button onClick={() => displayChart('2y')}>2Y</button>
        <button onClick={() => displayChart('max')}>MAX</button>
      </ChartRanges>
      <XYPlot
        xType="time"
        width={415}
        height={240}
        margin={{ left: 50 }}
        animation
      >
        <XAxis tickTotal={6} tickFormat={handleTickFormat} />
        <YAxis />
        <LineSeries getNull={(d) => d.y !== null} data={data} />
      </XYPlot>
    </ChartWrapper>
  ) : null;
}

const ChartWrapper = styled.div`
  margin: 2rem 1rem;
  margin-bottom: 0;
  border: 1px solid #ccc;
`;

const ChartRanges = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;
  margin-left: 3rem;

  button {
    border: none;
    font-size: 0.75rem;
    outline: none;
  }
`;

export default StockChart;
