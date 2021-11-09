import React from 'react';
import Delete from '../../../images/trashIcon.svg'

const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler, openManageMenuPage, parentId}) => {
	const {nameRoom, uid} = roomTaskCard
	return (
		<li
			className="rooms-block__li"
			title='open a room with tasks'
		>
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
						className="rooms-block__delete"
						title='Delete this room'
						onClick={(e) => deletedRoomTaskHandler(e, uid)}
					>
						<img
							src={Delete}
							alt="Delete"
						/>
					</button>
				</div>
			</div>
		
		</li>
	);
};

export default RoomFromList;