import React, {useContext, useEffect, useState} from 'react';
import RoomFromList from "./RoomFromList/RoomFromList";
import './RoomsList.css'
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader/Loader";
import AddRoom from "../addRoom/AddRoom";
import {useAuth} from "../../hooks/auth.hook";

const RoomsList = () => {
	const [addRoomModal, setAddRoomModal] = useState(false)
	const {logout} = useAuth();
	const {auth, firestore, token} = useContext(Context)
	const [user] = useAuthState(auth)
	const [roomTasks, loading, error] = useCollectionData(
		firestore.collection('roomTask').orderBy('nameRoom')
	)

	const [newRoomTasks, setNewRoomTask] = useState([])
	const [deletedRoom, setDeletedRoom] = useState([])
	
	const deletedRoomTaskHandler = async (e, id) => {
		e.preventDefault()
		
		const cityRef = firestore.collection('roomTask').doc(id).delete()
		console.log(cityRef)
	}
	useEffect(() => {
		setNewRoomTask(roomTasks)
	}, [deletedRoom, roomTasks])


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
	console.log(roomTasks)
	return (
		<div className="rooms">
			<h1 className="rooms-name">List Rooms</h1>
			<ul className="rooms-block">
				{roomTasks.map((roomTask, index) => <RoomFromList
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
				<div className="manageScreen-user">
					<p>
						{
							user.displayName
						}
					</p>
					<img
						src={user.photoURL}
						alt="user"
					/>
				</div>
			</div>
		</div>
	);
};

export default RoomsList;