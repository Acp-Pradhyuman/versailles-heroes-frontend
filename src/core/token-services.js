class TokenService {
  getLocalRefreshToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token.refresh_token;
  }
  getLocalAccessToken() {
    const token = JSON.parse(localStorage.getItem("token"));
    return token;
  }
  updateLocalAccessToken(newAccessToken) {
    let token = JSON.parse(localStorage.getItem("token"));
    token.access_token = newAccessToken;
    localStorage.setItem("token", JSON.stringify(token));
  }
  getUser() {
    return JSON.parse(localStorage.getItem("userData"));
  }
  setUser(user) {
    localStorage.setItem("userData", JSON.stringify(user));
  }
  setToken(token) {
    localStorage.setItem("token", JSON.stringify(token));
  }
  removeUser() {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  }
}
export default new TokenService();
