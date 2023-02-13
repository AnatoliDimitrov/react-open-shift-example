import { Routes, Route } from "react-router-dom";

import { AuthContext } from "./services/AuthContext";
import { useLocalStorage } from "./hooks/useLocalStorage";

import { PageLayout } from './components/pageLayout/PageLayout';
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";

function App() {
    const [auth, setAuth] = useLocalStorage('b9189a47-1fd1-4367-8d47-a003149fbe58', {});

    const userAuth = (data) => {
        setAuth(data);
    };

    const userLogout = () => {
        setAuth({});
    };

    return (
        <AuthContext.Provider value={{ user: auth, userAuth, userLogout }}>
            <div>
                <Routes>
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/authentication/login" element={<Login />} />
                </Routes>
            </div>
        </AuthContext.Provider>
    );
}

export default App;
