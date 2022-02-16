import { createStore } from 'redux';
import reducer from "./reducer";
import { persistStore } from "redux-persist";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer, composeWithDevTools());

const persister = persistStore(store);

export { store, persister };