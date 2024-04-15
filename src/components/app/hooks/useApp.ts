import { useSelector } from "react-redux";
import { RootReducerType, useAppDispatch } from "../../../store/store";
import { loginOutTC } from "../../../store/auth-reducer";




export const useApp = () => {
    const dispatch = useAppDispatch();
    const statusApp = useSelector<RootReducerType, string>((state) => state.app.status);
    const isLogIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLogIn);
    const onClickLoginHandler = () => {
        if(isLogIn){
        dispatch(loginOutTC())
        }
       };

    return {statusApp,isLogIn,onClickLoginHandler}
}