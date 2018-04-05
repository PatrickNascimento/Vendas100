import Redux from 'redux'
import {
    LOGIN_IN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_EMAIL_CHANGED,
    LOGIN_PASSWORD_CHANGED,
    LOGIN_COMPANY_UUID_CHANGED
} from '../actions/types'

const DEFAULT_STATE = {
  email : '',
  password : '',
  waiting : false,
  user : {}
}

export default (state=DEFAULT_STATE, action) => {
  switch (action.type) {
      case LOGIN_EMAIL_CHANGED:
        return {...state, email : action.email }

      case LOGIN_PASSWORD_CHANGED:
        return { ...state, password : action.password }

      case LOGIN_COMPANY_UUID_CHANGED:
        return { ...state, company_uuid : action.company_uuid }

      default:
        return state
  }
}
