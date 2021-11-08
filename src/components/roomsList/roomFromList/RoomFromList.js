import React from 'react';

const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler,openManageMenuPage, parentId}) => {
	const {nameRoom, uid} = roomTaskCard
	
	return (
		<li
			className="rooms-block__li"
		>
			<div
				className="rooms-block__a"
			>
				<h3
					className="rooms-block__title"
					onClick={() => {
						openManageMenuPage(true, uid)
						parentId(uid)
					}}
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
};

export default RoomFromList;