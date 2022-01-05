import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { UserContext } from '../../Contexts/UserContext';

import styles from './LoginForm.module.css';
import stylesBtn from '../Forms/Button.module.css';
import Error from '../Helps/Error';

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

    return (<section className={`animeLeft ${styles.loginForm}`}>
        <h1 className='title'>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input id="username" label='Usuário' type="text" {...username} />
            <Input id="password" label="Senha" type="password" {...password}/>
            {loading ? <Button disabled={loading} >Carregando...</Button> : 
                <Button >Entrar</Button>
            }
            <Error error={error}/>
        </form>
        <Link className={styles.perdeu} to='/login/perdeu'>Perdeu a Senha?</Link>
        <div className={styles.cadastro}>
            <h2 className={styles.subtitle}>Cadastre-se</h2>
            <p>Ainda não possui Conta? Cadastre-se no site.</p>
            <Link className={`${styles.buttonCriar} ${stylesBtn.button}`} to='/login/criar'>Cadastro</Link>
        </div>

    </section>)
}

export default LoginForm;
