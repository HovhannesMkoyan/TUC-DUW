import React, { createContext, PropsWithChildren } from "react";

import { IState } from "./types";
export const StateContext = createContext<any>({});

export default function Context(props: PropsWithChildren<any>) {
  const [state, setState] = React.useState<IState>({
    ui: {
      showOverPageLoader: false,
      hiddenHeader: false,
    },
  });

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
