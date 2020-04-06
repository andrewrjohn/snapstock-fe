import React from 'react';
import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';
import isAuthenticated from '../utils/isAuthenticated';
import Container from './common/container';
import logo from '../images/snapstock_logo.svg';

function Header({ setSymbol, setQuote, setWatchlist }) {
  const history = useHistory();

  const logout = () => {
    handleReset();
    localStorage.removeItem('token');
    history.push('/');
  };

  const handleReset = () => {
    setSymbol && setSymbol(null);
    setQuote && setQuote(null);
    setWatchlist && setWatchlist(null);
  };

  return (
    <StyledHeader>
      <Container>
        <div className="header__inner">
          <Link className="logo" to="/" onClick={() => handleReset()}>
            <img src={logo} alt="" />
          </Link>
          <div>
            <Link className="nav-item" to="/watchlist">
              Watchlist
            </Link>
            {!isAuthenticated() ? (
              <Link className="nav-item login" to="/signin">
                Sign in
              </Link>
            ) : (
              <button className="nav-item logout" onClick={logout}>
                Sign out
              </button>
            )}
          </div>
        </div>
      </Container>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  /* background-color: ${(props) => props.theme.colors.primary}; */
  background-color: white;
  /* border-bottom: 1px solid rgba(0,0,0,0.2); */

  .header__inner {
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  a {
    text-decoration: none;
  }

  .logo {
    color: ${(props) => props.theme.colors.headerText};
    font-size: 1.5rem;
    font-weight: 500;

    img {
      height: 30px;

      @media (min-width: 500px) {
        height: 40px;
      }
    }
  }

  .logout {
    outline: none;
  }

  button {
    background: transparent;
    border: none;
  }

  .search-button {
    padding: 0.5rem;
    border-radius: 3px;
    outline: none;

    span {
      margin-left: 10px;
    }
  }

  .search-button,
  .nav-item {
    color: ${(props) => props.theme.colors.headerText};
    text-transform: uppercase;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-left: 0.5rem;

    font-weight: 700;
    letter-spacing: 1px;

    &:hover {
      color: ${(props) => props.theme.colors.secondary};
    }
  }
`;

export default Header;
