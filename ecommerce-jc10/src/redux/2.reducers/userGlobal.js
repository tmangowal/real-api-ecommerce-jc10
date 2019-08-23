const INITIAL_STATE = {id : 0, username : '', role : '', cookie : false, loading : false}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'TESTING':
            return {...INITIAL_STATE, username : 'TEST'}
        default:
            return state
    }
}