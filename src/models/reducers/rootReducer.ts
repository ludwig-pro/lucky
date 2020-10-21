import { combineReducers } from "@reduxjs/toolkit";

import inventory from "./inventory";

const rootReducer = combineReducers({
  inventory,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
