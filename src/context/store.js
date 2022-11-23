import { createContext, useState } from 'react'

export const StoreContext = createContext();

export const initialObj = {
    user: {
        user_id: 0,
        firstname: "",
        lastname: "",
        photoUrl: "",
        rut: "",
        phone: "",
        email: "",
        token: ""
    },
    service: {
        service_id: 0,
        name: "",
        description: "",
        price: 0,
        photoUrl: "",
    },
    worker: {
        worker_id: 0,
        name: "",
        instagram: "",
        image_url: "",
        description: "",
        photoUrl: "",
    },
    schedule: {
        day: "",
        block_time_id: 0,
        work_day_id: 0,
        hour: 0
    },
    reservation: {
        id: 0
    }
}

const StoreProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState(initialObj);
    const [user, setUser] = useState(undefined);

    // console.log(bookingData);

    return <StoreContext.Provider value={{ bookingData, setBookingData, user, setUser, initialObj }}>{children}</StoreContext.Provider>
}

export default StoreProvider;