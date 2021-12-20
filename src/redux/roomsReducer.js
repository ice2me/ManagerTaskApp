import {
	FETCH_NEW_ROOM,
	FETCH_USERS_ALL,
	GEt_All_ROOM,
	GET_USERS_ALL, HIDE_THEME,
	SHOW_THEME,
	UID_ROOM
} from "./types";

const initialState = {
	rooms: [],
}
const userAllInitialState = {
	usersAll: [],
}
const uidRoomInitialState = {
	uidRoom: '',
}
const toggleThemeInitialState = {
	toggleTheme: null,
}
export const roomsReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_NEW_ROOM:
			return {...state, rooms: [...state.rooms, action.payload]}
		case GEt_All_ROOM:
			return {...state, rooms: action.payload}
		default:
			return state
	}
}
export const uidRoomReducer = (state = uidRoomInitialState, action) => {
	switch (action.type) {
		case UID_ROOM:
			return {...state, uidRoom: `roomTask/${action.payload}`}
		default:
			return state
	}
}

export const usersReducer = (state = userAllInitialState, action) => {
	switch (action.type) {
		case FETCH_USERS_ALL:
			return {...state, usersAll: [...state.usersAll, action.payload]}
		case GET_USERS_ALL:
			return {...state, usersAll: action.payload}
		default:
			return state
	}
}
