import Header from "./desktop/Header";
import MobileHeader from "./mobile/MobileHeader";

import style from "./style.module.scss";

interface AppHeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onCreateJob: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppHeader = (props: AppHeaderProps) => {

  return (
    <>
      <div className={style.desktop}>
        <Header {...props} darkMode={props.darkMode} setDarkMode={props.setDarkMode} />
      </div>

      <div className={style.mobile}>
        <MobileHeader {...props} darkMode={props.darkMode} setDarkMode={props.setDarkMode}/>
      </div>
    </>
  );
};
