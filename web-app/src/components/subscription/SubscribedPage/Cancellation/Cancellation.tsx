import React from "react";

import OvalLoader from "../../../HelperComponents/OvalLoader/OvalLoader";
import PaymentSuccess from "../../NotSubscribedPage/payment-success/PaymentSuccess";
import "./Cancellation.css";

import { cancelSubscription } from "../../../../services/user.service";

const reasons = Object.freeze({
  COSTLY: "IS_COSTLY",
  IS_REDUNDANT: "IS_REDUNDANT",
  FOUND_ALTERNATIVE: "FOUND_ALTERNATIVE",
  OTHER_REASON: "OTHER_REASON",
});

export default function Cancellation(props: { closeModal: any }) {
  const [showCancellationReasons, setShowCancellationReasons] =
    React.useState<boolean>(false);

  return (
    <>
      {!showCancellationReasons ? (
        <>
          <h3>Չեղարկե՞լ բաժանորդագրությունը</h3>
          <div>
            <p>
              Դուք պատրաստվում եք չեղարկել Ձեր բաժանորդագրությունը: Շարունակելու
              դեպքում Դուք չեք կարողանա օգտվել կայքի մի շարք ծառայություններից։
            </p>
            <div className="subscription-cancel-actions_container">
              <button onClick={() => setShowCancellationReasons(true)}>
                Շարունակել
              </button>
            </div>
          </div>
        </>
      ) : (
        <CancellationReasons closeModal={props.closeModal} />
      )}
    </>
  );
}

function CancellationReasons(props: { closeModal: any }) {
  const [chosenReason, setChosenReason] = React.useState("");
  const [comment, setComment] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);
  const [success, setSuccess] = React.useState<boolean>(false);

  const handleCancellation = async () => {
    setLoading(true);
    const status = await cancelSubscription(chosenReason, comment.trim());

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
          <h3>Խնդրում ենք նշել չեղարկման պատճառը</h3>
          <div style={{ textAlign: "left" }}>
            <div className="cancellation-reasons_container">
              <div>
                <input
                  type="checkbox"
                  value={chosenReason}
                  onChange={() => setChosenReason(reasons.COSTLY)}
                  name="costly"
                  id="checkbox-costly"
                  checked={chosenReason === reasons.COSTLY ? true : false}
                />
                <label htmlFor="checkbox-costly">
                  Բաժանորդագրությունը թանկ է
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={chosenReason}
                  onChange={() => setChosenReason(reasons.IS_REDUNDANT)}
                  name="redundant"
                  id="checkbox-redundant"
                  checked={chosenReason === reasons.IS_REDUNDANT ? true : false}
                />
                <label htmlFor="checkbox-redundant">
                  Ծառայության կարիքը այլևս չեմ զգում
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={chosenReason}
                  onChange={() => setChosenReason(reasons.FOUND_ALTERNATIVE)}
                  name="alternative"
                  id="checkbox-alternative"
                  checked={
                    chosenReason === reasons.FOUND_ALTERNATIVE ? true : false
                  }
                />
                <label htmlFor="checkbox-alternative">
                  Օգտագործում եմ նմանատիպ այլ ծառայություն
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  value={chosenReason}
                  onChange={() => setChosenReason(reasons.OTHER_REASON)}
                  name="other"
                  id="checkbox-other"
                  checked={chosenReason === reasons.OTHER_REASON ? true : false}
                />
                <label htmlFor="checkbox-other">Այլ</label>
              </div>
              <div>
                <textarea
                  placeholder="Մեկնաբանություններ..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  name="comment"
                  style={{ boxShadow: "0 1px 3px lightgrey" }}
                />
              </div>
            </div>
            <div className="subscription-cancel-actions_container">
              {chosenReason !== "" && (
                <button
                  disabled={loading}
                  onClick={() => handleCancellation()}
                  className={`${loading && "disabled"}`}
                >
                  {loading ? (
                    <div className="df df-center">
                      <OvalLoader size="sm" color="gray" />
                      <span style={{ color: "white", marginLeft: "5px" }}>
                        Չեղարկում
                      </span>
                    </div>
                  ) : (
                    "Չեղարկել"
                  )}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <PaymentSuccess text="Դուք հաջողությամբ չեղարկել եք Ձեր բաժանորդագրությունը" />
        </>
      )}
    </>
  );
}
