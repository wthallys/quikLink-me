import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    //logica do login
  };
  
    return (
      <>
        <h1>QUIKLINK-ME</h1>
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                label="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
            />
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
                Registrar-se
            </Button>
            </form>
        <p>Já tem uma conta? <Link to='/'>Login</Link></p>
      </>
    );
  };
  
  export default SignUp;
