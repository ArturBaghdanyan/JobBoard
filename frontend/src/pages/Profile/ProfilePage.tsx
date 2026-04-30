import { useAuth } from "../../shared/hooks/useAuth";
import { useRef, useState } from "react";
import Personal from "../../components/profile/personal/Personal";
import UploadFile from "../../components/profile/uploaded-file/UploadedFile";
import ProfileMenu from "../../components/profile/profile-menu/ProfileMenu";

import style from "./style.module.scss";

const ProfilePage = () => {
  const { user } = useAuth();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  return (
    <div className={style.profile}>
      <ProfileMenu />
      <main className="container">
        {user && (
          <div className={style.profile_row}>
            <Personal
              user={user}
              showUserDetails={showUserDetails}
              setShowUserDetails={setShowUserDetails}
            />
          </div>
        )}
        <div className={style.profile_row}>
          <UploadFile
            cvFile={cvFile}
            setCvFile={setCvFile}
            fileInputRef={fileInputRef}
          />
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
