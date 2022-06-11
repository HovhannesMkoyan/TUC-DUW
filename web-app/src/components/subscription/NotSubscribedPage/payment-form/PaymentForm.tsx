// @ts-nocheck
import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import {
  errorMessages,
  CardField,
  SubmitButton,
  ErrorMessage,
} from "./PaymentComponents";
import PaymentSuccess from "../payment-success/PaymentSuccess";
import {
  createStripeSubscription,
  updateSubscriptionInfo,
} from "../../../../services/user.service";
import "./PaymentForm.css";

const PaymentForm = (props: {
  subscriptionType: "monthly" | "yearly";
  setSubscribedSuccessfully: any;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState(null);
  const [cardComplete, setCardComplete] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [processingText, setProcessingText] = React.useState<string>(
    "Խնդրում ենք սպասել ..."
  );
  const [paymentSucceeded, setPaymentSucceeded] =
    React.useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if (error) {
      elements.getElement("card").focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {},
    });

    if (payload.error) {
      setProcessing(false);
      typeof payload.error === "string"
        ? setError(payload.error)
        : setError(errorMessages[e.error.code]);
    } else {
      try {
        setProcessingText("Վճարման փորձ");
        const data = await createStripeSubscription(
          payload.paymentMethod.id,
          props.subscriptionType
        );

        if (data?.s_error_code) {
          throw new Error(data.s_error_code);
        } else {
          const { status, client_secret, subscription_id, customer_id } = data;

          if (
            status.includes("requires_action") ||
            status.includes("incomplete")
          ) {
            setProcessingText("Հաստատեք վճարումը");
            await stripe
              .confirmCardPayment(client_secret)
              .then(async (result) => {
                if (result.error) {
                  setError("Մենք չկարողացանք հաստատել ձեր քարտը");
                  setProcessing(false);
                } else {
                  setProcessingText("Հաշվի թարմացում");
                  await updateSubscriptionInfo(
                    props.subscriptionType,
                    subscription_id,
                    customer_id
                  );
                  setPaymentSucceeded(true);
                  props.setSubscribedSuccessfully(true);
                }
              });
          } else {
            setProcessingText("Հաշվի թարմացում");
            await updateSubscriptionInfo(
              props.subscriptionType,
              subscription_id,
              customer_id
            );
            setPaymentSucceeded(true);
            props.setSubscribedSuccessfully(true);
          }
        }
      } catch (error) {
        setProcessing(false);
        const error_code =
          error?.response?.data?.s_error_code ||
          error?.message ||
          "generic_decline";
        switch (error_code) {
          case "insufficient_funds":
            setError("Մուտքագրված քարտը չունի բավարար միջոցներ");
            break;
          case "expired_card":
            setError("Մուտքագրված քարտի վավերականության ժամկետը լրացել է");
            break;
          default:
            setError(
              "Մուտքագրված քարտը մերժվել է: Խնդրում ենք ստուգել տվյալները կամ փորձել այլ քարտ։"
            );
            break;
        }
      }
    }
  };

  return (
    <div className="payment_container">
      {!paymentSucceeded && (
        <div>
          <div className="payment-header_container">
            <h2>Բաժանորդագրություն</h2>
            <h3>
              {props.subscriptionType === "monthly"
                ? `${process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE} դրամ/ամիս`
                : `${process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE} դրամ/տարի`}
            </h3>
          </div>
          <form className="Form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
              <CardField
                onChange={(e) => {
                  //console.log("------1------", e);
                  if (e.error) {
                    return setError(errorMessages[e.error.code]);
                  } else {
                    setError("");
                  }

                  return setCardComplete(e.complete);
                }}
              />
            </fieldset>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <SubmitButton
              processing={processing}
              error={error}
              processingText={processingText}
              disabled={!stripe || !cardComplete}
            >
              Բաժանորդագրվել
            </SubmitButton>
          </form>
          <div className="payment-info_container">
            <p>
              {props.subscriptionType === "monthly"
                ? `* Ձեր քարտը կգանձվի ${process.env.REACT_APP_SUBSCRIPTION_MONTHLY_PRICE} դրամով ամեն ամիս`
                : `* Ձեր քարտը կգանձվի ${process.env.REACT_APP_SUBSCRIPTION_YEARLY_PRICE} դրամով ամեն տարի`}
            </p>
            <p>
              * Դուք կարող եք ցանկացած ժամանակ հրաժարվել բաժանորդագրությունից
            </p>
          </div>
        </div>
      )}
      {paymentSucceeded && (
        <PaymentSuccess text="Դուք հաջողությամբ բաժանորդագրվեցիք" />
      )}
    </div>
  );
};

export default PaymentForm;
