import { combineReducers } from 'redux'
import LoginReducer from './LoginReducer'
import ClientsReducer from './ClientsReducer'
import ProductsReducer from './ProductsReducer'

export default combineReducers({
  autenticacao : LoginReducer,
  clients : ClientsReducer,
  products : ProductsReducer
})
