import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import "./Header.css";

function Header(): JSX.Element {
  return (
    <header>
      <Link to="/" className="logo-container">
        <img src="/images/logo.png" />
      </Link>
      <div className="links-container">
        <Link to="/">Home</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </header>
  );
}

export default withRouter(Header);
