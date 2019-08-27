const INITIAL_STATE = {id : 0, username : '', role : '', cookie : false, loading : false}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TESTING':
            return {...INITIAL_STATE, username : 'TEST'}
        case 'LOGIN_SUCCESS':
            return {...INITIAL_STATE, username : action.payload.username, id : action.payload.id, role : action.payload.role}
        case 'IS_LOADING':
            return {...INITIAL_STATE, loading : true}
        default:
            return state
    }
}