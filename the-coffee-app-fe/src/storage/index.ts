import authReducer from '../features/auth/actions/auth';
import categoryReducer from '../features/product/actions/getCategoryData';
import productReducer from '../features/product/actions/getProductData';
import orderReducer from '../features/order/actions/order';
import myOrderReducer from '../features/my-order/actions/historyOrder';
import orderByStatusReducer from '../features/orderStatus/action/orderStatus';
import searchReducer from '../features/search/action/getSearchItemData';
import updateStatusOrderReducer from '../features/updateOrder/action/updateOrder';
import createProductReducer from '../features/product/actions/createProductData';
import accountReducer from '../features/user/actions/getUserData';
import createAccountReducer from '../features/admin/actions/createAccountData';
import webhookReducer from '../features/webhook/action/webhook';
import createCategoryReducer from '../features/product/actions/createCategoryData';
import orderByDateReducer from '../features/order/actions/getOrderByDate';
import myCartReducer from '../features/my-order/actions/cart'
import storage from 'redux-persist/lib/storage';

import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
  isSerializable: false,
});
const persistAuthConfig = {
  key: 'auth',
  version: 1,
  storage,
};
const persistedAuthReducer = persistReducer(persistAuthConfig, authReducer);
export const store = configureStore({
  reducer: {
    authData: persistedAuthReducer,
    category: categoryReducer,
    product: productReducer,
    order: orderReducer,
    myOrder: myOrderReducer,
    orderByStatus: orderByStatusReducer,
    orderByDate: orderByDateReducer,
    search: searchReducer,
    updateStatusOrder: updateStatusOrderReducer,
    createProduct: createProductReducer,
    account: accountReducer,
    createAccount: createAccountReducer,
    webhook: webhookReducer,
    createCategory: createCategoryReducer,
    myCart: myCartReducer
  },
  middleware: customizedMiddleware,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
