import { createContext, useState } from 'react'

export const StoreContext = createContext();

const initialObj = {
    customerName: '',
    // customerPhone: 0,
    customerEmail: '',
    serviceId: '',
    workerId: '',
    date: ''
}

const StoreProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState(initialObj);
    const [user, setUser] = useState(undefined);

    return <StoreContext.Provider value={{ bookingData, setBookingData, user, setUser }}>{children}</StoreContext.Provider>
}

export default StoreProvider;