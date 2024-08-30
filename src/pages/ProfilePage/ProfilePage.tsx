import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import supabaseClient from "../../lib/supabaseClient";
import { Profile } from "../../types/supabase-types-own";
import "./ProfilePage.css";



const ProfilePage = () => {

  const userContext = useUserContext();
  if (!userContext) {
  
    return <div>Loading...</div>;
  }

  const user = userContext?.user;
  const avatarUrl = userContext?.avatarUrl
  const setAvatarUrl = userContext.setAvatarUrl
  const [profile, setProfile] = useState<Profile>();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  // const {avatarUrl, setAvatarUrl} = useUserContext()
  // const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profileResponse = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileResponse.error) {
        console.error("Error getting profile", profileResponse.error.message);
      }

      if (profileResponse.data) {
        setProfile(profileResponse.data);
        if (profileResponse.data.avatar_url) {
          setAvatarUrl(profileResponse.data.avatar_url);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const handleUpload = async () => {
    if (!avatarFile) {
      return null;
    }

    setUploading(true);

    const fileName = avatarFile.name;
    const uploadAvatarResponse = await supabaseClient.storage
      .from("avatars")

      .upload(fileName, avatarFile, { upsert: true });

    if (uploadAvatarResponse.error) {
      console.error(
        "Error uploading avatar",
        uploadAvatarResponse.error.message
      );
      setUploading(true);
      return null;
    }

    const publicUrlForAvatar = await supabaseClient.storage
      .from("avatars")
      .getPublicUrl(fileName);
    if (!publicUrlForAvatar.data) {
      console.error("Error getting public url");
      return null;
    }
    const updateProfilesResponse = await supabaseClient
      .from("profiles")
    
      .update({ avatar_url: publicUrlForAvatar.data.publicUrl })

      .eq("id", user.id);

      setUploading(false);
    if (updateProfilesResponse.error) {
      console.error(
        "Error setting avatar:url",
        updateProfilesResponse.error.message
      );
      return null;
    } else {
      console.log(publicUrlForAvatar.data.publicUrl)
      console.log("Update in profiles table successful");
    }
  };

  return (
    <div className="profile-page">
      {avatarUrl ? <img src={avatarUrl} alt="avatar" className="avatar-image"></img> : <p>No avatar.</p>}
      <div className="upload-container">
        <label>Upload profile picture:</label>
        <br />
        <input
          type="file"
          className="input-file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) {
              setAvatarFile(e.target.files[0]);
              console.log(avatarFile);
            }
          }}
        />
      </div>
      <button onClick={handleUpload} disabled={uploading}>{uploading ? "Uploading..." : 'Upload'}</button>
      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
      <p>
        <strong>First Name: </strong>
        {profile?.first_name}
      </p>
      <p>
        <strong>Last Name: </strong>
        {profile?.last_name}
      </p>
      <p>
        <strong>Sign up at: </strong>
        {new Date(user.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default ProfilePage;
