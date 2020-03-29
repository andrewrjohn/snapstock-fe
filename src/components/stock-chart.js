import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import format from 'date-fns/format';
import axios from 'axios';
import { useTheme } from 'styled-components';
import { XYPlot, XAxis, YAxis, LineSeries, makeWidthFlexible } from 'react-vis';
import 'react-vis/dist/style.css';

function StockChart({ chart, setChart, selection }) {
  const [activeRangeButton, setActiveRangeButton] = useState('1d');

  useEffect(() => {
    setActiveRangeButton('1d');
  }, [selection]);

  const displayChart = (range) => {
    // sets the button to active before the potential api call
    setActiveRangeButton(range);

    const { symbol } = selection;
    const url = `http://localhost:5000/api/stocks/${symbol}/chart/${range}`;

    setChart((prev) => ({ ...prev, loading: true }));
    if (chart[range]) {
      setChart((prev) => ({
        ...prev,
        data: prev[range],
        type: range,
        loading: false,
      }));
    } else {
      axios.get(url).then((res) => {
        const data = res.data;
        setChart((prev) => ({
          ...prev,
          [range]: data,
          type: range,
          data,
          loading: false,
        }));
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

  const ranges = {
    '1d': 'h:mm',
    '5d': 'MMM d',
    '1m': 'MMM d',
    '3m': 'MMMM',
    '6m': 'MMM',
    '1y': 'MMM',
    ytd: 'M/d',
    '2y': 'MM-yy',
    max: 'yyyy',
  };

  const handleTickFormat = (tick) => {
    format(tick, ranges[chart.type]);
  };

  const FlexibleXYPlot = makeWidthFlexible(XYPlot);
  const strokeColor = useTheme().colors.secondary;

  console.log(chart);

  return chart.data.length ? (
    <ChartWrapper>
      <ChartRanges>
        {Object.keys(ranges).map((range) => (
          <button
            key={range}
            className={range === activeRangeButton ? 'active' : undefined}
            onClick={() => displayChart(range)}
          >
            {range.toUpperCase()}
          </button>
        ))}
      </ChartRanges>
      <FlexibleXYPlot
        xType="time"
        height={240}
        margin={{ left: 50 }}
        stroke={strokeColor}
      >
        {chart.loading && <LoadingMask />}
        <XAxis tickTotal={6} tickFormat={handleTickFormat} />
        <YAxis />
        <LineSeries getNull={(d) => d.y !== null} data={data} />
      </FlexibleXYPlot>
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
  justify-content: flex-end;
  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-right: 1rem;

  button {
    border: none;
    font-size: 0.75rem;
    outline: none;
    padding: 0.2rem 0.4rem;
    margin-left: 0.1rem;

    &.active {
      font-weight: bold;
      background: ${(props) => props.theme.colors.accent};
      color: #fff;
      border-radius: 3px;
    }
  }
`;

const LoadingMask = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 240px;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.8);
`;

export default StockChart;
