import { RootReducerType } from "../../types/typesStore/typesStore";
import { useSelector } from "react-redux";

export const useAppSelector = useSelector.withTypes<RootReducerType>();
