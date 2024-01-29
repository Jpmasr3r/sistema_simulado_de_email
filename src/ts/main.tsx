import React, { Component, useState } from "react";
import ReactDom from "react-dom";

interface IEmail {
    texto: string;
    remetente: string;
    dataEnvio: string;
}

const Email: React.FC<IEmail> = ({ texto, remetente, dataEnvio }) => {
    return (
        <div>
            <h1>{remetente}</h1>
            <label>{texto}</label>
            <h2>{dataEnvio}</h2>
        </div>
    );
}

const App: React.FC = () => {
    // const [emails,setEmails] = useState<Component>([]);

    // async function getEmails() {

    // }

    return (
        <div>
            <Email texto="Email 1" remetente="João" dataEnvio="21-02-23" ></Email>
            <Email texto="Email 2" remetente="João Pedro" dataEnvio="21-02-21" ></Email>
            <Email texto="Email 3" remetente="Pedro" dataEnvio="12-06-24" ></Email>
        </div>
    );
}

ReactDom.render(<App></App>, document.body);