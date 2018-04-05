import Redux from 'redux'
import {
  PRODUCT_FETCH_LIST,
  PRODUCT_GET_DETAIL
} from '../actions/types'

const DEFAULT_STATE = {
  productsList : [],
  productDetail : {}
}

export default (state=DEFAULT_STATE, action) => {
  switch (action.type) {
    case PRODUCT_FETCH_LIST:
        return {...state, productsList: action.clientsList }
    case PRODUCT_GET_DETAIL:
        return {...state, productDetail : action.clientDetail }
    default:
        return state
  }
}
