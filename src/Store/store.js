import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import dialogSlice from "./dialogSlice";

export const store = configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['Dialog Slice/show'],
                ignoredPaths: [
                    'dialog.login.onSubmit',
                    'dialog.delete.onSubmit',
                    'dialog.payment.onSubmit',
                    'dialog.notificationDetails.onSubmit',
                    'dialog.paymentDetails.onSubmit',
                    'dialog.signup.onSubmit',
                ],
            },
        }),

    reducer: {
        auth: authSlice.reducer,
        dialog: dialogSlice.reducer,
    }
})

