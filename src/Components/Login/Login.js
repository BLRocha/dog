import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginLost from './LoginLost';
import LoginReset from './LoginReset';
import { UserContext } from "../../Contexts/UserContext";

const Login = () => {
    const { login } = useContext(UserContext);

    if (!login) <Navigate to="/conta"/>
    return (<div>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="perdeu" element={<LoginLost />} />
            <Route path="resete" element={<LoginReset />} />
        </Routes>
    </div>)
}

export default Login;
