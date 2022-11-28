import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const StoreContext = createContext();

export const initialObj = {
  user: {
    user_id: 0,
    firstname: '',
    lastname: '',
    photoUrl: '',
    rut: '',
    phone: '',
    email: '',
    token: '',
  },
  service: {
    service_id: 0,
    name: '',
    description: '',
    price: 0,
    photoUrl: '',
  },
  worker: {
    worker_id: 0,
    name: '',
    instagram: '',
    image_url: '',
    description: '',
    photoUrl: '',
  },
  schedule: {
    day: '',
    block_time_id: 0,
    work_day_id: 0,
    hour: 0,
  },
  reservation: {
    id: 0,
  },
};

function StoreProvider({ children }) {
  const [bookingData, setBookingData] = useState(initialObj);
  const [user, setUser] = useState(undefined);
  const [login, setLogin] = useState(false);

  const value = useMemo(() => ({
    user, setUser, bookingData, setBookingData, login, setLogin,
  }), [user, bookingData, login]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoreProvider;
