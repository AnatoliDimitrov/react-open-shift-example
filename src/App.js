import { Routes, Route } from "react-router-dom";
import React, { useState } from 'react';

import { AuthContext } from "./services/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { PageLayout } from './components/pageLayout/PageLayout';
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";

function App() {
    const [auth, setAuth] = useLocalStorage('b9189a47-1fd1-4367-8d47-a003149fbe58', {});

    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('file', file);

        fetch('https://cpd-cp4ba.apps.ocp.lab.lan/bawaut/automationservices/rest/RBAWS/ReactJS%20API/TestResource', {
            method: 'POST',
            body: formData
        })
            .then(response => {
                console.log('Upload successful!');
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
    };

    

    const userAuth = (data) => {
        setAuth(data);
    };

    const userLogout = () => {
        setAuth({});
    };

    return (
        <AuthContext.Provider value={{ user: auth, userAuth, userLogout }}>
            {/* <div>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/authentication/login" element={<Login />} />
                </Routes>
            </div> */}

            <div>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload} disabled={!file}>Upload</button>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
