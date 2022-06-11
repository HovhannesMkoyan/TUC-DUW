import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./payment-form/PaymentForm";
import SubscriptionAdvantages from "./SubscriptionAdvantages/SubscriptionAdvantages";
import Modal from "../../HelperComponents/Modal/Modal";
import { StateContext } from "../../../Context";
import "./NotSubscribedPage.css";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export default function NotSubscribedPage(): JSX.Element {
  const { state, setState } = React.useContext(StateContext);
  const [subscriptionType, setSubscriptionType] = React.useState<
    "monthly" | "yearly"
  >("monthly");
  const [subscriptionPaymentModalOpen, setSubscriptionPaymentModalOpen] =
    React.useState<boolean>(false);
  const [subscribedSuccessfully, setSubscribedSuccessfully] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    setState({
      ...state,
      ui: {
        ...state.ui,
        noHeaderShadow: true,
        headerWithOnlyLogo: true,
      },
    });

    return () => {
      setState({
        ...state,
        ui: {
          ...state.ui,
          noHeaderShadow: false,
          headerWithOnlyLogo: false,
        },
      });
    };
  }, []);

  return (
    <section className="eb-main_container eb-new-subscription_container">
      <div className="subscription-wrapper">
        <h1>Բաժանորդագրություն</h1>
        <div className="subscription-types_container df df-ac">
          <div
            className={`subscription-type_container ${
              subscriptionType === "monthly" ? "subscription-type-active" : ""
            }`}
            onClick={() => setSubscriptionType("monthly")}
          >
            <p className="subscription-type-name">Ամսական</p>
            <div className="subscription-type-price_container">
              {/* <span>֏</span> */}
              <span>{process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE}</span>
              <span>դրամ</span>
            </div>
            <p className="subscription-type-info">
              Ամսական վճարում, <br /> չեղարկեք ցանկացած ժամանակ
            </p>
          </div>
          <div
            className={`subscription-type_container ${
              subscriptionType === "yearly" ? "subscription-type-active" : ""
            }`}
            onClick={() => setSubscriptionType("yearly")}
          >
            <div className="tooltip">
              <span>
                −
                {Math.round(
                  ((parseInt(
                    process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE!
                  ) -
                    parseInt(
                      process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE_BY_MONTH!
                    )) /
                    parseInt(
                      process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE!
                    )) *
                    100
                )}
                %
              </span>
            </div>
            <p className="subscription-type-name">Տարեկան</p>
            <div className="subscription-type-price_container">
              {/* <span>֏</span> */}
              <span>
                {process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE_BY_MONTH}
              </span>
              <span>դրամ</span>
            </div>
            <p className="subscription-type-info">
              Տարեկան վճարում, <br /> տարեկան վճարեք{" "}
              {process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE} դրամ
            </p>
          </div>
        </div>
        <div className="eb-plan_container">
          <SubscriptionAdvantages subscriptionType={subscriptionType} />
          <div
            className="eb-plan-choose_container"
            onClick={() => setSubscriptionPaymentModalOpen(true)}
          >
            Բաժանորդագրվել
          </div>
        </div>
      </div>

      <Modal
        onclose={() => {
          setSubscriptionPaymentModalOpen(false);

          if (subscribedSuccessfully) {
            window.location.reload();
          }
        }}
        isOpen={subscriptionPaymentModalOpen}
        classnames="payment-modal"
      >
        <Elements stripe={stripePromise}>
          <PaymentForm
            subscriptionType={subscriptionType}
            setSubscribedSuccessfully={setSubscribedSuccessfully}
          />
        </Elements>
      </Modal>
    </section>
  );
}
