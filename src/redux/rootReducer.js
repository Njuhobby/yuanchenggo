import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import mailReducer from "./slices/mail";
import chatReducer from "./slices/chat";
import blogReducer from "./slices/blog";
import userReducer from "./slices/user";
import productReducer from "./slices/product";
import authJwtReducer from "./slices/authJwt";
import settingsReducer from "./slices/settings";
import calendarReducer from "./slices/calendar";
import notificationsReducer from "./slices/notifications";
import jobReducer from "./slices/job";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "root",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["settings"],
};

const productPersistConfig = {
  key: "product",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["sortBy", "checkout"],
};

const authPersistConfig = {
  key: "authJwt",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["isAuthenticated"],
};

const jobPersistConfig = {
  key: "job",
  storage: storage,
  keyPrefix: "redux-",
  whitelist: ["job"],
};

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  settings: settingsReducer,
  calendar: calendarReducer,
  notifications: notificationsReducer,
  job: persistReducer(jobPersistConfig, jobReducer),
  product: persistReducer(productPersistConfig, productReducer),
  authJwt: persistReducer(authPersistConfig, authJwtReducer),
});

export { rootPersistConfig, rootReducer };
