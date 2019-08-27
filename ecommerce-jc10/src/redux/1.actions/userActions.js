import Axios from 'axios'
import {urlApi} from '../../3.helpers/database'

export const onLogin = (userObject) => {
    /**
     * sama sepeerti loginObj
     * userObject = { 
     *      username : state/inputan,
     *      password : state/inputan
     * }
     * 
     * userObject = {asalNama : this.state.loginUsername, asalKunci : this.state.loginPassword}
     */

    return (dispatch) => {
        Axios.get(urlApi + 'users', {
            params : {
                // properti di kiri adalah column dari Database
                username : userObject.asalNama,
                password : userObject.asalKunci
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

export const onLogout = () => {

}