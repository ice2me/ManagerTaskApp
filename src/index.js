import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat";
import '@firebase/auth'


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
const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
	<Context.Provider
		value={{
			firebase,
			firestore,
			auth
		}}
	>
		<App />
	</Context.Provider>,
	document.getElementById('root')
);

reportWebVitals();
