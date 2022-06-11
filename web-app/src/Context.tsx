import React, { createContext, PropsWithChildren } from "react";
import { useQuery } from "react-query";
import Tracker from "@openreplay/tracker";

import { IState } from "./types";
import {
  fetchAuthUser,
  setAuthInLS,
  unsetAuthFromLS,
} from "./services/auth.service";
import { fetchAuthUserKey } from "./utils/queryKeys";
import { Mixpanel } from "./libs/mixpanel";

export const StateContext = createContext<any>({});

const tracker = new Tracker({
  projectKey: "r1HhnyizGWbqMrcbo3oU",
  __DISABLE_SECURE_MODE: true,
});
if (process.env.NODE_ENV === "production") {
  tracker.start();
}

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

  useQuery(fetchAuthUserKey, () => fetchAuthUser(), {
    staleTime: 1000 * 60 * 5,
    onSuccess: (user) => {
      if (user) {
        Mixpanel.identify(user.email);
        Mixpanel.people.set({
          $first_name: user.firstname,
          $last_name: user.lastname,
          $email: user.email,
        });

        setAuthInLS(user.uuid || null);
        if (process.env.NODE_ENV === "production") {
          tracker.setUserID(user.email || null);
        }
        setState({
          ...state,
          auth: {
            ...state.auth,
            isLoggedIn: user ? true : false,
            user: user,
          },
        });
      } else {
        unsetAuthFromLS();
      }
    },
  });

  return (
    <StateContext.Provider value={providerValue}>
      {props.children}
    </StateContext.Provider>
  );
}
