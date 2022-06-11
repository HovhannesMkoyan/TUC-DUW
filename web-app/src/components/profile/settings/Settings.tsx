import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import { fetchUserInfo } from "../../../services/user.service";
import { fetchAuthUserKey } from "../../../utils/queryKeys";
import InPageLoader from "../../in-page-loader/InPageLoader";
import Tooltip from "../../HelperComponents/Tooltip/Tooltip";
import "./Settings.css";

export default function Settings(): JSX.Element {
  const {
    isLoading,
    isSuccess,
    data: user,
  } = useQuery([fetchAuthUserKey, localStorage.getItem("auid")!], () =>
    fetchUserInfo()
  );

  return (
    <section className="eb-main_container eb-profile_container">
      <main className="eb-profile-main">
        <div className="df df-ac df-center">
          <h1 style={{ textAlign: "center" }}>Հաշվի տվյալներ</h1>
          <span style={{ marginLeft: "5px" }}>
            <Tooltip text="Տվյալները փոփոխության ենթակա չեն">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="sub-info-icon"
                style={{ transform: "translateY(-2px)" }}
              />
            </Tooltip>
          </span>
        </div>
        <div className="eb-profile-settings_container">
          {isLoading && <InPageLoader />}
          {isSuccess && (
            <div className="eb-profile-settings-form">
              <div className="eb-settings-input_container">
                <label htmlFor="firstname">Անուն</label>
                <div className="eb-input">{user.firstname}</div>
              </div>
              <div className="eb-settings-input_container">
                <label htmlFor="lastname">Ազգանուն</label>
                <div className="eb-input">{user.lastname}</div>
              </div>
              <div className="eb-settings-input_container">
                <label htmlFor="email">Էլ. հասցե</label>
                <div className="eb-input">{user.email}</div>
              </div>
              <div className="eb-settings-input_container">
                <label htmlFor="dl">Ներբեռնման հնարավորություն</label>
                <div className="eb-input">{user.dl}</div>
              </div>

              <div className="eb-settings-auth-info df">
                <p className="df">
                  Դուք գրանցվել եք{" "}
                  <img
                    src={`/images/${user?.provider}.svg`}
                    alt="auth provider img"
                  />
                  -ի հաշվի միջոցով
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}
