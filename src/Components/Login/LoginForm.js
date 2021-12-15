import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [ formBody, setFormBody ] = React.useState({
        username: '', password: ''
    });

    const changeInputs = (target) => {
        setFormBody({...formBody, [target.id]: target.value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formBody)
        fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formBody),
            mode: 'cors'
        }).then( res => res.json()).then( json => console.log(json))
        .catch(err => console.log(err))
    }
    return (<section>
        <h1>Login</h1>
        <form action="" onChange={({ target }) => changeInputs(target) } onSubmit={handleSubmit}>
            <input id="username" type="text" defaultValue={formBody.name} />
            <input id="password" type="password" defaultValue={formBody.password}/>
            <input type='submit' name='sub' />
        </form>
        <Link to='/login/criar'>Cadastro</Link>
    </section>)
}

export default LoginForm;
