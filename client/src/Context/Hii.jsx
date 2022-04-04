import React, { createContext } from 'react'

import ComA from "./ComA";
export const FirstName = createContext();
const Hii = () => {
    return (
        <FirstName.Provider value="Mukesh hello ">
            <ComA />
        </FirstName.Provider>
    )
}

export default Hii