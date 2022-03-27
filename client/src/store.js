import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    getChatReducer,
} from "./redux/reducer/chat.reducer.js";

const reducer = combineReducers({
    getChat: getChatReducer,
});

let intialState = {};

const middleware = [thunk];
const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
