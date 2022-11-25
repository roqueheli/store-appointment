import React from 'react';
import PropTypes from 'prop-types';
import AppLayout from '../components/AppLayout';
import Transition from '../components/Transition/Transition';
import StoreProvider from '../context/store';
import '../styles/globals.css';
import '../styles/transition.css';

function MyApp({ Component }) {
  return (
    <StoreProvider>
      <AppLayout>
        <Transition>
          <Component />
        </Transition>
      </AppLayout>
    </StoreProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.node.isRequired,
};

export default MyApp;
