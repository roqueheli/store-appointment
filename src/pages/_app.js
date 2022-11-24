import React from 'react';
import AppLayout from '../components/AppLayout';
import Transition from '../components/Transition/Transition';
import StoreProvider from '../context/store';
import '../styles/globals.css';
import '../styles/transition.css';

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <AppLayout>
        <Transition>
          <Component {...pageProps} />
        </Transition>
      </AppLayout>
    </StoreProvider>
  );
}

export default MyApp;
