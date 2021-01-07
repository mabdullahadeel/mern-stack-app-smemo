import axios from 'axios';
import { POSTS_FETCH_URL } from '../configurations/urls';

export const fetchPost = () => axios.get(POSTS_FETCH_URL);
export const createPost = (newPost) => axios.post(POSTS_FETCH_URL, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${POSTS_FETCH_URL}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${POSTS_FETCH_URL}/${id}`);
export const likePost = (id) => axios.patch(`${POSTS_FETCH_URL}/${id}/likePost`);