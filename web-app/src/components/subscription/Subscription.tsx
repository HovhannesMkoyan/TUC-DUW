import { useQuery } from "react-query";

import NotSubscribedPage from "./NotSubscribedPage/NotSubscribedPage";
import SubscribedPage from "./SubscribedPage/SubscribedPage";
import {
  fetchUserInfo,
  fetchUserSubscription,
} from "../../services/user.service";
import InPageLoader from "../in-page-loader/InPageLoader";

export default function Subscription(): JSX.Element {
  const { isLoading: userLoading, data: user } = useQuery(
    ["fetchUserInfo", localStorage.getItem("auid")!],
    () => fetchUserInfo()
  );

  const { isLoading: subscriptionLoading, data: subscription } = useQuery(
    ["fetchUserSubscription", localStorage.getItem("auid")!],
    () => fetchUserSubscription()
  );

  return (
    <>
      {userLoading || subscriptionLoading ? (
        <InPageLoader />
      ) : (
        <>
          {user?.is_subscribed ? (
            <SubscribedPage user={user} subscription={subscription} />
          ) : (
            <NotSubscribedPage />
          )}
        </>
      )}
    </>
  );
}
