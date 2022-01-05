import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import Error from '../Helps/Error';

import useForm from '../../Hooks/useForm';
import { USER_POST } from '../../api';
import { UserContext } from '../../Contexts/UserContext';
import { useFetch } from '../../Hooks/useFetch';


const LoginCreate = () => {
  const { userLogin } = React.useContext(UserContext);
  const  {loading, error, request} = useFetch();
  
  const username = useForm();
  const email = useForm('email');
  const password = useForm();

  async function handleSubmit(ev) {
    ev.preventDefault();

    const { url, options } = USER_POST({username: username.value, email: email.value, password: password.value})
    const { response } = await request(url, options);
    if (response.ok) {
      await userLogin(username.value, password.value);
    }
  }

  return (<section className='animeLeft'>
    <h1 className='title'>Cadastre-se</h1>
    <form onSubmit={handleSubmit} >
      <Input id='ususario' type='text' label='Usuario' {...username}/>
      <Input id='email' type='email' label='Email' {...email}/>
      <Input id='password' type='password' label='Senha' {...password}/>
      { loading ? <Button disabled>Cadastrondo...</Button>:<Button >Cadastro</Button>}
      <Error error={error}/>
    </form>
  </section>)
}

export default LoginCreate;
