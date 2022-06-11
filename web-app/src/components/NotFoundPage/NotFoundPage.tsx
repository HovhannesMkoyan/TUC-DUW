import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage(): JSX.Element {
  return (
    <section className="eb-main_container">
      <div className="eb-auth_container eb_not-found_continer">
        <div>
          <img src="/images/not-found.svg" alt="registration email sent svg" />
        </div>
        <div>
          <Link to="/" className="notFoundPage-toMain-link">
            Գլխավոր էջ
          </Link>
        </div>
      </div>
    </section>
  );
}
