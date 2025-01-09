import { useContext } from "react";
import App from "../app";
import { Link } from "react-router";

export default function ProblemList() {
  const problems = useContext(App.ProblemListContext);

  return (
    <>
      <h1>Problems</h1>
      <ul>
      {
        problems.map((id, i) =>
          <li key={i}><Link to={id.team + id.tag}>{id.team}-{id.tag.toUpperCase()}</Link></li>
        )
      }
      </ul>
    </>
  );
}
