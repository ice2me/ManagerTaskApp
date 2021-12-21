import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./redux/rootReducer";
import {Provider} from "react-redux";
import firebase from "firebase/compat";
import '@firebase/auth'
import thunk from "redux-thunk";

const store = createStore(rootReducer, compose(
	applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

firebase.initializeApp(
	{
		apiKey: "AIzaSyCHqG9414gBL4p8lzkWCnAck1YlFzwyRrM",
		authDomain: "manager-task-72df6.firebaseapp.com",
		projectId: "manager-task-72df6",
		storageBucket: "manager-task-72df6.appspot.com",
		messagingSenderId: "1027018986232",
		appId: "1:1027018986232:web:53193fdea9169058e3210d",
		measurementId: "G-T585LRSF08"
	}
);
export const Context = createContext(null)
const firestore = firebase.firestore()
const auth = firebase.auth()

ReactDOM.render(
	<Provider store={store}>
		<Context.Provider
			value={
				{
					firebase,
					firestore,
					auth
				}
			}
		>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Context.Provider>
	</Provider>,
	document.getElementById('root'));

reportWebVitals();
