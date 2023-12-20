import "./App.css";
import { useState, memo } from "react";

function App() {
  console.log("App");
  return (
    <div className="App">
      <Child></Child>
    </div>
  );
}

function Child() {
  console.log("Child");
  const [num, add] = useState(1);
  return (
    <>
      {/* <Button add={add}></Button>
      <Num num={num}> </Num> */}
      <Wrapper left={<LeftOther></LeftOther>}></Wrapper>
    </>
  );
}

function Button(props) {
  console.log(props.add);
  return <button onClick={() => props.add((pre) => pre + 1)}>add</button>;
}

function Num(props) {
  console.log(props.num);
  return <div>{props.num}</div>;
}

const Wrapper = (props) => {
  console.log("wrapper");
  const [global, setGlobal] = useState(1);
  return (
    <>
      <button onClick={() => setGlobal((pre) => pre + 1)}>add</button>
      {global}
      {props.children}
      {props.left}
      <Other></Other>
    </>
  );
};

const LeftOther = () => {
  console.log("LeftOther");
  return <div>LeftOther</div>;
};

const Other = memo(
  () => {
    console.log("other");

    return <div>other</div>;
  }
  // (old, newPorps) => {
  //   console.log(Object.is(old, newPorps));
  //   return Object.is(old, newPorps);
  // }
);
// const Other = () => {
//   console.log("other");
//   return <div>other</div>;
// };

export default App;
