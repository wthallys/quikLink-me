import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //logica do login
  };

  return (
    <>
      <h1>QUIKLINK-ME</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Entrar
        </Button>
      </form>
      <p>Ainda não tem uma conta? <Link to='/signup'>Cadastre-se</Link></p>
    </>
  );
};

export default Login;
