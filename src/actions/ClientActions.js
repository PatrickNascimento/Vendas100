import Actions from 'react-native-router-flux'
import axios from 'axios'

import {
    CLIENT_FETCH_LIST,
    CLIENT_GET_DETAIL,
    CLIENT_SHOW_DETAIL,
    CLIENT_EDIT_DETAIL,
} from './types'

export const clientsFetchList = () => {
    return (dispatch) => {
        const clients = axios.get('http://10.1.1.39:211/client')
          .then( resp => {
            console.log(resp)
            dispatch({
              type : CLIENT_FETCH_LIST,
              clientsList : resp.data.result
            })
          }).catch((e) => {
            console.error("ERROR fetching clients", e)
            console.dir(e)
          })
    }
}
