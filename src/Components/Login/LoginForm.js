import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { UserContext } from '../../Contexts/UserContext';

const LoginForm = () => {

    const username = useForm();
    const password = useForm();
    const { userLogin, loading, error } = useContext(UserContext);

    async function handleSubmit(ev) {
        ev.preventDefault();

        if (username.validate() && password.validate()) {
            userLogin(username.value, password.value);
        }
    }

    return (<section>
        <h1>Login</h1>
        <form action="" onSubmit={handleSubmit}>
            <Input id="username" label='Usuário' type="text" {...username} />
            <Input id="password" label="Senha" type="password" {...password}/>
            {loading ? <Button disabled={loading} >Carregando...</Button> : 
                <Button >Entrar</Button>
            }
            <br/>
            {!!error && <strong>{error}</strong>}
            <br/>
        </form>
        <Link to='/login/criar'>Cadastro</Link>

    </section>)
}

export default LoginForm;
