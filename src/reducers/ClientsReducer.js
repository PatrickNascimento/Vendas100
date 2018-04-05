import Redux from 'redux'
import {
  CLIENT_FETCH_LIST,
  CLIENT_GET_DETAIL
} from '../actions/types'

const DEFAULT_STATE = {
  clientsList : [],
  clientDetail : {}
}

export default (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case CLIENT_FETCH_LIST:
        return {...state, clientsList: action.clientsList }
    case CLIENT_GET_DETAIL:
        return {...state, clientDetail : action.clientDetail }
    default:
        return state
  }
}
