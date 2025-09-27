/**
 * Utility functions for handling cookies
 */

/**
 * Get a cookie value by name
 * @param {string} name - The name of the cookie
 * @returns {string|null} - The cookie value or null if not found
 */
export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

/**
 * Set a cookie with optional parameters
 * @param {string} name - The name of the cookie
 * @param {string} value - The value of the cookie
 * @param {number} days - Number of days until expiration (default: 7)
 * @param {string} path - The path for the cookie (default: '/')
 * @param {boolean} secure - Whether the cookie should be secure (default: false)
 * @param {string} sameSite - SameSite attribute (default: 'Lax')
 */
export const setCookie = (name, value, days = 7, path = '/', secure = false, sameSite = 'Lax') => {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  
  let cookieString = `${name}=${value}; expires=${expires.toUTCString()}; path=${path}`;
  
  if (secure) {
    cookieString += '; secure';
  }
  
  cookieString += `; samesite=${sameSite}`;
  
  document.cookie = cookieString;
};

/**
 * Delete a cookie by setting it to expire in the past
 * @param {string} name - The name of the cookie
 * @param {string} path - The path for the cookie (default: '/')
 */
export const deleteCookie = (name, path = '/') => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path};`;
};

/**
 * Clear all authentication cookies
 */
export const clearAuthCookies = () => {
  deleteCookie('accessToken');
  deleteCookie('user');
  deleteCookie('email');
  deleteCookie('csrftoken');
};

/**
 * Get the access token from cookies
 * @returns {string|null} - The access token or null if not found
 */
export const getAccessToken = () => {
  return getCookie('accessToken');
};

/**
 * Get the refresh token from cookies
 * @returns {string|null} - The refresh token or null if not found
 */
export const getRefreshToken = () => {
  return getCookie('refresh_token');
};
