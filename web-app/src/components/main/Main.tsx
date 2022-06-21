import Dropzone from "./Dropzone/Dropzone";
import "./Main.css";

export default function Main(): JSX.Element {
  return (
    <section className="main-container">
      <h1>Easy File Sharing</h1>
      <h3>Share anything under 10MG</h3>
      <Dropzone />
    </section>
  );
}
