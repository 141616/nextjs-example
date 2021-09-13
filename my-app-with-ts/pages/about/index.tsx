import { observer } from "mobx-react-lite";
import * as React from "react";
import { useStore } from "../../components/StoreProvider";

interface Props {}

const Comp: React.FC<Props> = (props: Props) => {
  const store = useStore();

  const handleClick = () => store.start();

  return (
    <div className="container">
      <div>welcome to about page</div>
      <div>{store.timeString}</div>
      <button onClick={handleClick}>Start</button>
    </div>
  );
};

export default observer(Comp);
