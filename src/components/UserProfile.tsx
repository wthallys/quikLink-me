import { Avatar, Badge, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";

const UserProfile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setOpen(true);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleSave = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
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
