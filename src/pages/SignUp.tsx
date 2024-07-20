import { Link } from "react-router-dom";
import InputButton from "../components/InputButton";

const SignUp = () => {
    return (
        <div>
            <h2>Registre-se</h2>
            <p>Preencha os dados abaixo</p>
            <div className="form">
                <input type="text" placeholder="nome" />
                <input type="email" placeholder="email" />
                <input type="password" placeholder="senha" />
                <InputButton>Registrar</InputButton>
            </div>
            <p>Já tem uma conta? <Link to='/'>Login</Link></p>
        </div>
    )
}

export default SignUp;