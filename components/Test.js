import { useState } from "react";

function Test(props) {
  /** states **/
  const [tests, setTests] = useState([]);

  /** comportements **/
  // const testsList = data.tests.map((test) => {
  //   return <Test />;
  // });

  // setTests([...tests, testsList]);

  /** affichage **/
  return <div>TEST COMPONENT</div>;
}

export default Test;
