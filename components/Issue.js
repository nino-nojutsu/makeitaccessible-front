import { useState } from "react";

function Issue(props) {
  /** states **/
  const [issues, setIssues] = useState([]);

  /** comportements **/
  // const issuesList = data.issues.map((issue) => {
  //   return <Issue />;
  // });

  // setIssues([...issues, issuesList]);

  /** affichage **/
  return <div>ISSUE COMPONENT</div>;
}

export default Issue;
