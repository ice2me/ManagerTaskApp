import React, {useContext, useEffect, useState} from 'react';
import RoomFromList from "./roomFromList/RoomFromList";
import './RoomsList.css'
import {Context} from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader/Loader";
import AddRoom from "./addRoom/AddRoom";
import {useAuth} from "../../hooks/auth.hook";
import UserInfo from "../userInfo/UserInfo";
import {useHistory} from "react-router-dom";
import ManageScreen from "./roomFromList/manageScreen/ManageScreen";

const RoomsList = () => {
	const [addRoomModal, setAddRoomModal] = useState(false)
	const [showManageMenuPage, setShowManageMenuPage] = useState(false)
	const [parentIdState, setParentIdState] = useState('')
	const {logout} = useAuth();
	const { firestore} = useContext(Context)
	const history = useHistory()
	
	const [roomTasks, loading] = useCollectionData(
		firestore.collection('roomTask').orderBy('createdAt', 'desc')
	)

	const deletedRoomTaskHandler = async (e, id) => {
		e.preventDefault()
		firestore.collection('roomTask').doc(id).delete()
		// firestore.collection('roomTask').doc(id)
		// const p= firestore.collection('roomTask').doc(id).collection('urgently').delete()
		// console.log(p)
	}
	// /manageScreen/1635853195348tworoom/urgently
//todo handler modal window-----------------------------------
	
	// useEffect(()=>{sessionStorage.clear()},[])
	const parentId= (id) => {
		return setParentIdState(id)
	}
	const openManageMenuPage = (bool, uid) => {
		const pointUri = uid ? `/roomsList/manageScreen/${uid}` : '/roomsList'
		history.push(pointUri)
		setShowManageMenuPage(bool)
	}
	
	const closeRoomModal = () => {
		setAddRoomModal(false)
		history.push('/roomList')
		// console.log('modal')
	}
	const closeUrgentlyModal = () => {
		setShowManageMenuPage(false)
		history.goBack()
		// console.log('urgentlyModal')
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
					openManageMenuPage={openManageMenuPage}
					parentId={parentId}
				/>)}
			</ul>
			{addRoomModal && <AddRoom closeRoomModal={closeRoomModal} />}
			<button
				className="rooms-addButton"
				onClick={()=> setAddRoomModal(true)}
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
			{showManageMenuPage && <ManageScreen id={parentIdState} closeUrgentlyModal={closeUrgentlyModal}/>}
		</div>
	);
};

export default RoomsList;