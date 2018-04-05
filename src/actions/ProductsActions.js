import Actions from 'react-native-router-flux'
import axios from 'axios'

import {
    PRODUCT_FETCH_LIST,
} from './types'

export const productsFetchList = () => {
    return (dispatch) => {
        const products = axios.get('http://10.1.1.117:8080/cli')
          .then( resp => {
            dispatch({
              type : PRODUCT_FETCH_LIST,
              productsList : resp.data.result
            })
          }).catch((e) => {
            console.error("ERROR fetching products", e)
          })
    }
}
