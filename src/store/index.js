import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import modal from "./modal";
import ilanlar from "./ilanlar";

const store = configureStore({
    reducer:{
        auth,
        modal,
        ilanlar
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false})
})

export default store