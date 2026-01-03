import { CiCalendarDate } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { MdLocationCity, MdOutlineEmail } from "react-icons/md";
import type { UserProfile } from "../../../types/auth";

import style from "./style.module.scss";

interface UserHeaderProps {
  user: UserProfile;
}

const UserHeader = ({ user }: UserHeaderProps) => {
  return (
    <div className={style.user}>
      <h2>{user.username}</h2>

      <div className={style.profile_info}>
        <div className={style.profile_info_item}>
          <div className={style.profile_info_item_icon}>
            <MdLocationCity />
          </div>

          <div className={style.profile_info_item_text}>
            <span>City</span>
            <span>{user.details?.city}</span>
          </div>
        </div>
        <div className={style.profile_info_item}>
          <div className={style.profile_info_item_icon}>
            <CiCalendarDate />
          </div>
          <div className={style.profile_info_item_text}>
            <span>Date</span>
            <span>{user.details?.date}</span>
          </div>
        </div>
        <div className={style.profile_info_item}>
          <div className={style.profile_info_item_icon}>
            <BsTelephone />
          </div>
          <div className={style.profile_info_item_text}>
            <span>Tel.</span>
            <span>{user.details?.telephone}</span>
          </div>
        </div>
        <div className={style.profile_info_item}>
          <div className={style.profile_info_item_icon}>
            <MdOutlineEmail />
          </div>
          <div className={style.profile_info_item_text}>
            <span>Email</span>
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
