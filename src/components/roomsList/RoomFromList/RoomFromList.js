import React, {useContext, useRef} from 'react';
import {useHistory} from "react-router-dom";
import {Context} from "../../../index";


const RoomFromList = ({roomTaskCard, index, deletedRoomTaskHandler}) => {
	const {auth, firestore, token} = useContext(Context)
	const {nameRoom, uid} = roomTaskCard
	const history = useHistory()
	
	const openManageMenu = (e) => {
		e.preventDefault()
		history.push('/manageScreen')
	}
	
	const colRoom = async ()=> {
		let collectionRoom = await firestore.collection('roomTask').get();
		
		return collectionRoom.docs.filter(item => {
			return item.id })
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
					{/*<div className="rooms-block__edit">*/}
					{/*	edit*/}
					{/*</div>*/}
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