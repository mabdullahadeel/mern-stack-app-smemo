import * as actions from '../actions/actions';
import Axios from 'axios';
import { USER_AUTH_URL } from '../../configurations/urls';


export const logInUserAuthentication = (username, password) => async (dispatch) => {
    try {
        Axios({
            method: "POST",
            data: {
                username,
                password
            },
            withCredentials: true,
            url: `${USER_AUTH_URL}/login`,
        }).then(res => {
            const data = res.data
            const action = {
                type: actions.LOGIN_USER,
                payload: data
            }
            dispatch(action);
        })
    } catch (error) {
        console.log(error.message)
    }

};

export const registerUserAuthentication = (username, password) => (dispatch) => {
    try {
        Axios({
            method: "POST",
            data: {
                username,
                password
            },
            withCredentials: true,
            url: `${USER_AUTH_URL}/register`,
        }).then(res => {
            if (res.status === 208) {
                return
            }
            const data = res.data
            const action = {
                type: actions.REGISTER,
                payload: data
            }
            console.log(res)
            dispatch(action);
        })
    } catch (error) {
        console.log(error.message)
    }

}