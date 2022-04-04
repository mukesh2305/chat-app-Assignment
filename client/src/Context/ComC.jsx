import React from "react";
import { FirstName } from "./Hii";
const ComC = () => {
    return (
        <>
            <FirstName.Consumer>
                {(fname) => {
                    console.log(fname);
                    return <h1>This is {fname}</h1>;
                }}
            </FirstName.Consumer>
        </>
    );
};

export default ComC;
