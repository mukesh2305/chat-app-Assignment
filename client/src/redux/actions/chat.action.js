import {
    ALL_CHAT_FAILURE,
    ALL_CHAT_REQUEST,
    ALL_CHAT_SUCCESS,

} from "../constants/chat.constant";
import axios from "axios";



// Get All Todo
export const getAllMeassges = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_CHAT_REQUEST });

        const { data } = await axios.get(`http://localhost:3001/api/v1/getAllMessages`);

        dispatch({
            type: ALL_CHAT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_CHAT_FAILURE,
            payload: error.response.data.message,
        });
    }
}