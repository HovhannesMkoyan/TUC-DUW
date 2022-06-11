// @ts-nocheck
import { CardElement } from "@stripe/react-stripe-js";

export const errorMessages = {
  incorrect_number: "Մուտքագրված քարտի համարը սխալ է",
  invalid_number: "Մուտքագրված քարտի համարը սխալ է",
  invalid_expiry_month: "Մուտքագրված քարտի պիտանելիության ժամկետը սխալ է",
  invalid_expiry_year: "Մուտքագրված քարտի պիտանելիության ամսաթիվը սխալ է",
  invalid_expiry_month_past: "Մուտքագրված քարտի պիտանելիության ժամկետը սխալ է",
  invalid_expiry_year_past: "Մուտքագրված քարտի պիտանելիության ժամկետը սխալ է",
  invalid_cvc: "Մուտքագրված քարտի CVV/CVC կոդը սխալ է",
  expired_card: "Մուտքագրված քարտի պիտանելիության ժամկետը լրացել է",
  incorrect_cvc: "Մուտքագրված քարտի CVV/CVC կոդը սխալ է",
  incorrect_zip: "The card's zip code failed validation.",
  card_declined: "Մուտքագրված քարտը մերժվել է",
  missing: "There is no card on a customer that is being charged.",
  processing_error:
    "Ինչ-որ սխալ է տեղի ունեցել վճարման ընթացքում։ Խնդրում ենք կրկին փորձել։",
  rate_limit:
    "An error occurred due to requests hitting the API too quickly. Please let us know if you're consistently running into this error.",
};

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#4a5656",
      color: "#4a5656",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "18px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#4a5656",
      },
    },
    invalid: {
      iconColor: "#4a5656",
      color: "#4a5656",
    },
  },
  hidePostalCode: true,
};

export const CardField = ({ onChange }) => (
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

export const SubmitButton = ({
  processing,
  error,
  processingText,
  children,
  disabled,
}) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? (
      <div className="df df-center">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p style={{ color: "white" }}>{processingText}</p>
      </div>
    ) : (
      children
    )}
  </button>
);

export const ErrorMessage = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#c16767"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    <p>{children}</p>
  </div>
);
