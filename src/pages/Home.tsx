import { Link } from "react-router-dom";

const Home = () => {

  return (
    <>
      <div>Links aqui</div>
      <p>Ainda não tem uma conta? <Link to='/signup'>Cadastre-se</Link></p>
    </>
  )
}

export default Home;