
import { create } from 'zustand'
import type { CreditInfo, UserInfo } from '../types'
import { clearAll, getToken, saveUserID } from '../utils/user_util'

interface UserStore {
  isLogined: boolean
  userInfo: UserInfo | null
  credits: CreditInfo | null
  isLoginModalVisible: boolean
  isLoginSuccess: boolean
  setUserStore: (info: UserInfo) => void
  setCreditStore: (credit: CreditInfo) => void
  setLoginSuccess?: (success: boolean) => void
  loginStore: () => void
  logoutStore: () => void
  showLoginModal: () => void
  hideLoginModal: () => void
}

const useUserStore = create<UserStore>((set) => ({
  isLogined: !!getToken(),  // 如果有 accessToken 则认为已登录
  userInfo: null,
  credits: null,
  isLoginModalVisible: false,
  isLoginSuccess: false,
  setUserStore: (info: UserInfo) => {
    saveUserID(info.id)
    set({ isLogined: true, userInfo: info })
  },
  setCreditStore: (credit: CreditInfo) => {
    set({ credits: credit })
  },
  setLoginSuccess: (success: boolean) => {
    set({ isLoginSuccess: success })
  },
  loginStore: () => {
    set({ isLogined: true })
  },
  logoutStore: () => {
    clearAll()
    set({ isLogined: false, userInfo: null })
  },
  showLoginModal: () => set({ isLoginModalVisible: true }),
  hideLoginModal: () => set({ isLoginModalVisible: false }),
}))

export default useUserStore