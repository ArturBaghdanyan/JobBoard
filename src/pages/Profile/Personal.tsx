import type { UserProfile } from "../../types/auth";
import person from "../../assets/person.jpg";

import style from "./style.module.scss";
import { MdEdit } from "react-icons/md";
import { useEffect } from "react";

interface IPersonal {
  user: UserProfile;
}
const Personal = ({ user }: IPersonal) => {

    useEffect(() => {
        setTimeout(() => {
            alert('please add your details')
        },2000)
    })
  return (
    <div className={style.profile_header}>
      <div className={style.profile_avatar}>
        <img src={person} alt="avatar" />
      </div>

      {user && (
        <div className={style.profile_info}>
          <h2>{user.username}</h2>
          <div>
            <p>{user.email}</p>
          </div>
        </div>
      )}
      <MdEdit />
    </div>
  );
};

export default Personal;
