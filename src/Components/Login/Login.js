import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginLost from './LoginLost';
import LoginReset from './LoginReset';
import { UserContext } from "../../Contexts/UserContext";

import styles from './Login.module.css';

const Login = () => {
    const { login } = useContext(UserContext);

    if (!login) <Navigate to="/conta"/>
    return (<section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="criar" element={<LoginCreate />} />
            <Route path="perdeu" element={<LoginLost />} />
            <Route path="resete" element={<LoginReset />} />
        </Routes>
      </div>
    </section>)
}

export default Login;
