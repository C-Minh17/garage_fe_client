type CookieKey = 'accessToken' | 'refreshToken';

/**
 * Lưu cookie
 * @param key - tên cookie
 * @param value - giá trị cookie
 * @param minutes - số phút cookie tồn tại (mặc định 60 phút)
 */
function setCookie(key: CookieKey, value: string, minutes: number = 60): void {
  const expires: string = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
  document.cookie = `${key}=${value}; expires=${expires}; path=/`;
}

/**
 * Lấy cookie
 * @param key - tên cookie
 * @returns giá trị cookie hoặc null nếu không tồn tại
 */
function getCookie(key: CookieKey): string | null {
  const cookies: string[] = document.cookie.split('; ');
  const found: string | undefined = cookies.find(cookie => cookie.startsWith(`${key}=`));
  return found ? found.split('=')[1] : null;
}

/**
 * Xóa cookie
 * @param key - tên cookie
 */
function deleteCookie(key: CookieKey): void {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export {
  setCookie,
  getCookie,
  deleteCookie
}
