import React, { useContext, useState } from 'react';
import { Context } from "../../index";
import trashIcon from '../../images/trashIcon.svg'
import AddNewUserForRoomIcon from '../../images/addNewNameIcon.svg'
import { AuthContext } from "../../context/auth.context";

const ListRoom = ({
					  room,
					  index,
					  showManageScreenTask,
					  returnCheckedRoom,
					  AddNewUserForRoom,
					  deletedRoomTaskHandler
				  }) => {
	const { user } = useContext(AuthContext)
	return (
		<li className="list-rooms__body-li">
			
			<button
				className="list-rooms__body-li__name"
				onClick={() => {
					showManageScreenTask(true)
					returnCheckedRoom(room.uid)
				}}
			>
				<span>{`${index + 1}.`}</span>
				{room.nameRoom}
			</button>
			<div className="list-rooms__body-li__buttons">
				<button
					className="list-rooms__body-li__addUser type"
					title="invite user by e-mail to the room"
					onClick={() => AddNewUserForRoom(room.uid)}
				>
					<img
						src={AddNewUserForRoomIcon}
						alt="add new user"
					/>
				</button>
				{
					user.email === room.email
					&& <button
						className="list-rooms__body-li__delete type"
						onClick={(e) => deletedRoomTaskHandler(e, room.uid)}
						title="delete this room"
					>
						<img
							src={trashIcon}
							alt="delete"
						/>
					</button>
				}
			</div>
		</li>
	);
};

export default ListRoom;