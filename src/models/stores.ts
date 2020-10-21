import { configureStore } from "@reduxjs/toolkit";

import reactotronConfig from "./reactotron";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
  enhancers: __DEV__
    ? [reactotronConfig.createEnhancer && reactotronConfig.createEnhancer()]
    : [],
});

export default store;
