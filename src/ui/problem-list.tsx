import React, { useContext } from "react";
import App from "../app";
import { Link } from "react-router";

import "./problem-list.scss";

export default function ProblemList() {
  const problemIds = useContext(App.ProblemIdsContext);

  const problems: Record<string, Record<string, boolean>> = {};
  const tags: Record<string, boolean> = {};

  for (const problemId of problemIds) {
    const problem = problems[problemId.team];
    if (problem) {
      problem[problemId.tag] = true;
    }
    else {
      problems[problemId.team] = { [problemId.tag]: true };
    }
    tags[problemId.tag] = true;
  }

  const teamList = Object.keys(problems).sort();
  const tagList = Object.keys(tags).sort();

  return (
    <pf-problem-list>
      <h1>Problems</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            {
              tagList.map((tag, i) =>
                <th key={i}>Problem {tag}</th>
              )
            }
          </tr>
        {
          teamList.map((team, i) =>
            <tr key={i}>
              <th>Team {team}</th>
              {
                tagList.map((tag, j) =>
                  <td key={j}>
                  {
                    problems[team][tag]
                      ? <Link to={team + tag}>{team}-{tag.toUpperCase()}</Link>
                      : <span>&nbsp;</span>
                  }
                  </td>
                )
              }
            </tr>
          )
        }
        </tbody>
      </table>
    </pf-problem-list>
  );
}
