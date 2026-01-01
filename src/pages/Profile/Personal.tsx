import type { UserProfile } from "../../types/auth";
import person from "../../assets/person.jpg";
import { MdEdit } from "react-icons/md";

import style from "./style.module.scss";
import Modal from "../../components/Modal/Modal";
import type { Dispatch, SetStateAction } from "react";
import { AddDetailsForm } from "./addDetailsForm";
import { useEffect } from "react";

interface IPersonal {
  user: UserProfile;
  showUserDetails: boolean;
  setShowUserDetails: Dispatch<SetStateAction<boolean>>;
}
const Personal = ({ user, showUserDetails, setShowUserDetails }: IPersonal) => {
  useEffect(() => {
    setTimeout(() => {
      setShowUserDetails(true);
    }, 1000);
  });
  return (
    <div className={style.profile_header}>
      <div className={style.profile_avatar}>
        <img src={person} alt="avatar" />
      </div>

      {user && (
        <div className={style.profile_info}>
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      )}

      <MdEdit onClick={() => setShowUserDetails((prev) => !prev)} />

      {showUserDetails && (
        <Modal onClose={() => setShowUserDetails(false)}>
          <AddDetailsForm setShowUserDetails={setShowUserDetails} />
        </Modal>
      )}
    </div>
  );
};

export default Personal;
