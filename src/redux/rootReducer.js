import { combineReducers } from "redux";
import { roomsReducer, uidRoomReducer, usersReducer } from "./roomsReducer";

export const rootReducer = combineReducers({
	rooms: roomsReducer,
	uidRoom: uidRoomReducer,
	usersAll: usersReducer,
})