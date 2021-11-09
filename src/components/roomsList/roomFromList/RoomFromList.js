import React from 'react';
import Delete from '../../../images/trashIcon.svg'

const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler, openManageMenuPage, parentId}) => {
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