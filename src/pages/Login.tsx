import { Link } from "react-router-dom";
import InputButton from "../components/InputButton";

const Login = () => {
    return (
        <div>
            <h2>Login</h2>
            <p>Entre com suas credenciais</p>
            <div className="form">
                <input type="email" placeholder="email" />
                <input type="password" placeholder="senha" />
                <InputButton>Entrar</InputButton>
            </div>
            <p>Não tem uma conta? <Link to='signup'>Cadastre-se</Link></p>
        </div>
    )
}

export default Login