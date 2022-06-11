import React from "react";
import { useQuery } from "react-query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCreditCard,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";

import ManageCard from "./ManageCard/ManageCard";
import Cancellation from "./Cancellation/Cancellation";
import Reactivation from "./Reactivation/Reactivation";
import Invoices from "./Invoices/Invoices";
import SubscriptionAdvantages from "../NotSubscribedPage/SubscriptionAdvantages/SubscriptionAdvantages";
import Modal from "../../HelperComponents/Modal/Modal";

import { fetchInvoices } from "../../../services/user.service";
import {
  getMonthName,
  dateDiffInDays,
} from "../../../helpers/date-manipulations";
import "./SubscribedPage.css";
import { IUser, ISubscription } from "../../../types";

export default function SubscribedPage({
  user,
  subscription,
}: {
  user: IUser;
  subscription: ISubscription;
}): JSX.Element {
  const [daysTillNextPayment, setDaysTillNextPayment] =
    React.useState<number>(0);
  const [nextBillingDate, setNextBillingDate] = React.useState<{
    day: string;
    month: string;
    year: string;
  }>({ day: "", month: "", year: "" });
  const [nextBillingDateAMSentence, setNextBillingDateAMSentence] =
    React.useState<string>("");
  const [subscriptionInfoModalOpen, setSubscriptionInfoModalOpen] =
    React.useState<boolean>(false);
  const [cardManagementModalOpen, setCardManagementModalOpen] =
    React.useState<boolean>(false);
  const [cancelSubModalOpen, setCancelSubModalOpen] =
    React.useState<boolean>(false);
  const [reactivateSubModalOpen, setReactivateSubModalOpen] =
    React.useState<boolean>(false);

  const { isLoading: invoicesLoading, data: invoices } = useQuery(
    ["fetchInvoices", localStorage.getItem("auid")!],
    async () => {
      const data = await fetchInvoices(localStorage.getItem("auid")!);

      let nextInvoiceDate = subscription.next_payment_date as any;
      setDaysTillNextPayment(
        dateDiffInDays(new Date().getTime() / 1000, nextInvoiceDate)
      );

      nextInvoiceDate = new Date(nextInvoiceDate * 1000);
      nextInvoiceDate = {
        day: nextInvoiceDate.getDate(),
        month: nextInvoiceDate.getMonth() + 1,
        year: nextInvoiceDate.getFullYear(),
      };
      setNextBillingDate(nextInvoiceDate);

      setNextBillingDateAMSentence(
        `${getMonthName(nextInvoiceDate.month)} ${nextInvoiceDate.day}, ${
          nextInvoiceDate.year
        }`
      );

      return data;
    }
  );

  return (
    <section className="eb-main_container">
      <main className="eb-subscription-main">
        <div className="eb-user-profile-info_container">
          <h1>Բաժանորդագրություն</h1>
          <div className="eb-subscribed-top_container df">
            <div className="eb-subscription-status_container">
              {subscription.subscription_status === "active" && (
                <>
                  <h4>Ակտիվ</h4>
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="sub-info-icon"
                    style={{ marginLeft: "5px" }}
                    onClick={() => setSubscriptionInfoModalOpen(true)}
                  />
                </>
              )}
              {subscription.subscription_status === "pending-cancellation" && (
                <h4
                  style={{ cursor: "pointer" }}
                  onClick={() => setReactivateSubModalOpen(true)}
                >
                  Վերականգնել բաժանորդագրությունը
                </h4>
              )}
            </div>
            <div>
              <p>Դուք ունեք {user.dl} ներբեռնման հնարավորություն</p>
            </div>
            <div>
              {subscription.subscription_status === "pending-cancellation" && (
                <p>
                  Դուք կարող եք օգտվել բաժանորդագրության առավելություններից
                  մինչև {nextBillingDateAMSentence}, որից հետո Ձեր
                  բաժանորդագրությունը վերջնականապես կդադարի գործել։
                </p>
              )}
              {subscription.subscription_status === "active" && (
                <div className="subscription-actions_container df">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="sub-card-icon"
                    onClick={() => setCardManagementModalOpen(true)}
                  />
                  <FontAwesomeIcon
                    icon={faPowerOff}
                    className="sub-cancel-icon"
                    onClick={() => setCancelSubModalOpen(true)}
                  />
                </div>
              )}
            </div>
          </div>

          <Invoices
            invoicesLoading={invoicesLoading}
            invoices={invoices}
            nextBillingDateAMSentence={
              subscription.subscription_status === "active"
                ? nextBillingDateAMSentence
                : null
            }
          />
        </div>
      </main>

      <Modal
        onclose={() => setSubscriptionInfoModalOpen(false)}
        isOpen={subscriptionInfoModalOpen}
      >
        <div className="eb-modal-plan-features_container">
          <SubscriptionAdvantages
            subscriptionType={subscription.subscription_type}
          />
        </div>
      </Modal>

      <Modal
        onclose={() => setCardManagementModalOpen(false)}
        isOpen={cardManagementModalOpen}
      >
        <ManageCard />
      </Modal>

      <Modal
        onclose={() => setCancelSubModalOpen(false)}
        isOpen={cancelSubModalOpen}
      >
        <Cancellation closeModal={() => setCancelSubModalOpen(false)} />
      </Modal>

      <Modal
        onclose={() => setReactivateSubModalOpen(false)}
        isOpen={reactivateSubModalOpen}
      >
        <Reactivation closeModal={() => setReactivateSubModalOpen(false)} />
      </Modal>
    </section>
  );
}
