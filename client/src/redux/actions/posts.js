import * as api from '../../api';
import * as actions from '../actions/actions';

// Action Creators
export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPost();
        const action = {
            type: actions.FETCH_ALL_POSTS,
            payload: data,
        };

        dispatch(action);
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        const action = {
            type: actions.CREATE_POST,
            payload: data
        }
        dispatch(action)
    } catch (error) {
        console.log(error.message)
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        const action = {
            type: actions.UPDATE,
            payload: data
        };

        dispatch(action)
    } catch (error) {
        console.log(error.message);
    }
};


export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: actions.DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: actions.LIKE_POST, payload: data })
    } catch (error) {
        console.log(error)
    }
}
