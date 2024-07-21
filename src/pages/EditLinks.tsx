import Button from "@mui/material/Button"
import { useNavigate, useParams } from "react-router-dom"

const EditLinks = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const handleQrCodeClick = () => {
    navigate(`/user/${userId}`)
  }

  return (
    <>
      <Button variant="contained">Sair</Button>
      <div>Edit options here</div>
      <Button onClick={handleQrCodeClick} variant="outlined">
        QrCode
      </Button>
    </>
  )
}

export default EditLinks