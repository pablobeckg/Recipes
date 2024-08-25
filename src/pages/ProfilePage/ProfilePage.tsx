import { useEffect, useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import supabaseClient from '../../lib/supabaseClient';
import { Profile } from '../../types/supabase-types-own';
import "./ProfilePage.css"

const ProfilePage = () => {
  const userContext = useUserContext();
  const user = userContext?.user;
  const [profile, setProfile] = useState<Profile>();

  if (!user) {
    return;
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log('fetch called');

      const profileResponse = await supabaseClient.from('profiles').select('*').eq('id', user.id).single();
      console.log(supabaseClient)

      if (profileResponse.error) {
        console.error('Error getting profile', profileResponse.error.message);
      }

      if (profileResponse.data) {
        setProfile(profileResponse.data);
      }
    };
    fetchUserProfile();
  }, [user]);

  return (
    <div className="profile-page">
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