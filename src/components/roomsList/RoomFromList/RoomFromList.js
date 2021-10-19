import React from 'react';


const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler}) => {
	const {nameRoom, uid} = roomTaskCard
	return (
		<li
			className="rooms-block__li"
		>
			<a
				href="/"
				className="rooms-block__a"
			>
				
				<h3 className="rooms-block__title">
					<span className="rooms-block__num">{index + 1}</span>
					{nameRoom}
				</h3>
				<div className="rooms-block__wrapper">
					{/*<button className="rooms-block__edit">*/}
					{/*	edit*/}
					{/*</button>*/}
					<button
						className="rooms-block__delete"
						onClick={(e) => deletedRoomTaskHandler(e, uid)}
					>
						delete
					</button>
				</div>
			</a>
		</li>
	);
};

export default RoomFromList;