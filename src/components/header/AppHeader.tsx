import { useState } from "react";
import Header from "./desktop/Header";
import MobileHeader from "./mobile/MobileHeader";

import style from "./style.module.scss";

interface AppHeaderProps {
  onSignIn: () => void;
  onSignUp: () => void;
  onCreateJob: () => void;
}

export const AppHeader = (props: AppHeaderProps) => {
  const [darkMode] = useState(false);

  return (
    <>
   
      <div className={style.desktop}>
        <Header {...props} darkMode={darkMode} />
      </div>

      <div className={style.mobile}>
        <MobileHeader {...props} />
      </div>
    </>
  );
};
