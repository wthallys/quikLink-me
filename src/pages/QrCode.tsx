import Button from "@mui/material/Button"
import { signOut } from "firebase/auth";
import { useNavigate, useParams } from "react-router-dom"
import { auth } from "../firebaseConfig";
import QRCode from "qrcode.react";

const QrCode = () => {
  const navigate = useNavigate();
  const { userIdUrl } = useParams();
  const hostname = window.location.hostname;
  
  const urlQrCode = `https://${hostname}/${userIdUrl}`;

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
      <div style={{ margin: '20px 0' }}>
        <QRCode size={200} value={urlQrCode} />
      </div>
      <Button onClick={handleEditClick} variant="outlined">
        Editar info
      </Button>
    </>
  )
}

export default QrCode;