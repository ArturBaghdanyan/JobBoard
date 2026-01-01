import { authService } from "../../services/authService";
import type { UserProfile } from "../../types/auth";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AddDetailsForm } from "./addDetailsForm";
import person from "../../assets/person.jpg";
import { MdEdit } from "react-icons/md";
import Modal from "../../components/Modal/Modal";

import style from "./style.module.scss";
import UserHeader from "./UserHeader";

interface IPersonal {
  user: UserProfile;
  showUserDetails: boolean;
  setShowUserDetails: Dispatch<SetStateAction<boolean>>;
}
const Personal = ({
  user: initialUser,
  showUserDetails,
  setShowUserDetails,
}: IPersonal) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowUserDetails(true);
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleSaveDetails = (details: UserProfile["details"]) => {
    const updatedUser = { ...user, details };
    setUser(updatedUser);
    authService.saveUser(updatedUser);
    setShowUserDetails(false);
  };

  return (
    <div className={style.profile_header}>
      <div className={style.profile_avatar}>
        <img src={person} alt="avatar" />
      </div>

      {user && <UserHeader user={user} />}

      <MdEdit onClick={() => setShowUserDetails((prev) => !prev)} />

      {showUserDetails && (
        <Modal onClose={() => setShowUserDetails(false)}>
          <AddDetailsForm
            initialData={user.details}
            onSave={handleSaveDetails}
          />
        </Modal>
      )}
    </div>
  );
};

export default Personal;
