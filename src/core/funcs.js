/* eslint-disable */
import { BehaviorSubject } from 'rxjs';
const tokenKey = "token";
export const runFuncs = fns => args => fns && fns.forEach(fn => fn & fn(args));

const tokenSubject = new BehaviorSubject(localStorage.getItem("token"));

const logout = () => {
    localStorage.removeItem(tokenKey)
    tokenSubject.next(null);
}

const setToken = (token) => {
    localStorage.setItem(tokenKey, token);
    tokenSubject.next(token);
}

export const authHeader = () => {
    console.log(tokenSubject);
    const token = JSON.parse(tokenSubject.value);
    console.log("token",token)
    return token ? { "x-access-token": token } : {};
}

export const authenticationService = {
    setToken,
    logout,
    authHeader,
    tokenSubject,
    tokenObservable: tokenSubject.asObservable(),
    get token() { return tokenSubject.value }
};

export const checkEthNetwork = () => {
    if (window.ethereum && window.ethereum !== "undefined" && window.ethereum.networkVersion !== '97') {
        return true;
    }
    else {
        return false;
    }
}
