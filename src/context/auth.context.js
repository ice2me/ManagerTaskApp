import {createContext} from 'react';

function noop() {
}

export const AuthContext = createContext({
	isAuthenticated: false
})

export const RoomContext = createContext({
	roomId: null,
	task: null,
	createdTask: null
})


// const firestore = {
// 	roomTaskColl: {
// 		room1Doc: {
// 			created: '',
// 			uid: ''
// 		},
// 		room2Doc: {
// 			created: '',
// 			uid: '',
// 			taskColl: [{
// 				created: '',
// 				uid: '',
// 				task1: ''
// 			}, {
// 				created: '',
// 				uid: '',
// 				task1: ''
// 			}]
// 		}
// 	}
//
// }
// }