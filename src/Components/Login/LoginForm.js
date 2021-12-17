import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';


const LoginForm = () => {
    const username = useForm();
    const userlogin = useForm();

    return (<section>
        <h1>Login</h1>
        <form action="">
            <Input id="username" label='Usuário' type="text" {...username} />
            <Input id="password" label="Senha" type="password" {...userlogin}/>
            <Button>Entrar</Button>
        </form>
        <Link to='/login/criar'>Cadastro</Link>
    </section>)
}

export default LoginForm;
