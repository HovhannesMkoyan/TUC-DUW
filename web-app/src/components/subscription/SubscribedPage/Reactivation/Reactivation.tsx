import React from "react";

import OvalLoader from "../../../HelperComponents/OvalLoader/OvalLoader";
import PaymentSuccess from "../../NotSubscribedPage/payment-success/PaymentSuccess";
import { reactivateSubscription } from "../../../../services/user.service";

export default function Reactivation(props: { closeModal: any }) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleReactivation = async () => {
    setLoading(true);
    const status = await reactivateSubscription();

    if (status == 200 || status == 204) {
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  return (
    <>
      {!success ? (
        <>
          <h3>Վերականգնել բաժանորդագրությունը</h3>
          <div>
            <p>
              Բաժանորդագրությունը վերականգնելու դեպքում Դուք կրկին կկարողանաք
              օգտվել կայքի բոլոր ծառայություններից և առավելություններից։
            </p>
            <div className="subscription-cancel-actions_container">
              <button
                disabled={loading}
                onClick={() => handleReactivation()}
                className={`${loading && "disabled"}`}
              >
                {loading ? (
                  <div className="df df-center">
                    <OvalLoader size="sm" />
                    <span style={{ color: "white", marginLeft: "5px" }}>
                      Վերականգնում
                    </span>
                  </div>
                ) : (
                  "Վերականգնել"
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <PaymentSuccess text="Ձեր բաժանորդագրությունը հաջողությամբ վերականգնվել է" />
        </>
      )}
    </>
  );
}
