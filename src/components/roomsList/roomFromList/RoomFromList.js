import React, {useContext, useState} from 'react';
import Delete from '../../../images/trashIcon.svg'
import AddNewUsersRoom from "../addNewUsersRoom/addNewUsersRoom";
import {AuthContext} from "../../../context/auth.context";

const RoomFromList = ({
	roomTaskCard,
	index,
	deletedRoomTaskHandler,
	openManageMenuPage,
	parentId,
	userEmailGet,
	updatePermissionRoom
}) => {
	const {nameRoom, uid, email} = roomTaskCard
	const [addNewUser, setAddNewUser] = useState(false)
	const [reqHasBeenSent, setReqHasBeenSent] = useState('')
	const {user} = useContext(AuthContext)
	const closeAddNewUser = () => {
		setAddNewUser(false)
	}
	const openAddNewUser = () => {
		setAddNewUser(true)
	}
	const windowReqHasBeenSent = () => {
		setReqHasBeenSent(
			<div className="alertModal">
				<h3 className="alertModal-text">
					Request has been sent
				</h3>
			</div>
		)
		return setTimeout(() => {
			setReqHasBeenSent('')
		}, 1000)
	}
	return (
		<li
			className="rooms-block__li"
			title="open a room with tasks"
		>
			{reqHasBeenSent}
			<div
				className="rooms-block__a"
			>
				<h3
					className="rooms-block__title"
					onClick={() => {
						openManageMenuPage(true)
						parentId(uid)
					}}
				>
					<span className="rooms-block__num">{index + 1}</span>
					{nameRoom}
				</h3>
				<div className="rooms-block__wrapper">
					<button
						className="rooms-block__newUser"
						title="add new user"
						onClick={
							(e) => {
								openAddNewUser()
							}
						}
					>
						add new user
					</button>
					{addNewUser && <AddNewUsersRoom
						closeAddNewUser={closeAddNewUser}
						uid={uid}
						windowReqHasBeenSent={windowReqHasBeenSent}
						userEmailGet={userEmailGet}
						updatePermissionRoom={updatePermissionRoom}
					/>}
					{
						(user.email === email)
						&&
						<button
							className="rooms-block__delete"
							title="Delete this room"
							onClick={(e) => deletedRoomTaskHandler(e, uid)}
						>
							<img
								src={Delete}
								alt="Delete"
							/>
						</button>}
				</div>
			</div>
		</li>
	);
};

export default RoomFromList;