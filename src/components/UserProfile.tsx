import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, storage } from "../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";

const UserProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchImage(user.uid);
      } else {
        setUserId(null);
        setImage(null);
      }
    });
  }, []);

  const fetchImage = async (uid: string) => {
    const docRef = doc(db, "users", uid, "userProfile", "userImage");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setImage(docSnap.data().url);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setOpen(true);
    }
  };

  const handleRemoveImage = async () => {
    if (userId) {
      const imageRef = ref(storage, `images/${userId}/userProfile`);
      const result = listAll(imageRef);
      const fileToDelete = (await result).items[0];
      console.log(result);
      
      await deleteObject(fileToDelete);
      setImage(null);
      await setDoc(doc(db, "users", userId, "userProfile", "userImage"), { url: null });
    }
  };

  const handleSave = async () => {
    if (selectedFile && userId) {
      const imageRef = ref(storage, `images/${userId}/userProfile/${selectedFile.name}`);
      await uploadBytes(imageRef, selectedFile);
      const url = await getDownloadURL(imageRef);
      setImage(url);
      await setDoc(doc(db, "users", userId, "userProfile", "userImage"), { url });
      setOpen(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: "20px" }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="icon-button-file"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="icon-button-file">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <EditIcon />
              </IconButton>
            </label>
            {image && (
              <IconButton
                color="secondary"
                aria-label="remove picture"
                onClick={handleRemoveImage}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </>
        }
      >
        <Avatar src={image || undefined} style={{ width: 100, height: 100 }}>
          {!image && "Add"}
        </Avatar>
      </Badge>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to upload this image?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserProfile;
