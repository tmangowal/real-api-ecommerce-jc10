import Axios from 'axios'
import {urlApi} from '../../3.helpers/database'

export const onLogin = (userObject) => {
    return(dispatch) => {
        Axios.get(urlApi + 'users', {
            params : {
                username : userObject.username,
                password : userObject.password
            }
        })
        .then((res) => {
            console.log(res)
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : {
                        username : res.data[0].username,
                        role : res.data[0].role,
                        id : res.data[0].id
                    }
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }
}