import Button from "@mui/material/Button"
import { useNavigate, useParams } from "react-router-dom"
import UserProfile from "../components/UserProfile";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Container, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from "@mui/material";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface ContactLink {
  id?: string;
  service: string;
  url: string;
}

const EditLinks = () => {
  const navigate = useNavigate();
  const { userIdUrl } = useParams();
  
  const handleQrCodeClick = () => {
    navigate(`/user/${userIdUrl}`);
  }

  const [links, setLinks] = useState<ContactLink[]>([]);
  const [open, setOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ContactLink | null>(null);
  const [url, setUrl] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchLinks(user.uid);
      } else {
        setUserId(null);
        setLinks([]);
      }
    });
  }, []);

  const fetchLinks = async (uid: string) => {
    const q = query(collection(db, "users", uid, "contactLinks"));
    const querySnapshot = await getDocs(q);
    const linksData = querySnapshot.docs.map((doc) => Object.assign({}, doc.data(), { id: doc.id }) as ContactLink);
    setLinks(linksData);
  };

  const handleAddClick = () => {
    setEditingLink(null);
    setUrl('');
    setOpen(true);
  };

  const handleEditClick = (link: ContactLink) => {
    setEditingLink(link);
    setUrl(link.url);
    setOpen(true);
  };

  const handleDeleteClick = async (link: ContactLink) => {
    if (link.id && userId) {
      await deleteDoc(doc(db, "users", userId, "contactLinks", link.id));
      setLinks(links.filter(l => l.id !== link.id));
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    if (!userId) return;

    const service = new URL(url).hostname.replace('www.', '').split('.')[0];

    if (editingLink) {
      if (editingLink.id) {
        await updateDoc(doc(db, "users", userId, "contactLinks", editingLink.id), { service, url });
        setLinks(links.map(link => link.id === editingLink.id ? { ...link, service, url } : link));
      }
    } else {
      const docRef = await addDoc(collection(db, "users", userId, "contactLinks"), { service, url });
      setLinks([...links, { service, url, id: docRef.id }]);
    }
    setOpen(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  }

  return (
    <Container>
      <Button onClick={handleLogout} variant="contained">Sair</Button>
      <UserProfile />
      <List>
        {links.map((link, index) => (
          <ListItem key={index}>
            <ListItemText primary={link.service} />
            <ListItemSecondaryAction>
              <IconButton edge="end" onClick={() => handleEditClick(link)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteClick(link)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddClick}>
        Add Link
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingLink ? 'Edit Link' : 'Add Link'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Button onClick={handleQrCodeClick} variant="outlined">QrCode</Button>
    </Container>
  )
}

export default EditLinks