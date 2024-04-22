import { setCookie } from "@/app/utils/helpers/storage";
import { http } from "../axiosClient";
import { ENDPOINT } from "../endpoint";
import { ILoginRequest, IAuthResponse, IRes } from "@/app/interface";

class Auth {
  login = async (body: ILoginRequest): Promise<IRes<IAuthResponse>> => {
    const res: IRes<IAuthResponse> = await http.post(ENDPOINT.AUTH.LOGIN, body);
    const accessToken = res?.data.access_token;

    if (accessToken) {
      setCookie("accessToken", accessToken, { expires: 365 });
    }

    return res;
  };

  refreshToken = async (): Promise<IRes<IAuthResponse>> => {
    const res: IRes<IAuthResponse> = await http.get(ENDPOINT.AUTH.REFRESH);
    return res;
  };
}

export const AuthService = new Auth();
