import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';


export const getCartLength = (length) => {
    return (dispatch) => {
        dispatch({
            type : 'CHECK_CART',
            payload: length
        })
    }
    
}