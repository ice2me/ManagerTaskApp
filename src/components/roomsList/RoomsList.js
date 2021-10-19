import React, {useContext, useEffect, useState} from 'react';
import RoomFromList from "./RoomFromList/RoomFromList";
import './RoomsList.css'
import {Context} from "../../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader/Loader";
import AddRoom from "../addRoom/AddRoom";


const RoomsList = ({exitLogin, loginUserInfo}) => {
	const [addRoomModal, setAddRoomModal] = useState(false)
	const {auth, firestore} = useContext(Context)
	const [user] = useAuthState(auth)
	const [roomTasks, loading, error] = useCollectionData(
		firestore.collection('roomTask').orderBy('createdAt')
	)
	const [newRoomTasks, setNewRoomTask] = useState([])
	const [deletedRoom, setDeletedRoom] = useState([])
	
	const deletedRoomTaskHandler = (e, id) => {
		e.preventDefault()
		setDeletedRoom(newRoomTasks.filter(item => item.uid !== id))
		// firestore.collection('roomTask').delete(newRoomTasks.filter(item => item.uid !== id))
	}
	useEffect(() => {
		setNewRoomTask(roomTasks)
	}, [deletedRoom, roomTasks])
	
	// useEffect(() => {
	// 	setNewRoomTask(firestore.collection('roomTask').delete(roomTasks))
	// }, [roomTasks])
//todo handler modal window-----------------------------------
	const openRoomModal = (e) => {
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
				{roomTasks.map((roomTask, index) => <RoomFromList
					key={roomTask.uid}
					roomTaskCard={roomTask}
					index={index}
					deletedRoomTaskHandler={deletedRoomTaskHandler}
				/>)}
			</ul>
			{addRoomModal && <AddRoom closeRoomModal={closeRoomModal} />}
			<button
				className="rooms-addButton"
				onClick={openRoomModal}
			>
				Add new room
				<span>&rarr;</span>
			</button>
			<div className="manageScreen-footer">
				<button
					className="manageScreen-exit"
					onClick={() => exitLogin()}
				>
					exit
				</button>
				<div className="manageScreen-user">
					<p>
						{
							loginUserInfo.displayName
						}
					</p>
					<img
						src={loginUserInfo.photoURL}
						alt="user"
					/>
				</div>
			</div>
		</div>
	);
};

export default RoomsList;