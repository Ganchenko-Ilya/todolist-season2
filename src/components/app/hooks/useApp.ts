import { useSelector } from "react-redux";
import { RootReducerType } from "../../../store/store";




export const useApp = () => {

    const statusApp = useSelector<RootReducerType, string>((state) => state.app.status);

    return {statusApp}
}