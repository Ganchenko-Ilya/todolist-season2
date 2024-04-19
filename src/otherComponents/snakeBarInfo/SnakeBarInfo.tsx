import { RootReducerType } from "store/store";
import { useSelector } from "react-redux";
import { SnakeBarInfoWrapper } from "./SnakeBarInfoWrapper";

export const SnakeBarInfo = () => {
  const errorInfo = useSelector<RootReducerType, string | null>(
    (state) => state.app.errorInfo,
  );
  const succeededInfo = useSelector<RootReducerType, string | null>(
    (state) => state.app.succeededInfo,
  );
  let info = null;

  if (!!errorInfo) {
    info = errorInfo;
  }
  if (!!succeededInfo) {
    info = succeededInfo;
  }

  return (
    <>{!!info && <SnakeBarInfoWrapper errorInfo={errorInfo} info={info} />}</>
  );
};
