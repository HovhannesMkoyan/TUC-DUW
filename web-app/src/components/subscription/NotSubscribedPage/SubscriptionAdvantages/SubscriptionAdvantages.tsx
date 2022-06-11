import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";

import Modal from "../../../HelperComponents/Modal/Modal";

export default function SubscriptionAdvantages({
  subscriptionType,
}: {
  subscriptionType: "monthly" | "yearly";
}) {
  const [readOnlineExplanationModalOpen, setReadOnlineExplanationModalOpen] =
    React.useState<boolean>(false);
  const [statisticsModalOpen, setStatisticsModalOpen] =
    React.useState<boolean>(false);

  return (
    <div>
      <div className="eb-plan-feature_container">
        <FontAwesomeIcon icon={faCheckSquare} />
        <p>
          {subscriptionType === "monthly"
            ? `Ամսական ${process.env.REACT_APP_SUBSCRIPTION_MONTHLY_DOWNLOADS_NUMBER} ներբեռնում`
            : `Տարեկան ${process.env.REACT_APP_SUBSCRIPTION_YEARLY_DOWNLOADS_NUMBER} ներբեռնում`}
        </p>
      </div>
      <div className="eb-plan-feature_container">
        <FontAwesomeIcon icon={faCheckSquare} />
        <p>Առցանց կարդալու հնարավորություն</p>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          style={{ marginLeft: "7px" }}
          onClick={() => setReadOnlineExplanationModalOpen(true)}
        />
      </div>
      <div className="eb-plan-feature_container">
        <FontAwesomeIcon icon={faCheckSquare} />
        <p>Նպատակներ սահմանելու հնարավորություն</p>
      </div>
      <div className="eb-plan-feature_container">
        <FontAwesomeIcon icon={faCheckSquare} />
        <p>Պահպանելու, կարդացված նշելու հնարավորություն</p>
      </div>
      <div className="eb-plan-feature_container">
        <FontAwesomeIcon icon={faCheckSquare} />
        <p>Վիճակագրական տվյալներ</p>
        <FontAwesomeIcon
          icon={faQuestionCircle}
          style={{ marginLeft: "7px" }}
          onClick={() => setStatisticsModalOpen(true)}
        />
      </div>

      <Modal
        onclose={() => setReadOnlineExplanationModalOpen(false)}
        isOpen={readOnlineExplanationModalOpen}
      >
        <p>Դուք կկարողանաք կարդալ ցանկացած գիրք օնլայն տարբերակով</p>
      </Modal>

      <Modal
        onclose={() => setStatisticsModalOpen(false)}
        isOpen={statisticsModalOpen}
      >
        <p>
          Դուք կկարողանաք հետևել Ձեր վիճակագրությանը (թե որքան գիրք եք կարդում
          ամսական/տարեկան կտրվածքով)
        </p>
      </Modal>
    </div>
  );
}
