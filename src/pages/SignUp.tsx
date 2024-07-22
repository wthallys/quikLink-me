import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully');
      navigate('/')
     
    } catch (error) {
      console.error('Sign up failed', error);
      setError('Failed to create an account. Please try again.');
    }

  };
  
    return (
      <>
        <h1>QUIKLINK-ME</h1>
        <form className="form" onSubmit={handleSubmit}>
            <TextField
                label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required={true}
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
            {error && <p>{error}</p>}
        <p>Já tem uma conta? <Link to='/'>Login</Link></p>
      </>
    );
  };
  
  export default SignUp;
