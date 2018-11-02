import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
    //得到本地存储的cookie
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
