import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, List, ListItem, ListItemText, Typography, Avatar } from '@mui/material';
import { collection, getDocs, doc, getDoc, query } from "firebase/firestore";
import { db } from '../firebaseConfig';


interface ContactLink {
  id?: string;
  service: string;
  url: string;
}

const PublicProfile = () => {
  const { userIdUrl } = useParams<{ userIdUrl: string }>();
  const [links, setLinks] = useState<ContactLink[]>([]);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  useEffect(() => {
    if (userIdUrl) {
      fetchProfileData(userIdUrl);
    }
  }, [userIdUrl]);

  const fetchProfileData = async (uid: string) => {
      await fetchLinks(uid);
      await fetchUserProfilePhoto(uid);
  };
  
  const fetchLinks = async (uid: string) => {
    const q = query(collection(db, "users", uid, "contactLinks"));
    const querySnapshot = await getDocs(q);
    const linksData = querySnapshot.docs.map((doc) => Object.assign({}, doc.data(), { id: doc.id }) as ContactLink);
    setLinks(linksData);
  };
  
  const fetchUserProfilePhoto = async (uid: string) => {
    const docRef = doc(db, "users", uid, "userProfile", "userImage");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      setUserPhoto(docSnap.data().url);
    }
  };

  
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        QUIKLINK.ME
      </Typography>
      {userPhoto && (
        <Avatar
          src={userPhoto}
          alt="User profile"
          style={{ borderRadius: '50%', width: '150px', height: '150px', display: 'block', margin: '0 auto' }}
        />
      )}
      <List>
        {links.map((link, index) => (
          <ListItem button component="a" href={link.url} target="_blank" key={index}>
            <ListItemText primary={link.service} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PublicProfile;
