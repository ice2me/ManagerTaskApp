import React from 'react';
import {useHistory} from "react-router-dom";


const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler}) => {
		const {nameRoom, uid} = roomTaskCard
		const history = useHistory()
		const openManageMenu = (e) => {
			e.preventDefault()
			history.push('/manageScreen/')
		}
		return (
			<li
				className="rooms-block__li"
			>
				<div
					className="rooms-block__a"
				>
					<h3
						className="rooms-block__title"
						onClick={(e) => {openManageMenu(e)}}
					>
						<span className="rooms-block__num">{index + 1}</span>
						{nameRoom}
					</h3>
					<div className="rooms-block__wrapper">
						<button
							className="rooms-block__delete"
							onClick={(e) => deletedRoomTaskHandler(e, uid)}
						>
							delete
						</button>
					</div>
				</div>
			</li>
		);
	}
;

export default RoomFromList;