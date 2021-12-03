import React, {useContext, useState, useEffect} from 'react';
import RoomFromList from "./roomFromList/RoomFromList";
import './RoomsList.css'
import {Context} from "../../index";
import {useCollectionData} from "react-firebase-hooks/firestore";
import Loader from "../loader/Loader";
import AddRoom from "./addRoom/AddRoom";
import {useAuth} from "../../hooks/auth.hook";
import UserInfo from "../userInfo/UserInfo";
import ManageScreen from "./roomFromList/manageScreen/ManageScreen";
import addNewTask from "../../images/addNewNameIcon.svg";
import exit from "../../images/exit.svg";
import {AuthContext} from "../../context/auth.context";

const RoomsList = () => {
	const [addRoomModal, setAddRoomModal] = useState(false)
	const [showManageMenuPage, setShowManageMenuPage] = useState(false)
	const [eligibleRooms, setEligibleRooms] = useState([])
	const [filteredRoomTasksUser, setFilteredRoomTasksUser] = useState([])
	const [tehDocId, setTehDocId] = useState('')
	const [updateInvitedUsers, setUpdateInvitedUsers] = useState([])
	
	const [parentIdState, setParentIdState] = useState('')
	const {logout, token} = useAuth();
	const {user} = useContext(AuthContext)
	const {firestore} = useContext(Context)
	const [userEmailSet, loading] = useCollectionData(firestore.collection('groupUsers').where('userEmail', '==', user.email))
	const [userEmailGet, isUserEmailGetLoading] = useCollectionData(firestore.collection('groupUsers'))
	const [roomTasks, isRoomLoading] = useCollectionData(firestore.collection('roomTask').orderBy('createdAt', 'desc'))
	const createDefaultId = (Date.now() + user.email).split('').join('')
	
// filtered rooms task user+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	useEffect(() => {
		const p = []
		if (!isRoomLoading) {
			roomTasks.forEach(item => {
				if (eligibleRooms.indexOf(item.uid) !== -1) {
					p.push(item)
				}
				setFilteredRoomTasksUser(p)
			})
		}
	}, [roomTasks, eligibleRooms, setEligibleRooms])

// filtered rooms task user------------------------------------------------------------------
	useEffect(() => {
		userEmailGet && userEmailGet.map(item => {
			const freeUserInfo = []
			if (item.userId === "" && item.userEmail === user.email) {
				freeUserInfo.push(item)
				setUpdateInvitedUsers(freeUserInfo)
			}
		})
	}, [isUserEmailGetLoading])
	
	
	useEffect(() => {
		const getDocId = updateInvitedUsers.map(item => item.docId)[0]
		!isUserEmailGetLoading && firestore.collection('groupUsers').doc(getDocId).update({
			userId: user.uid, userName: user.displayName, photoURL: user.photoURL
		}).then(res => res)
	}, [updateInvitedUsers])
// create new user+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
	useEffect(() => {
		if (!loading && userEmailSet.length === 0) {
			firestore.collection('groupUsers').doc(createDefaultId).set({
				createdAt: Date.now(),
				userId: user.uid,
				permissionsUser: [],
				userEmail: user.email,
				userName: user.displayName,
				photoURL: user.photoURL,
				docId: createDefaultId,
				uid: (Date.now() + user.email).split(' ').join('')
			}).then(res => res)
		}
	}, [loading])
// create new user------------------------------------------------------------------
// add room in user permissions+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	useEffect(() => {
		if (!isUserEmailGetLoading && userEmailGet) {
			const myUser = userEmailGet.find(myUser => myUser.userId === user.uid)
			if (myUser) {
				setEligibleRooms((myUser.permissionsUser) || [])
				setTehDocId(myUser.docId)
			}
		}
	}, [userEmailGet])
	
	const updatePermissionRoom = (id) => {
		const tehArr = [...eligibleRooms, id]
		firestore.collection('groupUsers').doc(tehDocId).update({
			permissionsUser: tehArr,
		}).then(res => res)
	}
// add room in user permissions------------------------------------------------------------------
// deletedRoomTaskHandler ++++++++++++++++++++++++++++++++++++++++++++++++++++++
	const deletedRoomTaskHandler = (e, id) => {
		e.preventDefault()
		const updatedRoomsList = eligibleRooms.filter(it => it !== id)
		firestore.collection('groupUsers').doc(tehDocId).update({
			permissionsUser: updatedRoomsList,
		}).then(() => {
			setEligibleRooms(updatedRoomsList)
			setFilteredRoomTasksUser(filteredRoomTasksUser.filter(room => room.uid !== id))
		})
		
		firestore.collection('roomTask').doc(id).collection('urgently').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				doc.ref.delete();
			});
		});
		firestore.collection('roomTask').doc(id).collection('noUrgently').get().then(function (querySnapshot) {
			querySnapshot.forEach(function (doc) {
				doc.ref.delete();
			});
		});
		// firestore.collection('roomTask').doc(id).collection('finish').get().then(function (querySnapshot) {
		// 	querySnapshot.forEach(function (doc) {
		// 		doc.ref.delete();
		// 	});
		// });
		firestore.collection('roomTask').doc(id).delete()
	}

// deletedRoomTaskHandler ------------------------------------------------------------

// handler modal window+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	const parentId = (id) => {
		return setParentIdState(id)
	}
	const openManageMenuPage = () => {
		setShowManageMenuPage(true)
	}
	
	const closeRoomModal = () => {
		setAddRoomModal(false)
		
	}
	const closeUrgentlyModal = () => {
		setShowManageMenuPage(false)
	}
	
	if (loading || isUserEmailGetLoading || isRoomLoading) {
		return <Loader />
	}
// handler modal window-----------------------------------------------------------------
	return (<>
		{token ? <>
			<div className="rooms">
				<h1 className="rooms-name">List Rooms</h1>
				<ul className="rooms-block">
					{!loading ? (filteredRoomTasksUser && filteredRoomTasksUser.map((roomTask, index) =>
						<RoomFromList
							id={roomTask.uid}
							key={roomTask.uid + index}
							roomTaskCard={roomTask}
							index={index}
							deletedRoomTaskHandler={deletedRoomTaskHandler}
							openManageMenuPage={openManageMenuPage}
							parentId={parentId}
							user={user}
							userEmailGet={userEmailGet}
							updatePermissionRoom={updatePermissionRoom}
						/>)) : <Loader />}
				</ul>
				{addRoomModal && <AddRoom
					closeRoomModal={closeRoomModal}
					updatePermissionRoom={updatePermissionRoom}
				/>}
				<button
					className="rooms-addButton"
					title="Add new room"
					onClick={() => setAddRoomModal(true)}
				>
					Add new room
					<img
						src={addNewTask}
						alt="add new task"
					/>
				</button>
				<div className="manageScreen-footer">
					<button
						className="manageScreen-exit"
						title="Log out Google"
						onClick={() => logout()}
					>
						Log out
						<img
							src={exit}
							alt="exit"
						/>
					</button>
					<UserInfo user={user} />
				</div>
				{showManageMenuPage && <ManageScreen
					parentIdState={parentIdState}
					closeUrgentlyModal={closeUrgentlyModal}
				/>}
			</div>
		</> : <Loader />}
	</>)
}


export default RoomsList;