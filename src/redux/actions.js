import {
	GEt_All_ROOM, GET_USERS_ALL, UID_ROOM,
} from "./types";

export function addUidRoom(uid) {
	return {
		type: UID_ROOM,
		payload: uid
	}
}

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