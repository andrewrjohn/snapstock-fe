import React, { useState } from 'react';
import styled from 'styled-components';
import formatNumber from '../utils/formatNumber';
import formatHugeNumber from '../utils/formatHugeNumber';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';

function KeyData({ quote, stats }) {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible((prevState) => !prevState);
  };
  console.log(stats);
  return !quote || !stats ? null : (
    <Section>
      <div className="section-title">
        <span>Key Data</span>
        {isVisible ? (
          <AiOutlineMinusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        ) : (
          <AiOutlinePlusSquare
            className="toggle-btn"
            onClick={toggleVisibility}
            size={20}
          />
        )}
      </div>
      {isVisible && (
        <div className="table">
          <div className="table-section">
            <div>
              <span>Open</span>
              <span>{formatNumber(quote.open)}</span>
            </div>
            <div>
              <span>Day High</span>
              <span>{formatNumber(quote.high)}</span>
            </div>
            <div>
              <span>Day Low</span>
              <span>{formatNumber(quote.low)}</span>
            </div>
            <div>
              <span>Previous Close</span>
              <span>{formatNumber(quote.previousClose)}</span>
            </div>
            <div>
              <span>Volume</span>
              <span>{formatNumber(quote.volume)}</span>
            </div>
          </div>

          <div className="table-section">
            <div>
              <span>Market Cap</span>
              {/* <span>{formatNumber(stats.marketcap / 1000000)}</span> */}
              <span>{formatHugeNumber(stats.marketcap)}</span>
            </div>
            <div>
              <span>Shares Out</span>
              <span>{formatHugeNumber(stats.sharesOutstanding)}</span>
            </div>
            <div>
              <span>Dividend (TTM)</span>
              <span>{stats.ttmDividendRate || '--'}</span>
            </div>
            <div>
              <span>Div Yield</span>
              <span>
                {stats.dividendYield
                  ? formatNumber(stats.dividendYield * 100, '%')
                  : '--'}
              </span>
            </div>
            <div>
              <span>1 Year % Chg</span>
              <span>{formatNumber(stats.year1ChangePercent * 100, '%')}</span>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}

const Section = styled.section`
  margin-bottom: 2rem;

  .table {
    font-size: 0.875rem;
    display: flex;

    @media (min-width: 500px) {
      font-size: 0.9375rem;
    }
  }

  .table-section {
    margin-left: 1rem;
    flex-grow: 1;
    div {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      padding-bottom: 0.15rem;
      margin-bottom: 0.5rem;

      & span:nth-of-type(2) {
        font-weight: bold;
      }
    }

    &:nth-of-type(1) {
      margin-left: 0;
    }
  }

  .margin-top {
    margin-top: 1rem;
  }
`;

export default KeyData;
