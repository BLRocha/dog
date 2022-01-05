import React, { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_GET, TOKEN_POST, TOKEN_VALIDATE_POST } from '../api';

export const UserContext = createContext();

export const UserStorage = ({ children }) => {
    const [ data, setData ] = React.useState(null);
    const [ login, setLogin] = React.useState(false);
    const [ loading, setLoading ] = React.useState(false);
    const [ error, setError ] = React.useState(null);
    const navigate = useNavigate();

    const userLogout = React.useCallback(
        async function () {
            setData(null);
            setError(null);
            setLoading(false);
            setLogin(false);
            window.localStorage.removeItem('token');
    },
    []);

    async function getUser(token) {
        const {url, options} = USER_GET(token);
        
        try {
            const userResponse = await fetch(url, options);
            const json = await userResponse.json();
            setData(json);
            setLogin(true);
        } catch(err) {
            setError(err.message);
            setData(null);
            setLogin(false);
        } finally {

        }
    }

    async function userLogin(username, password) {
        const { url, options } = TOKEN_POST({username, password});
        try {
            setError(null);
            setLoading(true);
            const tokenResponse = await fetch(url, options);
            if (!tokenResponse.ok) throw new Error(`Error: ${tokenResponse.statusText}`);
            const { token } = await tokenResponse.json();
            window.localStorage.setItem('token', token);
            await getUser(token);
            navigate('/conta');
        } catch(err) {
            setError(err.message);
            setLogin(false);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        async function autoLogin() {
            const token = window.localStorage.getItem('token');
            if (token) {
                try {
                    setError(null);
                    setLoading(true);
                    const {url, options} = TOKEN_VALIDATE_POST(token);
                    const resp = await fetch(url, options);
                    if(!resp.ok) throw new Error("Invalid Token")
                    await getUser(token);
                } catch(err) {
                    setError(err);
                    userLogout();
                } finally {
                setLoading(false);
                }
            } else {
                setLogin(false);
            }
        }        
        autoLogin();
    },[userLogout]);

    return <UserContext.Provider
        value={
            {
                data, login, loading, error,
                setData, setLogin,setLoading, setError,
                userLogin, getUser, userLogout
            }
        }>
        { children }
    </UserContext.Provider>
}
