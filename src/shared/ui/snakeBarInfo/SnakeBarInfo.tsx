import { SnakeBarInfoWrapper } from "./SnakeBarInfoWrapper";
import { useAppSelector } from "shared/store/hooks/useAppSelector";

export const SnakeBarInfo = () => {
  const errorInfo = useAppSelector((state) => state.app.errorInfo);
  const succeededInfo = useAppSelector((state) => state.app.succeededInfo);
  let info = null;

  if (!!errorInfo) {
    info = errorInfo;
  }
  if (!!succeededInfo) {
    info = succeededInfo;
  }

  return <>{!!info && <SnakeBarInfoWrapper errorInfo={errorInfo} info={info} />}</>;
};
