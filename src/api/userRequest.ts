import request from "./request";
import type {
  UserInfo,
  TokenInfo,
  CreditInfo,
  CaptchaRespInfo,
  ApiResponse,
} from "@/types";

// 发送手机验证码（/auth/send-code）
export const sendCaptcha = async (
  phone: string
): Promise<ApiResponse<CaptchaRespInfo>> => {
  const response = await request.post<ApiResponse<CaptchaRespInfo>>(
    "/auth/send-code",
    { phone }
  );
  return response.data;
};

// 验证手机验证码（/auth/verify-code）
export const verifyCaptcha = async (
  phone: string,
  code: string
): Promise<ApiResponse<TokenInfo>> => {
  const response = await request.post<ApiResponse<TokenInfo>>(
    "/auth/verify-code",
    { phone, code }
  );
  return response.data;
};

// 用户登录（/login）
export const reqLogin = async (
  accessToken: string,
  loginType: string
): Promise<ApiResponse<TokenInfo>> => {
  const response = await request.post<ApiResponse<TokenInfo>>("/login", {
    access_token: accessToken,
    login_type: loginType,
  });
  return response.data;
};

// 用户登出（'/logout'）
export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await request.post<ApiResponse<null>>("/logout");
  return response.data;
};

// 用户积分详情（/user/credits）
export const fetchCreditsDetail = async (): Promise<
  ApiResponse<CreditInfo>
> => {
  const response = await request.get<ApiResponse<CreditInfo>>("/user/credits");
  return response.data;
};

// 获取用户信息（/me）
export const fetchUserInfoDetail = async (): Promise<ApiResponse<UserInfo>> => {
  // Real request
  const response = await request.get<ApiResponse<UserInfo>>("/me");
  return response.data;
};
