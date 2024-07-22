import { configureStore } from '@reduxjs/toolkit'
import CountReducer from './features/counterSlice';
import InvoiceReducer from './features/invoiceSlice';
import InvoiceSettingReducer from './features/invoiceSetting';

 const store = configureStore({
  reducer: {
    counter:CountReducer,
    invoice:InvoiceReducer,
    invoiceSetting:InvoiceSettingReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store