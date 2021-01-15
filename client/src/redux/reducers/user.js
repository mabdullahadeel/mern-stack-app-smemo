import * as actions from '../actions/actions';


const reducer = (user = null, action) => {
    switch (action.type) {
        case actions.LOGIN_USER:
            return action.payload
        default:
            return user;
    }
}

export default reducer;