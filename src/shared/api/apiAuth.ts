import { AutMeResponseType, ResultResponse, useDataRequestType } from "shared/types";
import { instance } from "./api";

export const authApi = {
  logIn(userData: useDataRequestType) {
    return instance.post<ResultResponse<{ userId: number }>>("auth/login", userData);
  },
  logout() {
    return instance.delete<ResultResponse>("auth/login");
  },
  captcha() {
    return instance.get<{ url: string }>("security/get-captcha-url");
  },
  authMe() {
    return instance.get<ResultResponse<AutMeResponseType>>("auth/me");
  },
};
