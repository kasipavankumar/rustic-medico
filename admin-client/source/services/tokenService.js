import cookie from 'js-cookie';

class TokenService {
  constructor(key, token) {
    this.key = key;
    this.token = token;
  }
  /**
   * Set coookie.
   */
  setCookie = () =>
    cookie.set(this.key, this.token, {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  /**
   * Get cookie's value.
   *
   * @static
   * @param {string} key
   */
  static getCookie = (key) => cookie.get(key);
  /**
   * Remove cookie.
   *
   * @static
   * @param {string} key
   */
  static removeCookie = (key) => cookie.remove(key);
}

export default TokenService;
