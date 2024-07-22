import Button from "@mui/material/Button"
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebaseConfig";

const QrCode = () => {
  const navigate = useNavigate();
  const { userIdUrl } = useParams();

  const handleEditClick = () => {
    navigate(`/user/${userIdUrl}/edit`)
  }

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  }

  return (
    <>
      <Button onClick={handleLogout} variant="contained">Sair</Button>
      <div>QrCode here</div>
      <Button onClick={handleEditClick} variant="outlined">
        Editar info
      </Button>
    </>
  )
}

export default QrCode