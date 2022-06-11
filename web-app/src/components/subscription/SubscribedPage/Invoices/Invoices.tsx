import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileDownload } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "../../../HelperComponents/Tooltip/Tooltip";
import { downloadInvoice } from "../../../../services/user.service";
import { getMonthName } from "../../../../helpers/date-manipulations";
import InPageLoader from "../../../in-page-loader/InPageLoader";

export default function Invoices({
  invoicesLoading,
  invoices,
  nextBillingDateAMSentence,
}: {
  invoicesLoading: boolean;
  invoices: any[];
  nextBillingDateAMSentence: string | null;
}) {
  return (
    <div className="eb-subscribed-invoices_container">
      <h3>Ապրանքագիր</h3>
      <div className="invoices_container">
        {invoicesLoading ? (
          <InPageLoader />
        ) : (
          <>
            {nextBillingDateAMSentence && (
              <div className="invoice_container next-invoice_container">
                <p>Հաջորդ վճարում - {nextBillingDateAMSentence}</p>
              </div>
            )}
            {invoices
              .slice(0)
              .reverse()
              .map((invoice: any, index: any) => (
                <>
                  <div className="invoice_container df df-ac" key={index}>
                    <div className="df df-ac">
                      <FontAwesomeIcon
                        icon={faFilePdf}
                        className="invoice-pdf-icon"
                      />
                      <p>{invoice.filename.slice(0, -4)}</p>
                    </div>

                    <div>
                      <p>{`${getMonthName(
                        (
                          new Date(invoice.created_at * 1000).getMonth() + 1
                        ).toString()
                      )} ${new Date(
                        invoice.created_at * 1000
                      ).getDate()}, ${new Date(
                        invoice.created_at * 1000
                      ).getFullYear()} `}</p>
                    </div>
                    <div>
                      <Tooltip text="Ներբեռնել">
                        <FontAwesomeIcon
                          icon={faFileDownload}
                          className="invoice-download-icon"
                          onClick={() =>
                            downloadInvoice(
                              localStorage.getItem("auid")!,
                              invoice.uuid,
                              invoice.filename
                            )
                          }
                        />
                      </Tooltip>
                    </div>
                  </div>
                </>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
