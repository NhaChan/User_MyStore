export const LOGIN = (roles) => {
  return {
    type: 'LOGIN',
    roles: roles ?? [],
  }
}

export const LOGOUT = {
  type: 'LOGOUT',
}

const authActions = {
  LOGIN,
  LOGOUT,
}
export default authActions
