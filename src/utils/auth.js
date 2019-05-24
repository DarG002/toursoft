import Cookies from 'js-cookie'

const TOKEN_KEY = 'X-AUTH'
const USER_ID = 'uid'

export function getToken() {
  return Cookies.get(TOKEN_KEY)
}

export function setToken(token) {
  return Cookies.set(TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(TOKEN_KEY)
}

export function getUserId() {
  return Cookies.get(USER_ID)
}

export function setUserId(token) {
  return Cookies.set(USER_ID, token)
}

export function removeUserId() {
  return Cookies.remove(USER_ID)
}
