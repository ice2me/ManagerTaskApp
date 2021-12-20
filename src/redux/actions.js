import {
	CREATE_NEW_ROOM,
	GEt_All_ROOM, GET_USERS_ALL, HIDE_THEME, SHOW_THEME, UID_ROOM,
} from "./types";


export function createNewRoom(rooms) {
	return {
		type: CREATE_NEW_ROOM,
		payload: rooms
	}
}
export function addUidRoom(uid) {
	return {
		type: UID_ROOM,
		payload: uid
	}
}

// export function showAlert(text) {
// 	return dispatch => {
// 		dispatch({
// 			type: SHOW_ALERT,
// 			payload: text
// 		})
// 		setTimeout(() => {
// 			dispatch(hideAlert())
// 		}, 3000)
// 	}
// }

export function getAllRooms(rooms) {
	return {
		type: GEt_All_ROOM,
		payload: rooms,
	}
}
export function getUsersAll(usersAll) {
	return {
		type: GET_USERS_ALL,
		payload: usersAll,
	}
}

//
// export function hideAlert() {
// 	return {
// 		type: HIDE_ALERT
// 	}
// }