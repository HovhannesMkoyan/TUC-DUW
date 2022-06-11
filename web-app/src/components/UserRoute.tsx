import { Route } from "react-router-dom";
import { Redirect } from "react-router";

import { getAuthFromLS } from "../services/auth.service";

export default function UserRoute({
  component: Comp,
  path,
  ...rest
}: {
  component: any;
  path: any;
}) {
  const isLoggedIn = getAuthFromLS() !== null ? true : false;

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return isLoggedIn ? (
          <Comp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        );
      }}
    />
  );
}
