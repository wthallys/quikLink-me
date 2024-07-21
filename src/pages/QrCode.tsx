import Button from "@mui/material/Button"
import { useNavigate, useParams } from "react-router-dom"

const QrCode = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleEditClick = () => {
    navigate(`/${userId}/edit`)
  }

  return (
    <>
      <Button variant="contained">Sair</Button>
      <div>QrCode here</div>
      <Button onClick={handleEditClick} variant="outlined">
        Editar info
      </Button>
    </>
  )
}

export default QrCode