import { authService } from "../../../services/authService";
import type { UserProfile } from "../../../types/auth";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import { AddDetailsForm } from "../details-form/addDetailsForm";
import UserHeader from "../user-header/UserHeader";
import Modal from "../../../shared/components/Modal/Modal";

import person from "../../../assets/person.jpg";
import { MdEdit } from "react-icons/md";

import style from "./style.module.scss";

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
    <>
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
    </>
  );
};

export default Personal;
