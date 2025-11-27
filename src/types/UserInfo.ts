export interface TokenInfo {
  token_type: string
  access_token: string
  access_token_expires_in: number
  refresh_token_expires_in: number
  refresh_token: string
}

export interface UserInfo {
  id: string
  nickname: string
  username: string
  email: string
  avatar_url?: string
  status: string
  phone: string | null
  login_type: string
  login_identifier: string
  last_login_at: number
  last_login_ip: string
  created_at: number
  updated_at: number
}

export interface CreditInfo {
  id: string
  user_id: string
  total_credits: number
  used_credits: number
  available_credits: number
  updated_at: number
}

export interface CaptchaRespInfo {
  resend_delay_seconds: number
  code_expire_seconds: number
}