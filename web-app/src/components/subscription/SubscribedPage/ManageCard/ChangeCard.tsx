import React from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import PaymentSuccess from "../../NotSubscribedPage/payment-success/PaymentSuccess";
import {
  errorMessages,
  CardField,
  SubmitButton,
  ErrorMessage,
} from "../../NotSubscribedPage/payment-form/PaymentComponents";
import { updateCard } from "../../../../services/user.service";

export default function ChangeCard(props: any) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = React.useState<any>(null);
  const [cardComplete, setCardComplete] = React.useState<boolean>(false);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [cardChangeSucceeded, setCardChangeSucceeded] =
    React.useState<boolean>(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (error) {
      elements.getElement("card")!.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload: any = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement) as any,
      billing_details: {},
    });

    if (payload.error) {
      setProcessing(false);

      typeof payload.error === "string"
        ? setError(payload.error)
        : setError((errorMessages as any)[payload.error.code]);
    } else {
      try {
        const data = await updateCard(payload.paymentMethod.id);

        if (data?.s_error_code) {
          throw new Error(data.s_error_code);
        } else {
          setCardChangeSucceeded(true);
        }
      } catch (_) {
        setProcessing(false);
        setError(
          "Մուտքագրված քարտը մերժվել է: Խնդրում ենք ստուգել տվյալները կամ փորձել այլ քարտ։"
        );
      }
    }
  };

  return (
    <div className="change-card-form_container">
      {!cardChangeSucceeded && (
        <div>
          <form className="Form" onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
              <CardField
                onChange={(e: any) => {
                  if (e.error) {
                    return setError((errorMessages as any)[e.error.code]);
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
              processingText="Խնդրում ենք սպասել ..."
              disabled={!stripe || !cardComplete}
            >
              Պահպանել նոր քարտը
            </SubmitButton>
          </form>
        </div>
      )}
      {cardChangeSucceeded && (
        <PaymentSuccess text="Ձեր վճարման մեթոդը հաջողությամբ թարմացվել է" />
      )}
    </div>
  );
}
