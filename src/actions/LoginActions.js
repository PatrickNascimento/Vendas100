import { Actions } from 'react-native-router-flux'

import {
  LOGIN_IN,
  LOGIN_SUCESS,
  LOGIN_ERROR,
  LOGIN_EMAIL_CHANGED,
  LOGIN_PASSWORD_CHANGED,
  LOGIN_COMPANY_UUID_CHANGED,
} from './types'

/* json: {
  email: 'patrick@microvision.com.br',
  password: '123456',
  company_uuid: '37.005.623/0001-67' } */

export const emailChange = (text) => ({
  type : LOGIN_EMAIL_CHANGED,
  email : text
})

export const passwordChange = (text) => ({
  type : LOGIN_PASSWORD_CHANGED,
  password : text
})

export const companyUuidChange = (text) => ({
  type : LOGIN_COMPANY_UUID_CHANGED,
  company_uuid : text
})

export const loginUser = ({ email, password, company_uuid }) => {
  return (dispatch) => {
    dispatch({ type : LOGIN_IN })

    /* Autentication */

    /* case success */
    dispatch({ type : LOGIN_SUCCESS })


    /* case error */

    dispatch({ type : LOGIN_ERROR })
    return state
  }
}
