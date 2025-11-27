export const getStorageItem = (key: string) => {
  return window.localStorage.getItem(key);
};

export const setStorageItem = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
};

export const removeStorageItem = (key: string) => {
  window.localStorage.removeItem(key);
};
