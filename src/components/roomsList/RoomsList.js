import React, {useContext, useState} from 'react';
import RoomFromList from "./RoomFromList/RoomFromList";
import './RoomsList.css'
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader/Loader";
import AddRoom from "../addRoom/AddRoom";
import {useAuth} from "../../hooks/auth.hook";
import UserInfo from "../userInfo/UserInfo";

const RoomsList = () => {
	const [addRoomModal, setAddRoomModal] = useState(false)
	const {logout} = useAuth();
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth)
	
	
	const [roomTasks, loading] = useCollectionData(
		firestore.collection('roomTask').orderBy('createdAt', 'desc')
	)
	const deletedRoomTaskHandler = async (e, id) => {
		e.preventDefault()
		firestore.collection('roomTask').doc(id).delete()
	}

//todo handler modal window-----------------------------------
	const openAddRoomModal = (e) => {
		e.preventDefault()
		setAddRoomModal(true)
	}
	const closeRoomModal = (e) => {
		e.preventDefault()
		setAddRoomModal(false)
	}
//todo toggle loader-----------------------------------
	if (loading) {
		return <Loader />
	}
	return (
		<div className="rooms">
			<h1 className="rooms-name">List Rooms</h1>
			<ul className="rooms-block">
				{roomTasks && roomTasks.map((roomTask, index) => <RoomFromList
					id={roomTask.uid}
					key={roomTask.uid + index}
					roomTaskCard={roomTask}
					index={index}
					deletedRoomTaskHandler={deletedRoomTaskHandler}
				/>)}
			</ul>
			{addRoomModal && <AddRoom closeRoomModal={closeRoomModal} />}
			<button
				className="rooms-addButton"
				onClick={openAddRoomModal}
			>
				Add new room
				<span>&rarr;</span>
			</button>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					onClick={() => logout()}
				>
					Log out
				</button>
				<UserInfo />
			</div>
		</div>
	);
};

export default RoomsList;