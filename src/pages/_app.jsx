import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import Transition from '../components/Transition/Transition';
import StoreProvider from '../context/store';
import '../styles/globals.css';
import '../styles/transition.css';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Transition>
        <AppLayout>
          {/* eslint-disable react/jsx-props-no-spreading */}
          <Component {...pageProps} />
        </AppLayout>
      </Transition>
    </StoreProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
  pageProps: PropTypes.node.isRequired,
};

export default MyApp;
