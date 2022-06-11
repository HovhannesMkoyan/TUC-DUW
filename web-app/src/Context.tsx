import React, { createContext, PropsWithChildren } from "react";

import { IState } from "./types";
import {
  fetchAuthUser,
  setAuthInLS,
  unsetAuthFromLS,
} from "./services/auth.service";
import { fetchAuthUserKey } from "./utils/queryKeys";

export const StateContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
  const [state, setState] = React.useState<IState>({
    auth: {
      isLoggedIn: localStorage.getItem("auid") ? true : false,
      user: null,
    },
    ui: {
      showOverPageLoader: false,
      hiddenHeader: false,
      noHeaderShadow: false,
      headerWithOnlyLogo: false,
      hiddenFooter: false,
      lang: setLanguage(),
    },
    books: [],
  });

  if (!localStorage.getItem("lang")) {
    localStorage.setItem("lang", "am");
    setState({
      ...state,
      ui: {
        ...state.ui,
        lang: "am",
      },
    });
  }

  function setLanguage(): "en" | "am" {
    let languaageInStorage = localStorage!.getItem("lang");

    if (languaageInStorage === "am" || languaageInStorage === "en") {
      return languaageInStorage;
    } else {
      return "am";
    }
  }

  const providerValue = React.useMemo(
    () => ({ state, setState }),
    [state, setState]
  );

  return (
    <StateContext.Provider value={providerValue}>
      {props.children}
    </StateContext.Provider>
  );
}
