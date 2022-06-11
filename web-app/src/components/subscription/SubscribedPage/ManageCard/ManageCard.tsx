import React from "react";
import { useQuery } from "react-query";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../../HelperComponents/Tooltip/Tooltip";
import DotsLoader from "../../../HelperComponents/DotsLoader/DotsLoader";
import ChangeCard from "./ChangeCard";
import { fetchCard } from "../../../../services/user.service";
import "./ManageCard.css";

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);

export default function ManageCard() {
  const [showCardUpdateForm, setShowCardUpdateForm] =
    React.useState<boolean>(false);

  const { isLoading: cardLoading, data: card } = useQuery(
    ["fetchCard", localStorage.getItem("auid")!],
    async () => {
      const data = await fetchCard(localStorage.getItem("auid")!);
      console.log(data);
      return data;
    }
  );

  return (
    <>
      {cardLoading ? (
        <DotsLoader size="xl" />
      ) : (
        <>
          {showCardUpdateForm ? (
            <Elements stripe={stripePromise}>
              <ChangeCard />
            </Elements>
          ) : (
            <>
              <div className="df df-ac df-center card-info_container">
                <p>
                  <span>**** **** ****</span> {card?.card.last4}
                </p>
                <Tooltip text="Կայքին հասանելի է Ձեր քարտի միայն վերջին 4 թվերը">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="sub-info-icon"
                  />
                </Tooltip>
              </div>
              <div
                className="update-card-link"
                onClick={() => setShowCardUpdateForm(true)}
              >
                <p>Թարմացնել քարտը</p>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
