"use client";
import { auth } from "@/firebase/firebase.config";
import { useAuthState } from 'react-firebase-hooks/auth';


const ProfilePage = () => {
  const [user, loading] = useAuthState(auth);
  const headerCopy = 'Profile';
  const subHeaderCopy = (
    <>
      Your data is safe with me. I will never share your email or information
      with anyone.
    </>
  );

  
  return (
    <div className={'-mt-3'}>
      <h1 className="text-[3.25rem] font-normal">{headerCopy}</h1>
      <p className="f text-left mt-1">{subHeaderCopy}</p>
      {user && (
        <p className="text-xs">
          Auth: <span className="text-accent3">{user?.email}</span>
        </p>
      )}
       <div className="ops mt-[2vh] flex_">
        {/* <ProfileForm/> */}
       </div>
    </div>
  );
};

export default ProfilePage;
