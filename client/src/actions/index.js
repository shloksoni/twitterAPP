import axios from 'axios';

export const fetchUser = () => dispatch => axios.get('/auth/current_user').then(res => dispatch({type: 'FETCH_USER', payload : res.data }))

