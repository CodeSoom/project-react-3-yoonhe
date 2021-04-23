import React, { useCallback, useEffect, useState } from 'react';
import {
  Redirect, Route, Switch, useHistory,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { TiThMenu } from 'react-icons/ti';
import { FiCircle } from 'react-icons/fi';
import { FaTimes } from 'react-icons/fa';

import MianPage from '../pages/MainPage';
import SignInPage from '../pages/SignInPage';
import AddRoomPage from '../pages/AddRoomPage';
import SignUpPage from '../pages/SignUpPage';

import { watchAuthentication } from '../slice';
import { get, getMediaQuery } from '../../utils';

const breakpoints = [1500, 1000, 768];
const mediaQuery = getMediaQuery(breakpoints);

const MobileMenuIcon = styled.div(({ visible }) => ({
  position: 'absolute',
  right: '1rem',
  top: '1rem',
  display: 'none',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: visible && '1rem',
  width: '50px',
  height: '50px',
  borderRadius: !visible && '50%',
  textAlign: 'center',
  cursor: 'pointer',
  background: !visible && '#fff',
  boxShadow: !visible && '0 4px 18px rgba(0,0,0,0.2)',
  [mediaQuery[768]]: {
    display: 'flex',
  },
}));

const LeftSection = styled.section(({ visible }) => ({
  position: 'fixed',
  left: '0',
  top: '0',
  padding: '3rem 1rem',
  width: '250px',
  height: '100%',
  background: '#fff',
  [mediaQuery[768]]: {
    left: 'initial',
    right: '0',
    top: '0',
    padding: visible ? '5rem 1rem' : '0',
    height: !visible && 'auto',
    width: !visible && '70px',
    boxShadow: visible && '-10px 0px 20px rgba(0,0,0,0.3)',
    background: !visible && 'none',
    zIndex: 2,
  },
}));

const LeftSectionWrap = styled.section(({ visible }) => ({
  h2: {
    color: '#75A293',
    textAlign: 'center',
  },
  [mediaQuery[768]]: {
    display: visible ? 'block' : 'none',
  },
}));

const Menu = styled.ul({
  marginTop: '1rem',
});

const MenuItem = styled.li({
  '& + &': {
    marginTop: '0.3rem',
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem',
    width: '100%',
    color: '#A3A1AC',
    borderRadius: '1rem',
    cursor: 'pointer',
    '&:hover': {
      background: '#75A293',
      color: '#fff',
      svg: {
        color: '#fff !important',
      },
    },
  },
});

const CenterSection = styled.section({
  padding: '4rem 2rem',
  height: '100%',
  marginLeft: '250px',
  [mediaQuery[768]]: {
    marginLeft: 'auto',
    padding: '4rem 1.1rem',
  },
});

export default function App() {
  const history = useHistory();

  const [menuVisible, setMenuVisible] = useState(false);

  const isLoggedIn = useSelector(get('isLoggedIn'));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(watchAuthentication());
  }, []);

  const handleMobileIconClick = useCallback(() => {
    setMenuVisible((prev) => !prev);
  }, []);

  function handlePageMove(path) {
    history.push(path);
  }

  return (
    <>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/main" /> : <SignInPage />}
        </Route>
        <Route exact path="/signUp">
          {isLoggedIn ? <Redirect to="/main" /> : <SignUpPage />}
        </Route>
        <>
          <LeftSection visible={menuVisible}>
            <MobileMenuIcon onClick={handleMobileIconClick} visible={menuVisible}>
              {
            menuVisible ? <FaTimes size="25px" color="75A293" />
              : <TiThMenu size="25px" color="75A293" />
          }
            </MobileMenuIcon>
            <LeftSectionWrap visible={menuVisible}>
              <div>
                <h2>Room Preview 🏠</h2>
              </div>
              <Menu>
                <MenuItem>
                  <button
                    type="button"
                    onClick={() => handlePageMove('/main')}
                  >
                    Home
                    <span>
                      <FiCircle color="#A3A1AC" />
                    </span>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    type="button"
                    onClick={() => handlePageMove('/addRoom')}
                  >
                    방 등록
                    <span>
                      <FiCircle color="#A3A1AC" />
                    </span>
                  </button>
                </MenuItem>
                <MenuItem>
                  {isLoggedIn ? (
                    <button
                      type="button"
                    >
                      로그아웃
                      <span>
                        <FiCircle color="#A3A1AC" />
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handlePageMove('/')}
                    >
                      로그인
                      <span>
                        <FiCircle color="#A3A1AC" />
                      </span>
                    </button>
                  )}
                </MenuItem>
              </Menu>
            </LeftSectionWrap>
          </LeftSection>
          <CenterSection>
            <Route exact path="/main" component={MianPage} />
            <Route exact path="/addRoom" component={AddRoomPage} />
          </CenterSection>
        </>
      </Switch>
    </>
  );
}
