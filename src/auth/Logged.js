import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const Logged = createContext();

function LogStatus(props) {
    const [loggedIn, setLoggedIn] = useState(false);

    async function getLoggedIn() {
        const loggedInRes = await axios.get(
            "path to auth middleware"
        );
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <Logged.Provider value={{ loggedIn, getLoggedIn }}>
            {props.children}
        </Logged.Provider>
    );
}

export default Logged;
export { LogStatus };