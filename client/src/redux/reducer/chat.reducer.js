import {
    ALL_CHAT_REQUEST,
    ALL_CHAT_SUCCESS,
    ALL_CHAT_FAILURE,
} from "../constants/chat.constant";

export const getChatReducer = (state = { chatMessage: [] }, action) => {
    console.log("action.payload", action.payload, action.type);
    switch (action.type) {
        case ALL_CHAT_REQUEST:
            return {
                loading: true,
                chatMessage: [],
            };
        case ALL_CHAT_SUCCESS:
            return {
                loading: false,
                chatMessage: action.payload,
            };
        case ALL_CHAT_FAILURE:
            return {
                loading: false,
                chatMessage: [],
                error: action.payload,
            };
        default:
            return state;
    }
}
