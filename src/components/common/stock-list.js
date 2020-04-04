import React from 'react';
import styled from 'styled-components';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

function StockList({ stockList, displayLength }) {
  return (
    <Table>
      <div className="table">
        <div className="tr th">
          <div className="td name">Name</div>
          <div className="td">Price</div>
          <div className="td change">Chg</div>
          <div className="td percent">
            % Chg&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </div>
          <div className="td volume">Volume</div>
        </div>

        {stockList
          .filter((stock, index) => index <= displayLength - 1)
          .map((stock) => {
            return (
              <div
                key={stock.symbol}
                className={stock.changePercent > 0 ? 'tr gain' : 'tr loss'}
              >
                <div className="td name">{stock.symbol}</div>
                <div className="td">
                  $ {Number(stock.latestPrice).toFixed(2)}
                </div>
                <div className="td change">
                  {Number(stock.change).toFixed(2)}
                </div>
                <div className="td percent">
                  {Number(stock.changePercent * 100).toFixed(2) + '%'}
                  {stock.changePercent > 0 ? (
                    <MdArrowDropUp size={20} />
                  ) : (
                    <MdArrowDropDown size={20} />
                  )}
                </div>
                <div className="td volume">
                  {Number(stock.volume).toLocaleString()}
                </div>
              </div>
            );
          })}
      </div>
    </Table>
  );
}

const Table = styled.section`
  display: flex;
  flex-flow: column nowrap;
  font-size: 0.6875rem;
  margin-top: -0.875rem;
  line-height: 1.5;
  flex: 1 1 auto;

  @media (min-width: 360px) {
    font-size: 0.875rem;
  }

  .th {
    border-bottom: 1px dashed rgba(0, 0, 0, 1);
    color: rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    font-weight: 900;
  }

  .table > .tr.th {
    background-color: #ffffff;
  }

  .tr {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
  }

  .tr:nth-of-type(odd) {
    background-color: #f2f2f2;
  }

  .tr:nth-of-type(even) {
    background-color: #ffffff;
  }

  .td {
    display: flex;
    flex-flow: row nowrap;
    flex-grow: 1;
    flex-basis: 0;
    padding: 0.5em 0;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0px;
    white-space: nowrap;
    justify-content: flex-end;
  }

  .td.name {
    padding-left: 0.5em;
    justify-content: flex-start;
  }

  .td.volume {
    min-width: 80px;
    justify-content: flex-end;
    padding-right: 0.5em;

    @media (min-width: 360px) {
      min-width: 100px;
    }
  }

  .gain .td.change,
  .gain .td.percent {
    color: ${(props) => props.theme.colors.gain};
  }

  .loss .td.change,
  .loss .td.percent {
    color: ${(props) => props.theme.colors.loss};
  }

  .td.percent {
    min-width: 70px;

    @media (min-width: 360px) {
      min-width: 80px;
    }
  }
`;

export default StockList;
