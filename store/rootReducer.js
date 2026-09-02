import { combineReducers } from "redux";
import app from "./app/reducer";
import shop from "./shop/reducer";
import ecommerce from "./ecommerce/reducer";

export default combineReducers({
    app,
    shop,
    ecommerce,
});
